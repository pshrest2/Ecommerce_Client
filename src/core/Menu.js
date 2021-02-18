import { React, Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

import "./css/Menu.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const Menu = ({ history }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Nep-Shop
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                className="nav-links"
                style={isActive(history, "/")}
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-links"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  className="nav-links"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-links"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
