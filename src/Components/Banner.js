import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useAdminContexts from "../Context/AdminContext";
import { fetchBaners } from "../ReduxProvider/CounterSlice";

const Banner = () => {
  // const formImage = useRef(null)
  const [imgs, setImgs] = useState({});
  const { addBanner, fetchBanners, bannerDelete } = useAdminContexts();
  const banners = useSelector(fetchBaners);

  const add = (e) => {
    setImgs(e.target.files);
  };

  const formData = async (e) => {
    e.preventDefault();
    addBanner(imgs);
  };

  

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="content">
        <div className="container-fluid">
          <Baner className="row">
            {banners.map((x, index) => {
              return (
                <div className="col-sm-3">
                  <div className="card">
                    <Image>
                      <img
                        src={`${x.bannerImage}`}
                        alt="not available"
                      />
                      <I>
                        <i className="fa fa-trash" onClick={() => bannerDelete(x._id, x.bannerImage)}/>
                      </I>
                    </Image>
                  </div>
                </div>
              );
            })}
            <div className="col-sm-3">
              <div className="card">
                <AddImage className="">
                  <label htmlFor="files">Select files:</label>
                  <input
                    type="file"
                    accept=".png, .jpg,"
                    id="img"
                    name="img"
                    onChange={add}
                    multiple
                  />
                  <button type="button" onClick={formData}>
                    Add Image
                  </button>
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

const I = styled.i`
  display: none;
  width: 100%;
  height: 100%;
  i{
    position: absolute;
    top: 31%;
    font-size: 50px;
    left: 44%;
    width: fit-content;
  }
`;
const Image = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:hover ${I} {
    display: block;
  }
`;

const AddImage = styled.form`
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
