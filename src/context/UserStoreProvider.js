import React, {createContext, useContext, useEffect, useState} from 'react';

const UserStoreContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsTeacher = localStorage.getItem('isTeacher');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoadingUser(false);
    }

    if (storedIsTeacher) {
      setIsTeacher(JSON.parse(storedIsTeacher));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setIsTeacher(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isTeacher');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const setIsTeacherStatus = (status) => {
    setIsTeacher(status);
    localStorage.setItem('isTeacher', JSON.stringify(status));
  };

  return (
    <UserStoreContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated,
      loadingUser, isTeacher, setIsTeacherStatus
    }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  return useContext(UserStoreContext);
};
