import useAuth from "../../core/auth/useAuth";
import "./styles.css";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-light text-dark">
        <a className="navbar-brand" href="/">
          Bolttech TODO List
        </a>
        {user && (
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="buttonLink"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
