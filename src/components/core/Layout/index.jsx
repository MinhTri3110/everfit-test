import React from "react";

import './style.css';

const Layout = ({ children }) => {
  return <div className="page-wrapper">{children}</div>;
};

export default Layout;
