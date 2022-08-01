import "./Navbar.css";

const Navbar = ({ username, onChangeMode, darkTheme }) => {
  return (
    <nav className="navbar">
      <span className="logo">ColorsHub</span>
      <div className="sub-navbar">
        <ul className="navbar-options">
          <li className="navbar-option">Create</li>
          <li className="navbar-option">Saved</li>
          <li className="navbar-option">About</li>
        </ul>
        <ul className="navbar-extra">
          <li className="navbar-user">Welcome, {username}</li>
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
