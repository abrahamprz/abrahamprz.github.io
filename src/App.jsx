import { useEffect, useState } from 'react';
import githubLightLogo from './assets/github_light_theme.svg';
import githubDarkLogo from './assets/github_dark_theme.svg';
import linkedinLightLogo from './assets/linkedin_light_theme.svg';
import linkedinDarkLogo from './assets/linkedin_dark_theme.svg';
import ClickCounter from './ClickCounter';
import Profile from './Profile';
import './i18n';
import './App.css';
import { useTranslation } from "react-i18next"

function App() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Detect the browser theme
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (event) => {
      const newTheme = event.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    // Listen for changes to the user's preferred color scheme
    darkModeQuery.addEventListener('change', handleThemeChange);
    setTheme(darkModeQuery.matches ? 'dark' : 'light');

    // Clean up the event listener when the component unmounts
    return () => {
      darkModeQuery.removeEventListener('change', handleThemeChange);
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
        {t('references.iconsBy')} <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>
      </div>
    </div>
  );
}

export default App;