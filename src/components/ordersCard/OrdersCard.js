import './OrdersCard.css';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { loginContext } from '../../App';

const OrdersCard = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(loginContext)
    const { _id, userEmail, productName, productPrice, productImg, orderTime } = props.order;

    const handleRemoveOrder = (orderId) => {
        setLoggedInUser({ ...loggedInUser, reload: true })
        fetch("https://mate-gadgets.herokuapp.com/order/" + orderId, {
            method: "DELETE"
        })
            .then(res => console.log(res))
    }

    return (

        <div className="col-sm-12 col-md-6">
            <div className="card ordersCard mb-3 border- shadow">
                <div className="row orders-row-div align-items-center g-0">
                    <div className="col-sm-4 col-md-4 text-center">
                        <img src={productImg} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-sm-8 col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{productName}</h5>
                            <p className="card-text mb-0">Price: ${productPrice}</p>
                            <small className="text-muted">order submitted: {(new Date(orderTime)).toDateString("dd/MM/yyyy")}</small>
                            <br />
                            <small className="text-muted">order placed by: {userEmail}</small>
                            <Button onClick={() => handleRemoveOrder(_id)} className="my-3" variant="contained" color="success" size="large" style={{ textTransform: "none" }}><b>Remove from order list</b></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className="card mb-3 align-items-center border-0 shadow">
        //     <div className="row g-0">
        //         <div className="col-md-4">
        //             <img src={productImg} className="img-fluid rounded-start" alt="..." />
        //         </div>
        //         <div className="col-md-8">
        //             <div className="card-body">
        //                 <h5 className="card-title">{productName}</h5>
        //                 <p className="card-text mb-0">Price: ${productPrice}</p>
        //                 <small className="text-muted">order submitted: {(new Date(orderTime)).toDateString("dd/MM/yyyy")}</small>
        //                 <br />
        //                 <small className="text-muted">order placed by: {userEmail}</small>
        //                 <Button onClick={() => handleRemoveOrder(_id)} className="my-3" variant="contained" color="success" size="large" style={{ textTransform: "none" }}><b>Remove from order list</b></Button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default OrdersCard;

