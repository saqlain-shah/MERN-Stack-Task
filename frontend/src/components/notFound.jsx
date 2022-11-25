import React from "react";
import { Link } from "react-router-dom";
function NotFoundScreen() {
  return (
    <>
      <div className="welcomeScreen__container">
        <h1>404 Notfound!</h1>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Got the email?
          <span style={{ width: "10px" }}></span>
          <Link
            className="nav-link"
            to={"/dashboard"}
            style={{ color: "blue" }}
          >
            Go to Dashboard
          </Link>
        </ul>
      </div>
    </>
  );
}

export default NotFoundScreen;
