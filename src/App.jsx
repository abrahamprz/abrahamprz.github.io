import githublogo from './assets/github_dark_theme.svg';
import linkedinlogo from './assets/linkedin_dark_theme.svg';
import ClickCounter from './ClickCounter';
import Profile from './Profile';
import './App.css';

function App() {
  return (
    <div className="container">
      <div>
        <a href="https://github.com/abrahamprz" target="_blank" rel="noopener noreferrer">
          <img src={githublogo} className="logo logo--github" alt="GitHub logo" />
        </a>
        <a href="https://www.linkedin.com/in/fcoabrahamprz/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinlogo} className="logo logo--linkedin" alt="LinkedIn logo" />
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