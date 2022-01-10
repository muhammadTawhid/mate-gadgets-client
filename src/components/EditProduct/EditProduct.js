import "./EditProduct.css"
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import ManageProduct from "../ManageProduct/ManageProduct";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import { MyContext } from "../Admin/Admin";

const EditProduct = (props) => {
  const {editProductId, successMessage, setSuccessMessage} = useContext(MyContext);
  const [editProduct, setEditProduct] = useState({});
  console.log(editProductId, "get product");
  const [productImg, setProductImg] = useState(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if(editProductId ){
      fetch("http://localhost:5000/productById/" + editProductId)
      .then(res => res.json())
      .then(data => setEditProduct(data))
    }
  }, [editProductId])

  const onSubmit = (data) => {
    const newProduct = {
      name: data.name,
      price: data.price,
      category: data.category,
      img: productImg,
    };
    console.log(newProduct);

    fetch("http://localhost:5000/editProduct/" + editProductId, {
      method: "PATCH",
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        setSuccessMessage(true)
      }
    })
  };

  const uploadImg = (e) => {
    console.log(e.target.files[0]);
    const newImgData = new FormData();
    newImgData.set("key", "be8a4cc0a70c10d0afc35bcd7b9def3d");
    newImgData.append("image", e.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", newImgData)
    .then((res) => {
      setProductImg(res.data.data.display_url);
      console.log(res.data.data.display_url);
    });
  };


  
    return (
       <div>
         {successMessage ? (<SuccessMessage/>) 
          :
         editProductId && ( 
        <div style={{marginBottom: "50px"}}>
            <div className="addProduct-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Product</h2>
        <div className="form-group">
          <div className="row mt-5">
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

          <div className="row mt-5">
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
                <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                <b>Upload Photo</b>
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
            <ManageProduct/>
       </div>
    
    );
};

export default EditProduct;