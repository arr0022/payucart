import React, { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FetchUsers,
  GetPackages,
  GetFrames,
} from "../ReduxProvider/CounterSlice";
import axios from "axios";

export const AdminContext = createContext();
export const AdminState = ({ children }) => {
  // const [pack, setPack] = useState();
  const [dashboard, setDashboard] = useState(true);

  const host = "http://localhost:5000";
  const dispatch = useDispatch();

  // FetchPackages
  const fetchPackages = async () => {
    try {
      const response = await fetch(`${host}/admindata/getpackagesbyadmin`, {
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
    try {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  //   CREATE PACKAGE
  const createDynamicPackage = async (
    closeAddPackage,
    plan,
    dailyAds,
    commission,
    expireIn,
    totalROI
  ) => {
    try {
      let temp = JSON.stringify({
        plan,
        dailyAds,
        commission,
        expireIn,
        totalROI,
      });

      const response = await fetch(`${host}/admindata/createpackage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
      const json = await response.json();

      if (json.message) {
        fetchPackages();
        closeAddPackage.current.click();
      } else {
        console.log(json, "res");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //   UPDATE PACKAGE
  const updateDynamicPackage = async (closeP, ids, commission) => {
    try {
      let temp = JSON.stringify({ commission });
      const response = await fetch(
        `http://localhost:5000/admindata/package/update/${ids}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: temp,
        }
      );
      const json = await response.json();
      if (json.message) {
        fetchPackages();
        closeP.current.click();
      } else {
        console.log(json, "res");
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  //   DELETE PACKAGE
  const deletePackage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admindata/package/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (json.message) {
        fetchPackages();
      } else {
        console.log(json, "res");
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  //   EDIT USER
  const updateUserComm = async (closeUM, id, commission) => {
    try {
      let temp = JSON.stringify({ commission });
      const response = await fetch(
        `http://localhost:5000/admindata/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: temp,
        }
      );
      const json = await response.json();
      if (json.message) {
        fetchAllUsers();
        closeUM.current.click();
      } else {
        console.log(json, "res");
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  //   CREATE Banner
  const addBanner = async (imgs) => {
    let formData = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      formData.append("img", imgs[i]);
    }
    try {
      const response = await fetch(`http://localhost:5000/admindata/banner`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const json = await response.json();
      if (json.message) {
        console.log(json.message);
        fetchBanners();
      } else {
        console.log(json, "res");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch Banner
  const fetchBanners = async () => {
    try {
      const response = await fetch(`${host}/admindata/banners`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (json.images) {
        dispatch(GetFrames(json.images));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // DELETE BANNER
  const bannerDelete = async (id, file) => {
    console.log(file);
    console.log("enter");
    let temp = JSON.stringify({ file });
    try {
      const response = await fetch(`${host}/admindata/banner/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
      const json = await response.json();
      if (json.message) {
        fetchBanners();
      } else {
        console.log(json, "res");
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  const Login = async (email, password) => {
    const response = await fetch(`${host}/auth/loginadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    // await json.success===true?{setAlert.type(primary),}
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setDashboard(false);
      fetchAllUsers();
    } else {
      alert("Invalid Credential");
    }
  };

  const notificationApi = async (closeUM, id, notification) => {
    try {
      let temp = JSON.stringify(notification);
      const response = await fetch(`${host}/admindata/notification/${id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
      const json = await response.json();
      if (json.notification) {
        closeUM.current.click();
        alert("successful");
      } else {
        console.log(json, "res");
        alert("error");
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  const validator = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.post(
          `${host}/admindata/validator`,
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("token"), //the token is a variable which holds the token
            },
          }
        );
        if (response.data.message) {
          await fetchAllUsers();
          await fetchPackages();
          await setDashboard(false)
          return;
        } else {
          setDashboard(true);
          return;
        }
      } else {
        setDashboard(true);
        return;
      }
    } catch (error) {
      setDashboard(true)
      console.log(error);
      return;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        dashboard,
        setDashboard,
        fetchPackages,
        fetchAllUsers,
        createDynamicPackage,
        updateDynamicPackage,
        deletePackage,
        updateUserComm,
        addBanner,
        fetchBanners,
        bannerDelete,
        Login,
        notificationApi,
        validator,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

const useAdminContexts = () => useContext(AdminContext);

export default useAdminContexts;
