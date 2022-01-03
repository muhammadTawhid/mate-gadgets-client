import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    const searchProduct = e =>{
        console.log(e.target.value);
        if(e.key === "Enter"){
            fetch(`http://localhost:5000/product/${e.target.value}`)
            .then(res => res.json())
            .then(data => setProducts(data))
        }
    }

    return (
        <div className='container'>
            <Header/>
            <Stack
        spacing={2}
        sx={{ width: 500, justifyContent: "center", my: 0, mx: "auto" }}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={products.map((product) => product.name)}
          renderInput={(params) => (
            <TextField onKeyDown={searchProduct}
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
           <div className="row mt-5">
           {
                products.map(product => <ProductCard product={product} key={product._id}/>)
            }
           </div>
           
        </div>
    );
};

export default Home;