import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import ManageProduct from "../ManageProduct/ManageProduct";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import { MyContext } from "../Admin/Admin";

const EditProduct = (props) => {
  const { editProductId, successMessage, setSuccessMessage } = useContext(MyContext);
  const [editProduct, setEditProduct] = useState({});
  const [productImg, setProductImg] = useState(null);
  const [imgUploading, setImgUploading] = useState(false)
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (editProductId) {
      fetch("https://mate-gadgets.herokuapp.com/productById/" + editProductId)
        .then(res => res.json())
        .then(data => setEditProduct(data))
    }
  }, [editProductId])

  const onSubmit = (data) => {
    const newProduct = {
      name: data.name,
      price: data.price,
      category: data.category,
      img: productImg ? productImg : editProduct.img,
    };

    fetch("https://mate-gadgets.herokuapp.com/editProduct/" + editProductId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSuccessMessage(true)
        }
      })
  };

  const uploadImg = (e) => {
    setImgUploading(true)
    const newImgData = new FormData();
    newImgData.set("key", "be8a4cc0a70c10d0afc35bcd7b9def3d");
    newImgData.append("image", e.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", newImgData)
      .then((res) => {
        setProductImg(res.data.data.display_url);
        if (res.data.data.display_url) {
          setImgUploading(false)
        }
      });
  };



  return (
    <div>
      {successMessage ? (<SuccessMessage />)
        :
        editProductId && (
          <div style={{ marginBottom: "50px" }}>
            <div className="addProduct-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Edit Product</h2>
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
                        defaultValue={editProduct.name}
                      />
                    </div>
                    <div className="col">
                      <label>
                        <b>Product Price</b>
                      </label>
                      <input
                        {...register("price", { required: true })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Price"
                        defaultValue={editProduct.price}
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
                        defaultValue={editProduct.category}
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
                      />
                    </div>
                  </div>
                </div>
                <button id="add-product-btn" type="submit">
                  Update Product
                </button>
              </form>
            </div>
          </div>)}
      <ManageProduct />
    </div>

  );
};

export default EditProduct;