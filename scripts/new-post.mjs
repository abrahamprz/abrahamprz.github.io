import { mkdir, access, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
  AUTHOR_LOCALE,
  AUTHOR_TIME_ZONE,
  AUTHOR_UTC_OFFSET,
  DEFAULT_POST_AUTHOR,
  DEFAULT_POST_DESCRIPTION,
  DEFAULT_POST_TAGS,
} from '../src/config/site.mjs';

function toSlug(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function toTitle(input) {
  const cleaned = input.trim();
  if (!cleaned) return 'Untitled Post';

  return cleaned
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function fileExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function formatDateParts(now) {
  const formatter = new Intl.DateTimeFormat(AUTHOR_LOCALE, {
    timeZone: AUTHOR_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((part) => part.type === type)?.value ?? '00';

  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');
  const second = getPart('second');

  const dateOnly = `${year}-${month}-${day}`;
  const timestamp = `${dateOnly}T${hour}:${minute}:${second}${AUTHOR_UTC_OFFSET}`;
  return { dateOnly, timestamp };
}

function toSingleQuotedYamlString(value) {
  return `'${value.replace(/'/g, "''")}'`;
}

async function main() {
  const rawTitle = process.argv.slice(2).join(' ').trim();

  if (!rawTitle) {
    console.error('Usage: npm run new:post -- "My Post Title"');
    process.exit(1);
  }

  const now = new Date();
  const { dateOnly, timestamp } = formatDateParts(now);

  const title = toTitle(rawTitle);
  const baseSlug = toSlug(rawTitle) || `post-${Date.now()}`;

  const postsDir = path.resolve(process.cwd(), 'src/pages/posts');
  await mkdir(postsDir, { recursive: true });

  let slug = baseSlug;
  let fileName = `post-${dateOnly}-${slug}.md`;
  let filePath = path.join(postsDir, fileName);
  let suffix = 2;

  while (await fileExists(filePath)) {
    slug = `${baseSlug}-${suffix}`;
    fileName = `post-${dateOnly}-${slug}.md`;
    filePath = path.join(postsDir, fileName);
    suffix += 1;
  }

  const tagsLiteral = `[${DEFAULT_POST_TAGS.map((tag) => JSON.stringify(tag)).join(', ')}]`;
  const content = `---\nlayout: ../../layouts/PostLayout.astro\ntitle: ${toSingleQuotedYamlString(title)}\npubDate: ${toSingleQuotedYamlString(timestamp)}\ndescription: ${toSingleQuotedYamlString(DEFAULT_POST_DESCRIPTION)}\nauthor: ${toSingleQuotedYamlString(DEFAULT_POST_AUTHOR)}\ntags: ${tagsLiteral}\n---\nWrite your post content here.\n`;

  await writeFile(filePath, content, 'utf8');

  const relativePath = path.relative(process.cwd(), filePath);
  console.log(`Created ${relativePath}`);
  console.log(`pubDate: ${timestamp}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
