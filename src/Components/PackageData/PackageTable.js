import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAdminContexts from "../../Context/AdminContext";
import { packagess } from "../../ReduxProvider/CounterSlice";


const PackageTable = () => {
  // TO UPDATE MODAL============
  const {updateDynamicPackage, deletePackage} = useAdminContexts();

  // TO OPEN MODAL============
  const EditPackageButton = useRef(null);
  // TO CLOSE MODAL============
  const closeP = useRef(null);

  // TO CLOSE MODAL============
  const clickp = useRef(null);

  // TO GET ALL PACKAGE
  const allPackages = useSelector(packagess)

  // TO GET EDIT COMMISSION FIELD
  const [editComm, setEditComm] = useState({commission: "",})
  const [id, setId] = useState({_id: ""})

  const onChangeComm = (e) =>{
    console.log(id);
    setEditComm({...editComm, [e.target.name]: e.target.value})
  }
  
  const editModal = (_id) =>{
    EditPackageButton.current.click()
    // eslint-disable-next-line
    setId({["_id"]: _id})
  }

  const handlePSubmit =(e) =>{
    e.preventDefault()
    if(editComm.commission.length>0){
      clickp.current.click();
      setTimeout(() => {
        setEditComm({commission: "",})
      }, 1000);
    }
  }

  return (
    <>
      <button ref={EditPackageButton}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#editPackage"
      >
        Edit Package
      </button>

      {/* Modal Content */}
      <div
        className="modal fade"
        id="editPackage"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* Modal Form */}
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Package
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
              <form className="my-3" onSubmit={handlePSubmit}>
                <div className="mb-3">
                  <label htmlFor="commission" className="form-label">Commission</label>
                  <input
                    type="number"
                    className="form-control"
                    id="commission"
                    name="commission"
                    onChange={onChangeComm}
                    value={editComm.commission}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeP}
              >
                Close
              </button>
              <button ref = {clickp} disabled={editComm.commission.length>0 ? false : true} type="button" className="btn btn-primary" onClick={() => {updateDynamicPackage(closeP, id._id, editComm.commission)}}>
                Edit Package
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Packages */}
      {allPackages.length>0 ? <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Plan</th>
            <th className="text-center">Daily adds</th>
            <th className="text-center">Commission</th>
            <th className="text-center">Expiry in </th>
            <th className="text-center">Total ROI</th>
            <th className="text-center">edit</th>
            <th className="text-center">delete</th>
          </tr>
        </thead>
        <tbody>
          {allPackages.map((x, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{x.plan}</td>
                <td className="text-center">{x.dailyAds}</td>
                <td className="text-center">{x.commission + " Rs"}</td>
                <td className="text-center">{x.expireIn + " days"}</td>
                <td className="text-center">{x.totalROI + "%"}</td>
                <td className="text-center">
                  <i className="fa fa-pencil" onClick={()=>editModal(x._id)}/>
                </td>
                <td className="text-center">
                  <i className="fa fa-trash" onClick={()=>deletePackage(x._id)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>: <h3>Add Some Packages To Show</h3>}
    </>
  );
};

export default PackageTable;
