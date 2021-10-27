import React from "react";

const Dashboard = () => {
  return (
    <>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="header">
                    <h4 className="title">Email Statistics</h4>
                    <p className="category">Last Campaign Performance</p>
                  </div>
                  <div className="content">
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    />
                    <div className="footer">
                      <div className="legend">
                        <i className="fa fa-circle text-info" /> Open
                        <i className="fa fa-circle text-danger" /> Bounce
                        <i className="fa fa-circle text-warning" /> Unsubscribe
                      </div>
                      <hr />
                      <div className="stats">
                        <i className="fa fa-clock-o" /> Campaign sent 2 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card">
                  <div className="header">
                    <h4 className="title">Users Behavior</h4>
                    <p className="category">24 Hours performance</p>
                  </div>
                  <div className="content">
                    <div id="chartHours" className="ct-chart" />
                    <div className="footer">
                      <div className="legend">
                        <i className="fa fa-circle text-info" /> Open
                        <i className="fa fa-circle text-danger" /> Click
                        <i className="fa fa-circle text-warning" /> Click Second
                        Time
                      </div>
                      <hr />
                      <div className="stats">
                        <i className="fa fa-history" /> Updated 3 minutes ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Dashboard;
