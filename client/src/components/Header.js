import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Payments from "./Payments";

function Header() {
  const auth = useSelector((state) => state.auth);
  const button = auth ? (
    <>
      <li>
        <Payments />
      </li>
      <li style={{ margin: "0 10px" }}>Credit:{auth.credits}</li>
      <li>
        <a href="/api/logout"> Logout </a>
      </li>
    </>
  ) : (
    <a href="/auth/google"> Login in with Google </a>
  );

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <Link to={auth ? "/surveys" : "/"} className="brand-logo">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {button}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
