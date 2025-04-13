import React, { createContext, useState, useEffect, useContext } from 'react';
import authApi from '../api/auth';
import { toast } from 'react-toastify';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authApi.getUser();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }finally{
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials); 
      setUser(response.data.user);
      toast.success("Login success")
      return response;
    } catch (err) {
      toast.error("Login Failed")
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);