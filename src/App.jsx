import { useEffect, useState } from 'react';
import githubLightLogo from './assets/github_light_theme.svg';
import githubDarkLogo from './assets/github_dark_theme.svg';
import linkedinLightLogo from './assets/linkedin_light_theme.svg';
import linkedinDarkLogo from './assets/linkedin_dark_theme.svg';
import ClickCounter from './ClickCounter';
import Profile from './Profile';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  useEffect(() => {
    // Detect the browser theme
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (event) => {
      const newTheme = event.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    darkModeQuery.addEventListener('change', handleThemeChange);
    setTheme(darkModeQuery.matches ? 'dark' : 'light');

    return () => {
      darkModeQuery.addEventListener('change', handleThemeChange);
    };
  }, []);

  const getGithubLogoPath = () => {
    return theme === 'dark' ? githubDarkLogo : githubLightLogo;
  };

  const getLinkedinLogoPath = () => {
    return theme === 'dark' ? linkedinDarkLogo : linkedinLightLogo;
  };

  return (
    <div className="container">
      <div>
        <a href="https://github.com/abrahamprz" target="_blank" rel="noopener noreferrer">
          <img src={getGithubLogoPath()} className="logo logo--github" alt="GitHub logo" />
        </a>
        <a href="https://www.linkedin.com/in/fcoabrahamprz/" target="_blank" rel="noopener noreferrer">
          <img src={getLinkedinLogoPath()} className="logo logo--linkedin" alt="LinkedIn logo" />
        </a>
      </div>
      <div>
        <Profile />
      </div>
      <div className="counter">
        <ClickCounter />
      </div>
      <div className="references">
        <a href="https://icons8.com/icon/84862/contacts" target="_blank" rel="noopener noreferrer">Contact</a>,{' '}
        <a href="https://icons8.com/icon/16318/github" target="_blank" rel="noopener noreferrer">GitHub</a>,{' '}
        <a href="https://icons8.com/icon/98960/linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>{' '}
        icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>
      </div>
    </div>
  );
}

export default App;
