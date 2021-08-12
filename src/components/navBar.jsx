import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              {" "}
              <i className="fas fa-book-open">ToDo</i>{" "}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav text-dark">
                <Link className="nav-link" to="/add/task">
                  Add New Task
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default NavBar;
