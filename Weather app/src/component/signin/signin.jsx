import React, { useState, useEffect } from "react";
import { auth, provider , signOut} from "./firebase";
import { signInWithPopup } from "firebase/auth";
import WeatherApp from "./WeatherApp";

const Signin = () => {
  const [user, setUser] = useState(null);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);
      localStorage.setItem("email", data.user.email);
    });
  };

  const handleSignOut = () => {
    // Sign out the user and clear the user state
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem("email");
    });
  };

  return (
    <div>
     
      {user ? (
        <div>
          <WeatherApp />
          <button className="signout" onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button className="auth" onClick={handleClick}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Signin;
