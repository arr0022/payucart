import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useAdminContexts from "../../Context/AdminContext";
import { packagess } from "../../ReduxProvider/CounterSlice";
import PackageTable from "./PackageTable";
// import env from "../../env.env";
// import axios from "axios";



const AddMorePackage = () => {
  const {fetchPackages, createDynamicPackage} = useAdminContexts();
  const allPackages = useSelector(packagess);
  const closeAddPackage = useRef(null);
  const [addPackage, setAddPackage] = useState({plan: "", dailyAds: "", commission:"",expireIn:"",totalROI:""}) ;



  // FOR CHANGE
  const onPackageChange = (e)=>{
    setAddPackage({...addPackage, [e.target.name]: e.target.value})
    // addPackage.plan.length>0 && addPackage.dailyAds.length>0 && addPackage.commission.length>0 && addPackage.expireIn.length>0 && addPackage.totalROI.length>0 ? console.log(JSON.stringify({...addPackage})) :console.log("notYet")
  }

  // FOR CREATE MESSAGE
  const createPackage = async(e) => {
    e.preventDefault();
    createDynamicPackage(closeAddPackage, addPackage.plan, addPackage.dailyAds, addPackage.commission, addPackage.expireIn, addPackage.totalROI)
  }


  useEffect(() => {
    console.log("underPackage");
    fetchPackages()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {/* Modal Content*/}
      <div
        className="modal fade"
        id="addModal"
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
                Add Package
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
                  <label htmlFor="plan" className="form-label">Plan</label>
                  <input
                    type="number"
                    className="form-control"
                    id="plan"
                    name="plan"
                    onChange={onPackageChange}
                    value={addPackage.plan}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dailyads" className="form-label">
                    Daily Ads
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="dailyAds"
                    name="dailyAds"
                    onChange={onPackageChange}
                    value={addPackage.dailyAds}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="commission" className="form-label">
                    Commission
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="commission"
                    name="commission"
                    onChange={onPackageChange}
                    value={addPackage.commission}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expiry_in" className="form-label">
                    Expiry in
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="expireIn"
                    name="expireIn"
                    onChange={onPackageChange}
                    value={addPackage.expireIn}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="totalROI" className="form-label">
                    Total ROI
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalROI"
                    name="totalROI"
                    onChange={onPackageChange}
                    value={addPackage.totalROI}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeAddPackage}
              >
                Close
              </button>
              <button disabled={addPackage.plan.length>0 && addPackage.dailyAds.length>0 && addPackage.commission.length>0 && addPackage.expireIn.length>0 && addPackage.totalROI.length>0 ? false : true} type="button" className="btn btn-primary" onClick={createPackage}>
                Create Package
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Package Code */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">Packages</h4>
                </div>
                <div className={allPackages.length <= 0 ? "notUsers" : "content table-responsive table-full-width"}>
                <PackageTable fetchPackages={fetchPackages}/>
                </div>
                <ModalButton className="d-flex flex-column justify-content-center">
                  {/* Button trigger modal */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    Add Package
                  </button>
                </ModalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMorePackage;

const ModalButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
