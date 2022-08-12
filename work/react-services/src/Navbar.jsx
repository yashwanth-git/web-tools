import "./Navbar.css";

const Navbar = ({ username, onLogout }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onLogout();
  };
  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <div className="user-details">
            <span className="user-avatar">{username.charAt(0).toUpperCase()}</span>
            <span className="user-name">
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </span>
          </div>
        </li>
        <li>
          <form onSubmit={submitHandler}>
            <button className="logout-btn">
              Logout
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
