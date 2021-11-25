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
                </div>
                <div className="content">
                  <Doughnut data={CombineData} />
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="card">
                <div className="header for">
                  <h4 className="title">Refer Amount - </h4>
                  <div className="content">8</div>
                  <button>
                    <i
                      className="fa fa-pencil"
                      // onClick={() => {
                      //   // updateCommission(x._id);
                      // }}
                    />
                  </button>
                </div>
              </div>
            </div> */}
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
  /* .for {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button{
    background-color: white;
    border: none;
  } */
`;
