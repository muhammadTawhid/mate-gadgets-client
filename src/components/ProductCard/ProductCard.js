import './ProductCard.css';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


const ProductCard = (props) => {
    const { name, _id, category, price, img } = props.product;
    return (

        <div className="col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center mt-5 align-items-center">
            <Card sx={{ boxShadow: 5, border: 0 }} className="product-card">
                <div className="text-center">
                    <img src={img} alt="" />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {category}
                    </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-around mb-3">
                    <Typography gutterBottom variant="h4" component="div">${price}</Typography>
                    <Link to={`/checkOut/${_id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="success" size="large"><b>Buy Now</b></Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
};

export default ProductCard;