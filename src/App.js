import "./App.css";
// import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import UserData from "./Components/Users/UserData";
import Banner from "./Components/Banner";
import Modal from "./Components/Modal";
import Login from "./Components/Login";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import AddMorePackage from "./Components/PackageData/AddMorePackage";
import useAdminContexts from "./Context/AdminContext";
import axios from "axios";

function App() {

  // const history = useHistory();
  const History = useHistory();
  const [dashboard, setDashboard] = useState(true);
  const { fetchAllUsers } = useAdminContexts();

  const validator = async () => {
    if (localStorage.getItem("token")) {
      axios
        .post(
          "http://localhost:5000/admindata/validator",
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("token"), //the token is a variable which holds the token
            },
          }
        )
        .then((res => {
          console.log(res.data.message);
          // History.push("/");
          setDashboard(false);
          fetchAllUsers();
        }));
    } else {
      // History.push("/");
    }
  };
  useEffect(() => {
    validator();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {dashboard ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Login setDashboard={setDashboard}/>
            </Route>
            <Route exact path="/login">
              <Login setDashboard={setDashboard}/>
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Layout>
            <Switch>
              <Route path="/Banner">
                <Banner />
              </Route>
              <Route path="/Modal">
                <Modal />
              </Route>
              <Route path="/Package">
                <AddMorePackage />
              </Route>
              <Route path="/users">
                <UserData />
              </Route>
              <Route path="/Dashboard">
                <Dashboard />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Layout>
        </Router>
      )}
    </>
  );
}

export default App;
