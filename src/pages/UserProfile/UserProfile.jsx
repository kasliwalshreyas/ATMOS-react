import React, { useEffect } from "react";
import { useState } from "react";
import Navbar_v2 from "../../UI/Navbar_v2";
import ProfileSection from "./ProfileSection";
// import ProfileSection2 from "../Profile/ProfileSection";
import { useSelector } from 'react-redux';


const UserProfile = () => {
  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);

  const user = useSelector((state) => state.user.userInfo);
  console.log(user, 'from user profile');

  // useEffect(() => {

  //   async function getUser() {
  //     const res = await fetch("http://localhost:8000/userList/" + userID);
  //     const data = await res.json();
  //     setUser(data);
  //   }
  //   getUser();
  //   // console.log(user);
  // }, [userID]);

  return (
    <>
      <Navbar_v2 />
      {user && (
        <ProfileSection user={user} />
      )}
    </>

  );
}

export default UserProfile;