import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <ProfileIcon onRouteChange={onRouteChange} />
      </nav>
    );
  } else {
    return (
      <nav>
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
