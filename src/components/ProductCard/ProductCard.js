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

        <div className="col-md-4 d-flex justify-content-center mt-5 align-items-center">
            <Card sx={{ width: 300, height: 400, boxShadow: 5, border: 0 }}>
                <div className="text-center">
                    <img style={{ width: "200px" }} src={img} alt="" />
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
                    <Link to={`/checkOut/${_id}`}>
                        <Button variant="contained" color="success" size="large"><b>Buy Now</b></Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
};

export default ProductCard;