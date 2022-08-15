import "./Navbar.css";
import { PAGES } from "./constants";

const Navbar = ({ username, onChangeMode, darkTheme, onNavigate, onLogout }) => {
  return (
    <nav className="navbar" onClick={onNavigate}>
      <span className="logo" data-page={PAGES.HOME}>
        ColorsHub
      </span>
      <div className="sub-navbar">
        <ul className="navbar-options">
          <li className="navbar-option" data-page={PAGES.CREATE}>
            Create
          </li>
          <li className="navbar-option" data-page={PAGES.SAVED}>
            Saved
          </li>
          <li className="navbar-option" data-page={PAGES.USER_COLORS}>
            My Colors
          </li>
          <li className="navbar-option" data-page={PAGES.ABOUT}>
            About
          </li>
        </ul>
        <ul className="navbar-extra">
          <li className="navbar-user">Welcome, {username}</li>
          <li className="navbar-btn">
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </li>
          <li className="navbar-mode">
            <label>
              <input
                type="checkbox"
                onChange={onChangeMode}
                checked={darkTheme}
                className="mode-selector"
              />
              <span className="check"></span>
            </label>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
