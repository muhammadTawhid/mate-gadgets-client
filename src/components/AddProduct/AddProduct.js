import React, { useState, useContext } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import { MyContext } from "../Admin/Admin";


const AddProduct = () => {
  const { successMessage, setSuccessMessage } = useContext(MyContext);
  const [productImg, setProductImg] = useState(null);
  const [imgUploading, setImgUploading] = useState(false)
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newProduct = {
      name: data.name,
      price: data.price,
      category: data.category,
      img: productImg,
    };
    fetch("https://mate-gadgets.onrender.com/addProduct", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccessMessage(true)
        }
      })
  };

  const uploadImg = (e) => {
    setImgUploading(true)
    const newImgData = new FormData();
    newImgData.set("key", "be8a4cc0a70c10d0afc35bcd7b9def3d");
    newImgData.append("image", e.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", newImgData).then((res) => {
      setProductImg(res.data.data.display_url);
      if (res.data.data.display_url) {
        setImgUploading(false);
      }
    });
  };
  return (
    <div>
      {successMessage ? (<SuccessMessage />)
        :
        (<div className="addProduct-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add Product</h2>
            <div className="form-group">
              <div className="row first-row">
                <div className="col">
                  <label>
                    <b>Product Name</b>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    required="required"
                  />
                </div>
                <div className="col">
                  <label>
                    <b>Product Price</b>
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    required="required"
                  />
                </div>
              </div>

              <div className="row second-row">
                <div className="col">
                  <label>
                    <b>Category</b>
                  </label>
                  <input
                    {...register("category", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                    required="required"
                  />
                </div>
                <div className="col">
                  <p>
                    <b>Add Photo</b>
                  </p>
                  <label id="upload-pic-btn" htmlFor="pic-upload">
                    {imgUploading ? <b><span style={{ width: "15px", height: "15px" }} className="spinner-border"></span> Uploading...</b> : <b><FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />Upload Photo</b>}
                  </label>
                  <input
                    onChange={uploadImg}
                    hidden
                    id="pic-upload"
                    type="file"
                    className="form-control"
                    placeholder="Upload Pic"
                    required="required"
                  />
                </div>
              </div>
            </div>
            <div className="add-product-btn-div">
              <button id="add-product-btn" type="submit">
                Add Product
              </button>
            </div>
          </form>
        </div>)}
    </div>
  );
};

export default AddProduct;
