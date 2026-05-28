# Project Guide

This document contains the basic development workflow for this Astro project.

## Requirements

- Node.js 18+
- npm

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Local dev server usually runs at `http://localhost:4321`.

## Build for production

```bash
npm run build
```

Build output is generated in `dist/`.

## Preview production build

```bash
npm run preview
```

## Create a new post

```bash
npm run new:post -- "My Post Title"
```

This command creates a markdown file under `src/pages/posts/` with:

- Auto-generated filename: `post-YYYY-MM-DD-my-post-title.md`
- Automatic `pubDate` using current America/Phoenix time with `-07:00` offset
- Starter frontmatter and placeholder content

## Current scripts

- `npm run dev`: Start Astro development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run new:post -- "Title"`: Generate new post with timestamp
