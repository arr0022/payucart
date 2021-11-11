import React, { useRef, useState } from "react";
import { allUserss, packagess } from "../../ReduxProvider/CounterSlice";
import { useSelector } from "react-redux";
import useAdminContexts from "../../Context/AdminContext";
import styled from "styled-components";

// import { AllUsers, FetchUsers } from "../../ReduxProvider/CounterSlice";
// import UserDataTable from "./UserDataTable";

const UserData = () => {
  const ForEditCommission = useRef(null);
  const sendNotification = useRef(null);
  const closeUM = useRef(null);
  const clickU = useRef(null);
  const { updateUserComm, notificationApi } = useAdminContexts();
  // const [filerArray, setFilerArray] = useState([])

  const users = useSelector(allUserss);
  const packages = useSelector(packagess);

  //  const temp = useSelector(selectTemp)
  const [editUserComm, setEditUserComm] = useState({ commission: "" });
  const [notification, setNotification] = useState({ title: "", text: "" });
  const [PageNo, setPageNo] = useState({
    documents: users.length || 1,
    page: 1,
    perPage: 5,
  });
  // console.log("IN user data: ", users)
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [uId, setUId] = useState({ id: "" });

  const onChangeUserComm = (e) => {
    // console.log(uId);
    setEditUserComm({ ...editUserComm, [e.target.name]: e.target.value });
  };
  const onChangeNotification = (e) => {
    // console.log(uId);
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };

  const updateCommission = (_id) => {
    ForEditCommission.current.click();
    setUId({ ["id"]: _id });
  };
  const sendNotifications = (_id) => {
    sendNotification.current.click();
    setUId({ ["id"]: _id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUserComm.commission.length > 0) {
      clickU.current.click();
    }
  };

  // const cc = users.find(users.status == "active");

  return (
    <>
      {/* Modal Button For Commission*/}
      <button
        ref={ForEditCommission}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#editUser"
      >
        Edit Users
      </button>
      {/* Modal Button For Notification*/}
      <button
        ref={sendNotification}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#notification"
      >
        Push Notification
      </button>

      {/* Modal Content For Commission*/}
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
              <form
                className="my-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="commission" className="form-label">
                    Commission
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="commission"
                    name="commission"
                    onChange={onChangeUserComm}
                    value={editUserComm.commission}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeUM}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                ref={clickU}
                disabled={editUserComm.commission.length > 0 ? false : true}
                onClick={async () => {
                  await updateUserComm(
                    closeUM,
                    uId.id,
                    editUserComm.commission
                  );
                  setEditUserComm({ commission: "" });
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Content For Notification */}
      <div
        className="modal fade"
        id="notification"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                For Notification
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
              <form
                className="my-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChangeNotification}
                    value={notification.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">
                    Message
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    name="text"
                    onChange={onChangeNotification}
                    value={notification.text}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeUM}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                ref={clickU}
                disabled={notification.text.length > 0 ? false : true}
                onClick={async () => {
                  await notificationApi(closeUM, uId.id, notification);
                  setEditUserComm({ commission: "" });
                }}
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* User Data */}
      <div className="content">
        <div className="container-fluid">
          {/* fILTERS */}
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
                        {packages.length > 0 ? (
                          <select
                            className="form-control"
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                          >
                            <option>Select Plan</option>
                            {packages.map((x, n) => (
                              <option key={n}>{x.plan}</option>
                            ))}
                          </select>
                        ) : (
                          <select className="form-control">
                            <option>Select Plan</option>
                          </select>
                        )}
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
          {/* USER CONTENT AND EDIT CONTENT */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Number of Users</h4>
                </div>
                <div
                  className={
                    users.length <= 0
                      ? "notUsers"
                      : "content table-responsive table-full-width"
                  }
                >
                  {users.length > 0 ? (
                    <table className="table">
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
                          <th className="text-center">edit</th>
                          <th className="text-center">Notification</th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((x, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td className="text-center">{x.name}</td>
                              <td className="text-center">{x.mobile}</td>
                              <td className="text-center">{x.plan}</td>
                              <td className="text-center">
                                {x.perDayAddLimit}
                              </td>
                              <td className="text-center">{x.commission}</td>
                              <td className="text-center">{x.date}</td>
                              <td className="text-center">{x.status}</td>
                              <td className="text-center">
                                <i
                                  className="fa fa-pencil"
                                  onClick={() => {
                                    updateCommission(x._id);
                                  }}
                                />
                              </td>
                              <td className="text-center">
                                <Button
                                  onClick={() => {
                                    sendNotifications(x._id);
                                  }}
                                >
                                  Click here
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <h3>Users Doesn't Exist</h3>
                  )}
                </div>
                <Pagination>
                  <button type="button" className="btn btn-primary" disabled={PageNo.page<=1}>
                    prev
                  </button>
                  <p>Page-{PageNo.page}</p>
                  <button type="button" className="btn btn-primary" disabled={PageNo.page*PageNo.perPage >= PageNo.documents}>next</button>
                </Pagination>
              </div>
            </div>
          </div>
          {/* Pagination */}
        </div>
      </div>
    </>
  );
};

export default UserData;

const Button = styled.button`
  border: none;
  background-color: white;
  /* border-radius: ; */
`;
const Pagination = styled.div`
  margin: 10px 1%;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  button {
    border-radius: 40%;
    border: none;
    background-color: wheat;
  }

  /* border-radius: ; */
`;
