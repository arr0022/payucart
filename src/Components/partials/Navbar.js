import React from "react";
import { Link } from "react-router-dom";
import useAdminContexts from "../../Context/AdminContext";


function Navbar({barOpen, setBarOpen, active}) {
  const { setDashboard } = useAdminContexts();

  return (
    <>
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              onClick={(e) => () =>
                barOpen === "true" ? setBarOpen("false") : setBarOpen("true")}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="#">
              {active}
            </Link>
            {/* // <p className="hidden-lg hidden-mdnavbar">{active === "Dashboard" ? }</p> */}
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-dashboard" />
                  <p className="hidden-lg hidden-md">Dashboard</p>
                </Link>
              </li>
              <li className="dropdown">
                <div
                  className="dropdown-toggle navimage"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-globe" />
                  <b className="caret hidden-lg hidden-md" />
                  <p className="hidden-lg hidden-md">
                    5 Notifications
                    <b className="caret" />
                  </p>
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="">Notification 1</Link>
                  </li>
                  <li>
                    <Link to="">Notification 2</Link>
                  </li>
                  <li>
                    <Link to="">Notification 3</Link>
                  </li>
                  <li>
                    <Link to="">Notification 4</Link>
                  </li>
                  <li>
                    <Link to="">Another notification</Link>
                  </li>
                </ul>
              </li>
              {/* <li>
                    <Link href>
                      <i className="fa fa-search" />
                      <p className="hidden-lg hidden-md">Search</p>
                    </Link>
                  </li> */}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/">
                  <p>Account</p>
                </Link>
              </li>
              <li className="dropdown">
                <Link to="" className="dropdown-toggle" data-toggle="dropdown">
                  <p>
                    Dropdown
                    <b className="caret" />
                  </p>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="">Action</Link>
                  </li>
                  <li>
                    <Link to="">Another action</Link>
                  </li>
                </ul>
              </li>
              <li onClick={() => {
                  localStorage.removeItem("token")
                  setDashboard(true)
                }}>
                <a>
                  <p>Logout</p>
                </a>
              </li>
              <li className="separator hidden-lg" />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
