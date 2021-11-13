import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import useAdminContexts from "../Context/AdminContext";

const Dashboard = () => {
  const { active } = useAdminContexts();
  const CombineData = {
    labels: ["Active", "InActive"],
    datasets: [
      {
        label: "Test2",
        data: [active.active, active.InActive],
        backgroundColor: ["rgba(106, 151, 234, 1)", "rgba(50, 218, 209, 1)"],
        borderColor: ["rgba(106, 151, 234, 1)", "rgba(50, 218, 209, 1)"],
        // borderWidth: 0.3
      },
    ],
  };

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <Div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="header">
                  <h4 className="title">Active User</h4>
                  {/* <p className="category">Last Campaign Performance</p> */}
                </div>
                <div className="content">
                  {/* <div id="chartPreferences" className="ct-chart ct-perfect-fourth"/> */}
                  <Doughnut data={CombineData} />
                  {/* <div className="footer">
                      <div className="legend">
                        <i className="fa fa-circle text-info" /> Open
                        <i className="fa fa-circle text-danger" /> Bounce
                        <i className="fa fa-circle text-warning" /> Unsubscribe
                      </div>
                      <hr /> */}
                  {/* <div className="stats">
                        <i className="fa fa-clock-o" /> Campaign sent 2 days ago
                      </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </Div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const Div = styled.div`
  display: flex;
  justify-content: center;
  /* border-radius: ; */
`;
