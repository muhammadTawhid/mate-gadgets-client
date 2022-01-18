import "../SuccessMessage/SuccessMessage.css"
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { loginContext } from "../../App";

const CheckOut = () => {
    const [loggedInUser] = useContext(loginContext);
    const [product, setProduct] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(false)
    const productId = useParams();

    //load product by id
    useEffect(() => {
        fetch("http://localhost:5000/productById/" + productId.id)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productId])

    // place order 
    const placeOrder = () => {
        const newOrder = { userName: loggedInUser.name, userEmail: loggedInUser.email, productId: productId.id, productName: product.name, productPrice: product.price, productImg: product.img, orderTime: new Date() }

        fetch("http://localhost:5000/addOrders", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setOrderSuccess(true)
                }
            })
    }




    return (
        <div>
            <Header />
            {orderSuccess ? <div className="success-div">
                <div>
                    <FontAwesomeIcon className="icon" icon={faCheckCircle} />
                    <h2>Order Placed Successfully</h2>
                </div>
                <Button onClick={() => setOrderSuccess(false)} variant="contained" color="success" size="large"><b>OK</b></Button>
            </div>
                :
                <div className="container shadow mt-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td><img style={{ width: "50px" }} src={product.img} alt="" /></td>
                                <td>{product.name}</td>
                                <td>1</td>
                                <td>${product.price}</td>
                            </tr>
                        </tbody>
                        <tfoot className="border-top-0">
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total:</td>
                                <td>${product.price}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-end">
                        <Button style={{ textTransform: "none" }} onClick={placeOrder} className="my-3" variant="contained" color="success" size="large"><b>Place Order</b></Button>
                    </div>
                </div>}
        </div>
    );
};

export default CheckOut;