import React from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handlelogOut = () => {
    localStorage.removeItem("token");
    toast.success("Log Out successfully");
    navigate("/Login");
  };

  const auth = localStorage.getItem("token");

  let location = useLocation();

  return (
    <div>
      <nav
        className="navbar fixed-top navbar-expand navbar-dark"
        style={{ backdropFilter: "blur(50px)"}}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            INotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth && (
              <ul className="navbar-nav me-auto  mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Home" ? "active" : ""
                    }`}
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/About" ? "active" : ""
                    }`}
                    to="/About"
                  >
                    About
                  </Link>
                </li>
              </ul>
            )}
            {!auth ? (
              <form className="d-flex"></form>
            ) : (
              <button
                onClick={handlelogOut}
                className="btn"
                style={{ border: "1px solid #2b226c", color: "white" }}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
