import React, { useState } from "react";
import Navbar from "./Components/partials/Navbar";
import Sidebar from "./Components/partials/Sidebar";

const Layout = ({ children }) => {
  const [active, setActive] = useState("Dashboard");
  const [barOpen, setBarOpen] = useState("false");

  
  return (
    <div>
      <div className="wrapper">
        <div
          className={barOpen === "true" ? "nav-open sidebar" : "sidebar"}
          data-color="blue"
          data-image="assets/img/sidebar-5.jpg"
        >
        <Sidebar active={active} setActive={setActive}/>
        </div>
        <div className="main-panel">
          <Navbar barOpen={barOpen} setBarOpen={setBarOpen} active={active}/>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

