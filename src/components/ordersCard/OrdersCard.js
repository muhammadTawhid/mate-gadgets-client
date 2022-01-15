import React from 'react';

const OrdersCard = (props) => {
    const {_id, userName, userEmail, productId, productName, productPrice, productImg, orderTime} = props.order;

    const handleRemoveOrder = (orderId) =>{
        fetch("http://localhost:5000/order/" + orderId,{
            method: "DELETE"
        })
        .then(res => console.log(res))
        console.log(orderId)
    }
    return (
        <div >
            <div className="card mb-3" style={{maxWidth: "500px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={productImg} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">$ {productPrice}</p>
                    <p className="card-text"><small className="text-muted">order submitted: {orderTime}</small></p>
                    <p className="card-text"><small className="text-muted">order placed by: {userEmail}</small></p>
                    <button onClick={() => handleRemoveOrder(_id)} className="btn btn-outline-success">Remove from order list</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default OrdersCard;

