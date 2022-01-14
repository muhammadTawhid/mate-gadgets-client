import "../SuccessMessage/SuccessMessage.css"
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { loginContext } from "../../App";

const CheckOut = () => {
    const [loggedInUser] = useContext(loginContext);
    const [product, setProduct] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(false)
    const productId = useParams();
    console.log(product)
    console.log(productId.id)
    
    //load product by id
    useEffect(() => {
        fetch("http://localhost:5000/productById/" + productId.id)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [])

    // place order 
        const placeOrder = () =>{
            const newOrder = {name: loggedInUser.name, email: loggedInUser.email, product: productId.id, orderTime: new Date()}
            
            fetch("http://localhost:5000/addOrders", {
                method: "POST",
                headers: {"content-type":"application/json"},
                body:JSON.stringify(newOrder)
            })
            .then(res => res.json())
            .then(data => {
                if(data){
                    setOrderSuccess(true)
                }
            })
        }
    return (
        <div>
            <Header/>
            {orderSuccess ? <div className="success-div">
            <div>
                <FontAwesomeIcon className="icon" icon={faCheckCircle} />
                <h2>Order Placed Successfully</h2>
            </div>
            <button onClick={() => setOrderSuccess(false)}>ok</button>
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
                    <td><img style={{width:"50px"}} src={product.img} alt="" /></td>
                    <td>{product.name}</td>
                    <td>1</td>
                    <td>${product.price}</td>
                </tr>
                </tbody>
                <tfoot  className="border-top-0">
                <tr>
                    <td></td>
                    <td></td>
                    <td>Total:</td>
                    <td>${product.price}</td>
                </tr>   
                </tfoot>
            </table>
            <div className="text-end">
                <button  onClick={placeOrder} className="btn btn-outline-success my-3"><b>Place Order</b></button>
            </div>
            </div>}
        </div>
    );
};

export default CheckOut;