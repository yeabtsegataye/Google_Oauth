import {UseLogout} from "../../Hooks/useLogout"
// src/components/ProfileCard.js

import React, { useEffect, useState } from 'react';

const Home = () => {
  const { logout } = UseLogout();
  const handl_logout = () => {
    logout();
    
  };
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch data from local storage and set it in the state
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    setProfileData(dataFromLocalStorage.result);
    console.log(dataFromLocalStorage.result)
  }, []);

  return (
    <div className="profile-card">
      <h1>card</h1>
      {profileData && (
        <>
          <img src={profileData.profilePicture} alt="Profile Picture" />
          <h1 className="name">{`${profileData.firstName} ${profileData.lastName}`}</h1>
          <p className="email">{profileData.email}</p>
        </>
      )}
      <button onClick={handl_logout}>logout</button>
    </div>
  );
};

export default Home;

