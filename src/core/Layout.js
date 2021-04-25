import React from "react";
import Menu from "./Menu";
import "../styles.css";

//base layout modal for each page.
//contains jumbtron will title and description, and a menu
const showJumbtron = (title, description) => {
  if (title != "" && description != "") {
    return (
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead"> {description} </p>
      </div>
    );
  }
};

const Layout = ({ title = "", description = "", className, children }) => (
  <div>
    <Menu />
    {showJumbtron(title, description)}

    <div className={className}>{children}</div>
  </div>
);

export default Layout;
