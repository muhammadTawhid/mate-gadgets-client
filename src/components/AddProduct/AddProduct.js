import React, { useState } from 'react';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import axios from 'axios';

const AddProduct = () => {
  // const initialState = {name:"", price:"", quantity:"", img:""}
  const [productImg, setProductImg] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // const newProduct = {...product};
    // newProduct.name = data.name;
    // newProduct.price = data.price;
    // newProduct.quantity = data.quantity;
    // setProduct(newProduct)
    const newProduct = {name: data.name, price: data.price, category: data.category, img: productImg}
    console.log(newProduct)
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(newProduct)
    })
    .then(res => console.log(res))
  }

  const uploadImg = e =>{
    console.log(e.target.files[0])
    const newImgData = new FormData();
    newImgData.set("key", "be8a4cc0a70c10d0afc35bcd7b9def3d")
    newImgData.append("image", e.target.files[0])

    axios.post("https://api.imgbb.com/1/upload", newImgData)
    .then(res => {
      setProductImg(res.data.data.display_url)
      console.log(res.data.data.display_url)
    })
  }
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>

      <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: '', alignItems: '' }}>
        <AccountCircle sx={{ color: 'action.active', mr: .5, my: 3 }} />
        <TextField {...register("name", { required: true })} id="input-with-sx" label="Product Name" variant="standard" />
      </Box>

      <Box sx={{ display: '', alignItems: '' }}>
        <AccountCircle sx={{ color: 'action.active', mr: .5, my: 3 }} />
        <TextField {...register("price", { required: true })} id="input-with-sx" label="Product Price" variant="standard" />
      </Box>

      <Box sx={{ display: '', alignItems: '' }}>
        <AccountCircle sx={{ color: 'action.active', mr: .5, my: 3 }} />
        <TextField {...register("category", { required: true })} id="input-with-sx" label="Category" variant="standard" />
      </Box>

      <Box sx={{ display: '', alignItems: '' }}>
        <PhotoCamera sx={{ color: 'action.active', mr: .5, my: 3 }} />
        <label htmlFor="">
        <TextField onChange={uploadImg} id="input-with-sx" type="file" label="Upload img" variant="standard" />
        </label>
      </Box>
      <Button type='submit' variant="contained">Add Product</Button>
      </form>

    </Box>
    );
};

export default AddProduct;