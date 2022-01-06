import "./EditProduct.css"
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const EditProduct = (props) => {
  const {editProductId, setEditProductId} = props;
  const [editProduct, setEditProduct] = useState({});
  console.log(editProduct, "get product");
  const [productImg, setProductImg] = useState(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch("http://localhost:5000/productById/" + editProductId)
    .then(res => res.json())
    .then(data => setEditProduct(data))
  }, [])

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
    .then(res => console.log(res))
  };

  const uploadImg = (e) => {
    console.log(e.target.files[0]);
    const newImgData = new FormData();
    newImgData.set("key", "be8a4cc0a70c10d0afc35bcd7b9def3d");
    newImgData.append("image", e.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", newImgData).then((res) => {
      setProductImg(res.data.data.display_url);
      console.log(res.data.data.display_url);
    });
  };

  
    return (
        <div>
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
                defaultValue={editProduct.img}
                
              />
            </div>
          </div>
        </div>
        <button id="add-product-btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
        </div>
    );
};

export default EditProduct;