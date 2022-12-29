import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const auth = useSelector((state) => state.auth);
  const button = auth ? (
    <a href="/api/logout"> Logout </a>
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
            <li>{button}</li>
            <li>
              <Link to="/surveys/new">new</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
