import React, { useEffect, useState } from 'react';
import {useUserStore} from "../context/UserStoreProvider";
import {useNavigate} from "react-router-dom";

const LoginCallback = () => {
  const [userData, setUserData] = useState(null);
  const { loginUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to extract user data from URL
    const getUserDataFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userDataParam = urlParams.get('userData');
      console.log(userDataParam);

      if (userDataParam) {
        try {
          const parsedUserData = userDataParam;
          setUserData(parsedUserData);
          console.log(parsedUserData)

          loginUser({
            email: parsedUserData.email,
            id: parsedUserData.id,
            name: parsedUserData.name,
            token: parsedUserData.accessToken,
          });
          setTimeout(() => {
            navigate('/');
          }, 800);

        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    };

    // Call the function to get user data
    getUserDataFromURL();

  }, [loginUser, navigate]);

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

export default LoginCallback;
