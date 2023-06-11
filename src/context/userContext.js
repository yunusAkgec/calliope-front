import React, { createContext, useState, useEffect } from "react";
import { getUsers, updateUser } from "../services/user";

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
   const [user, setUser] = useState({});
   const fetchUserList = async () => {
      getUsers().then((response) => {
         setUser(response[0]);
      });
   };

   useEffect(() => {
      fetchUserList();
   }, []);

   // Function to modify the username
   const modifyUsername = async (newUsername) => {
      setUser({ ...user, user_name: newUsername });
      let userPayload = { ...user, user_name: newUsername };
      await updateUser(userPayload);
   };

   // Create the context value
   const contextValue = {
      user,
      modifyUsername,
   };

   return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
