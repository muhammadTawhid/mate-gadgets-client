import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const ProductCard = (props) => {
    const {name, category, price, img} = props.product;
    return (
            
        <div className="col-md-4 d-flex justify-content-center mt-5 align-items-center">
            <Card sx={{ width: 300 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={img}
                    alt="green iguana"
                />
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
                    <Button variant="contained" color="success" size="large"><b>Buy Now</b></Button>
                </CardActions>
                </Card>
        </div>
    );
};

export default ProductCard;