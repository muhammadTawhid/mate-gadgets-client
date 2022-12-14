import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Spinner from '../Spinner/Spinner';
import Footer from '../Footer/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://mate-gadgets.onrender.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const searchProduct = e => {
    if (e.target.value === "" || e.key === "Enter") {
      fetch("https://mate-gadgets.onrender.com/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    }
    if (e.target.value && e.key === "Enter") {
      fetch(`https://mate-gadgets.onrender.com/product/${e.target.value}`)
        .then(res => res.json())
        .then(data => setProducts(data))
    }
  }

  return (
    <div className='container product-card-container'>
      <Header />
      <Stack className="col-md-5"
        spacing={2}
        sx={{ justifyContent: "center", my: 0, mx: "auto" }}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={products.map((product) => product.name)}
          renderInput={(params) => (
            <TextField onKeyUp={searchProduct}
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
      {products.length === 0 && <Spinner />}
      <div className="row mt-5">
        {
          products.map(product => <ProductCard product={product} key={product._id} />)
        }
      </div>
      <Footer />
    </div>
  );
};

export default Home;