import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { packagess } from "../../ReduxProvider/CounterSlice";


const PackageTable = ({ fetchPackages }) => {
  const EditPackageButton = useRef(null);
  // const closeP = useRef(null);
  const allPackages = useSelector(packagess)


  const deletePackage = async(id) =>{
    try {
      const response = await fetch(`http://localhost:5000/admindata/package/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if(json.message){
        fetchPackages()
      }
      else{
        console.log(json, "res")
      }
    } catch (error) {
      console.log(error.message, "err");
    }
  }

  const updatePackage = async(id) =>{
    // EditPackageButton.current.click()
    // try {
    //   const response = await fetch(`http://localhost:5000/admindata/package/update/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": localStorage.getItem("token"),
    //     },
    //   });
    //   const json = await response.json();
    //   if(json.message){
    //     fetchPackages()
    //     closeP.current.click()

    //   }
    //   else{
    //     console.log(json, "res")
    //   }
    // } catch (error) {
    //   console.log(error.message, "err");
    // }
  }


  return (
    <>
      <button ref={EditPackageButton}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#editPackage"
      >
        Edit Users
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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Package Commission
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // ref={closeP}
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
            <th className="text-center">edit & delete</th>
          </tr>
        </thead>
        <tbody>
          {allPackages.map((x, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{x.plan}</td>
                <td className="text-center">{x.dailyAds}</td>
                <td className="text-center">{x.commission}</td>
                <td className="text-center">{x.expireIn + " days"}</td>
                <td className="text-center">{x.totalROI + "%"}</td>
                <td className="text-center">
                  <i className="fa fa-pencil" onClick={updatePackage(x._id)}/>
                  <i className="fa fa-trash" onClick={deletePackage(x._id)}/>
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
