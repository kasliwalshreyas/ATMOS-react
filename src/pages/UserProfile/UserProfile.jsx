import React from "react";
import { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <div className="user-profile-img">
          {/* <img
            className="user-profile-img"
            src={`./images/User/user${user.id % 10}.png`}
          /> */}
        </div>
        <div className="user-profile-name">
          <p>{user.name}</p>
        </div>
        <div className="user-profile-email">
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;