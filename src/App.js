import "./App.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import UserData from "./Components/Users/UserData";
import Banner from "./Components/Banner";
import Modal from "./Components/Modal";
import Login from "./Components/Login";
import Layout from "./Layout";
import { useEffect } from "react";
import AddMorePackage from "./Components/PackageData/AddMorePackage";
import useAdminContexts from "./Context/AdminContext";

function App() {
  const { dashboard, validator} = useAdminContexts();


  useEffect(() => {
    validator();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {dashboard ? (
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/">
              <Login/>
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
