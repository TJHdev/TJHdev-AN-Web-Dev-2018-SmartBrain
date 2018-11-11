import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, toggleProfileModal }) => {
  if (isSignedIn) {
    return (
      <nav>
        <ProfileIcon
          onRouteChange={onRouteChange}
          toggleProfileModal={toggleProfileModal}
        />
      </nav>
    );
  } else {
    return (
      <nav className="tr">
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;

// <p
//   onClick={() => onRouteChange("signout")}
//   className="f3 link dim black underline pa3 pointer"
// >
//   Sign Out
// </p>
