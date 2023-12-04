import React, { useEffect, useState } from 'react';
import {useUserStore} from "../UserStoreProvider";
import {useNavigate} from "react-router-dom";

const AuthHome = () => {
  const [userData, setUserData] = useState(null);
  const { user, loginUser, logoutUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to extract user data from URL
    const getUserDataFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userDataParam = urlParams.get('userData');

      if (userDataParam) {
        try {
          const parsedUserData = JSON.parse(decodeURIComponent(userDataParam));
          setUserData(parsedUserData);
          console.log(parsedUserData)
          loginUser(parsedUserData.email, parsedUserData.token);

          localStorage.setItem('email', user.email);
          localStorage.setItem('token', user.token);

          navigate('/');


        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    };

    // Call the function to get user data
    getUserDataFromURL();

  }, []);

  return (
    <div>
      <h1>Client Side</h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          {/* Add more user data properties as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default AuthHome;
