import React, { useRef, useState } from "react";
import { allUserss } from "../../ReduxProvider/CounterSlice";
import { useSelector } from "react-redux";
// import { AllUsers, FetchUsers } from "../../ReduxProvider/CounterSlice";
// import UserDataTable from "./UserDataTable";

const UserData = () => {

  //  const temp = useSelector(selectTemp)
  const users = useSelector(allUserss)
  
  // console.log("IN user data: ", users)
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");

  const ForEditCommission = useRef(null);

  const updateCommission = () => {
    ForEditCommission.current.click();
  };
  
  return (
    <>
      {/* Modal Button */}
      <button ref={ForEditCommission}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#editUser"
      >
        Edit Users
      </button>

      {/* Modal Content */}
      <div
        className="modal fade"
        id="editUser"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit User Commission
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="totalreturn" className="form-label">
                    Commission Per Day
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalreturn"
                    name="totalreturn"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Data */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Filters</h4>
                </div>
                <div className="content">
                  <div className="row">
                    <div className="col-md-3 col-xl-3 col-sm-6">
                      <div className="ml-xl-4 mt-3">
                        <input type="date" className="form-control" />
                      </div>
                    </div>

                    <div className="col-md-3 col-xl-3 col-sm-6">
                      <div className="ml-xl-4 mt-3">
                        <select
                          className="form-control"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option>Select status</option>
                          <option>Active</option>
                          <option>Deactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3 col-xl-3 col-sm-6">
                      <div className="ml-xl-4 mt-3">
                        <select
                          className="form-control"
                          value={plan}
                          onChange={(e) => setPlan(e.target.value)}
                        >
                          <option>Select Plan</option>

                          {/* {User_Dat.map((x, index) => {
                            return (
                              <option key={index} value={x.status}>
                                {x.status}
                              </option>
                            );
                          })} */}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3 col-xl-3 col-sm-6">
                      <div className="ml-xl-4 mt-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search By User Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Number of Users</h4>
                </div>
                <div className={users.length<=0 ? "notUsers" :"content table-responsive table-full-width"}>
                  {users.length>0 ? <table className="table">
                    <thead>
                      <tr>
                        <th className="text-center">No.</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Mobile</th>
                        <th className="text-center">Plan</th>
                        <th className="text-center">PerAdsLimit</th>
                        <th className="text-center">Commission</th>
                        <th className="text-center">Date of Orgin</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">edit & delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{x.name}</td>
                            <td className="text-center">{x.mobile}</td>
                            <td className="text-center">{x.plan || "None"}</td>
                            <td className="text-center">{x.perDayAddLimit || "None"}</td>
                            <td className="text-center">{x.perAdsIncome || "None"}</td>
                            <td className="text-center">{x.date}</td>
                            <td className="text-center">{x.status || "None" }</td>
                            <td className="text-center">
                              <i className="fa fa-pencil" onClick={updateCommission}/>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table> : <h3>Users Doesn't Exist</h3>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
