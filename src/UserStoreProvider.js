// userStore.js
import React, { createContext, useContext, useState } from 'react';

const UserStoreContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    token: '',
  });

  const loginUser = (email, token) => {
    setUser({ email, token });
  };

  const logoutUser = () => {
    setUser({
      email: '',
      token: '',
    });
  };

  return (
    <UserStoreContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  return useContext(UserStoreContext);
};
