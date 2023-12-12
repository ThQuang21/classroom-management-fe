import React, {createContext, useContext, useEffect, useState} from 'react';

const UserStoreContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoadingUser(false);
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <UserStoreContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated, loadingUser }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  return useContext(UserStoreContext);
};
