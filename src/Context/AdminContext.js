import React, { createContext, useContext} from "react";
import { useDispatch } from "react-redux";
import { FetchUsers, GetPackages } from "../ReduxProvider/CounterSlice";


export const AdminContext = createContext();


export const AdminState = ({children}) => {
    const host = "http://localhost:5000";
    const dispatch = useDispatch();
  
    // FetchPackages
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${host}/admindata/packages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        dispatch(GetPackages(json.packagess));
      } catch (error) {
        console.log(error.message);
      }
    };
  
    // FetchUsers
    const fetchAllUsers = async () => {
      const response = await fetch(`${host}/admindata/allUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (json.Users) {
        dispatch(FetchUsers(json.Users));
      }
    };
  
    return (
      <AdminContext.Provider value={{ fetchPackages, fetchAllUsers }}>
        {children}
      </AdminContext.Provider>
    );
};

const useAdminContexts = () => useContext(AdminContext)

export default useAdminContexts;