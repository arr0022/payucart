import React from "react";
import { Link } from "react-router-dom";
// import useAdminContexts from "../../Context/AdminContext";

const Sidebar = ({ active, setActive }) => {
  return (
    <>
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to="" className="simple-text">
            Admin
          </Link>
        </div>
        <ul className="nav">
          <li className={active === "Dashboard" ? "active" : ""}>
            <Link to="dashboard" onClick={(e) => setActive("Dashboard")}>
              <i className="pe-7s-graph" />
              <p>Dashboard</p>
            </Link>
          </li>
          <li className={active === "Manage Users" ? "active" : ""}>
            <Link to="users" onClick={(e) => setActive("Manage Users")}>
              <i className="pe-7s-user" />
              <p>Manage Users</p>
            </Link>
          </li>
          {/* <li className={active === "Orders" ? "active" : ""}>
                <Link to="orders" onClick={(e) => setActive("Orders")}>
                  <i className="pe-7s-note2" />
                  <p>Orders</p>
                </Link>
              </li> */}
          <li className={active === "Packages" ? "active" : ""}>
            <Link to="package" onClick={(e) => setActive("Packages")}>
              <i className="pe-7s-news-paper" />
              <p>Packages</p>
            </Link>
          </li>
          <li className={active === "Banner" ? "active" : ""}>
            <Link to="banner" onClick={(e) => setActive("Banner")}>
              <i className="pe-7s-photo" />
              <p>Banner</p>
            </Link>
          </li>
          {/* <li className={active === "Notifications" ? "active" : ""}>
            <Link to=""
              onClick={async (e) => {
                sendNotificationToALl.current.click();
                setActive("Notifications");
              }}
            >
              <i className="pe-7s-bell" />
              <p>Notifications</p>
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
