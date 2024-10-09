import React from "react";
import ProfileIcon from "./ProfileIcon";

const Header = () => {
  return (
    <div>
      <div className="wrapper header">
        <img src="/logo.png" alt="logo" className="logo" />
        <ProfileIcon />
      </div>
      <hr />
    </div>
  );
};

export default Header;
