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
  const [PageNo, setPageNo] = useState({
    documents: 1,
    page: 1,
    perPage: 5,
  });
  const [condition, setCondition] = useState({ status: "", plan: "" });
  const [active, setActive] = useState({ active: "", Inactive: "" });
  const host = "http://51eb-47-31-227-119.ngrok.io";
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
      // dispatch(GetPackages(json.packagess));
    } catch (error) {
      console.log(error.message);
    }
  };

  // FetchUsers
  const fetchAllUsers = async () => {
    try {
      // console.log(PageNo)
      let temp = JSON.stringify({
        condition,
        PageNo,
      });
      const response = await fetch(`${host}/admindata/allUserss`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
      const json = await response.json();
      if (json) {
        if (json.documents !== PageNo.documents) {
          setPageNo({ ...PageNo, ["documents"]: json.documents });
        }
        // console.log(json);
        dispatch(FetchUsers(json.data));
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
      const response = await fetch(`${host}/admindata/package/update/${ids}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
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
      const response = await fetch(`${host}/admindata/package/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
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
      const response = await fetch(`${host}/admindata/user/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
      const json = await response.json();
      if (json.message) {
        closeUM.current.click();
        fetchAllUsers();
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
      const response = await fetch(`${host}/admindata/banner`, {
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

  const notificationApi = async (closeM, id, notification, setNotification) => {
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
        closeM.current.click();
        setNotification({ title: "", text: "" });
      } else {
        console.log(json, "res");
        alert("error");
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  const notificationToAll = async (
    closeAM,
    notification_To_All,
    setNotification_To_All
  ) => {
    try {
      let temp = JSON.stringify(notification_To_All);
      const response = await fetch(`${host}/admindata/notificationtoall`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: temp,
      });
      const json = await response.json();
      if (json.notification) {
        closeAM.current.click();
        setNotification_To_All({ title: "", text: "" });
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
        // let temp = JSON.stringify("notification_To_All");
        const response = await axios.post(`${host}/admindata/validator`,
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("token"), //the token is a variable which holds the token
            },
          }
        );
        if (response.data.message) {
          await setDashboard(false);
          setActive({
            ...active,
            ["active"]: response.data.active,
            ["InActive"]: response.data.InActive,
          });
          await fetchAllUsers();
          await fetchPackages();
        } else {
          setDashboard(true);
          return;
        }
      } else {
        setDashboard(true);
        return;
      }
    } catch (error) {
      setDashboard(true);
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
        PageNo,
        setPageNo,
        condition,
        setCondition,
        notificationToAll,
        active,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

const useAdminContexts = () => useContext(AdminContext);

export default useAdminContexts;
