import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../UI/Navbar";
import ProfileSection from "./ProfileSection";
import { useSelector } from 'react-redux';


const UserProfile = () => {
  // const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")));
  // const [user, setUser] = useState(null);

  const user = useSelector((state) => state.user.user);
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
      <Navbar />
      {user && (
        <ProfileSection user={user} />
      )}
    </>

  );
}

export default UserProfile;