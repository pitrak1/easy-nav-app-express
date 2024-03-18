import './Header.css';
import NavButton from './NavButton.js'

function Header() {
  const onClickHomeButton = () => {
    console.log("Clicked home");
  }

  const onClickSearchButton = () => {
    console.log("Clicked search");
  }

  return (
    <div>
      <div className="Header-login-container">
        <h1 className="Header-login-name">EasyNav</h1>
        <a href="www.google.com" className="Header-login-display">Login</a>
      </div>
      <div className="Header-navbar-container">
        <NavButton text="Home" onClick={onClickHomeButton}/>
        <NavButton text="Search" onClick={onClickSearchButton}/>
      </div>
    </div>
  );
}

export default Header;
