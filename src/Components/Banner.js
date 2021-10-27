import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <>
        <div className="content">
          <div className="container-fluid">
            <Baner className="row">
              <div className="col-sm-3">
                <div className="card">
                  <Image>
                    <img src="assets/img/sidebar-2.jpg" alt="" />
                  </Image>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <Image>
                    <img src="assets/img/sidebar-2.jpg" alt="" />
                  </Image>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <AddImage className="">
                    <input type="file" accept=".png, .jpg,  " />
                    <button>Add Image</button>
                  </AddImage>
                </div>
              </div>
            </Baner>
          </div>
        </div>
    </>
  );
};

export default Banner;

const Baner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const Image = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const AddImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  input {
    margin: 10px auto;
    width: 70%;
  }
  button {
    background: #567ac8;
    border: none;
    color: white;
  }
`;
