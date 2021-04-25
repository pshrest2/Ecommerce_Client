import { React, Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { totalItems, emptyCart } from "./cartHelper";

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

  //menu
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            E-Shop
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

            <li className="nav-item">
              <Link
                className="nav-links"
                style={isActive(history, "/shop")}
                to="/shop"
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
            </li>
            {/* only display user Dashboard if user is authenticated and is not admin*/}
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

            {/* only display admin Dashboard if authenticated and is admin */}
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

            {/* Only display signin/signup if user is not authenticated */}
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

            {/*Only display Signout if user is authenticated  */}
            {isAuthenticated() ? (
              isAuthenticated().user.role === 1 ? (
                <li className="nav-item">
                  <span
                    className="nav-links"
                    style={{ cursor: "pointer", color: "#ffffff" }}
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              ) : (
                <li className="nav-item">
                  <span
                    className="nav-links"
                    style={{ cursor: "pointer", color: "#ffffff" }}
                    onClick={() => {
                      //empty cart when user logs out.
                      //only do it if there is any item in the cart
                      if (totalItems() > 0) {
                        if (
                          typeof window !== undefined &&
                          window.confirm(
                            "Logging out will delete all items in your cart. Are you sure you want to proceed?"
                          )
                        ) {
                          //API to logout
                          signout(() => {
                            //API to empty the cart
                            emptyCart(() => {
                              console.log("Emptying the cart...");
                              history.push("/");
                            });
                          });
                        }
                      } else {
                        signout(() => {
                          history.push("/");
                        });
                      }
                    }}
                  >
                    Signout
                  </span>
                </li>
              )
            ) : null}

            {/*Only display the cart icon if user is authenticated and is not an admin  */}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-links"
                  style={isActive(history, "/cart")}
                  to="/cart"
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <sup>
                    <small className="cart-badge">{totalItems()}</small>
                  </sup>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
