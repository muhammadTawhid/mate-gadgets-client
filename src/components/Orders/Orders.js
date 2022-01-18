import React, { useContext, useEffect, useState } from 'react';
import { loginContext } from '../../App';
import Header from '../Header/Header';
import OrdersCard from '../ordersCard/OrdersCard';
import Spinner from '../Spinner/Spinner';

const Orders = () => {
    const [loggedInUser] = useContext(loginContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/orders?email=" + loggedInUser.email, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [loggedInUser])

    const priceArray = []
    for (let i = 0; i < orders.length; i++) {
        const product = orders[i];
        const myString = product.productPrice;
        const myNumber = parseInt(myString)
        priceArray.push(myNumber)
    }
    const total = priceArray.reduce(function (a, b) {
        return a + b;
    }, 0);

    return (
        <div>
            <Header />
            <h3 className="text-center my-3"><b>{loggedInUser.email ? "Hello" : "Sorry"} {loggedInUser.name}, <br /> {orders.length > 0 ? `You have ${orders.length} orders on pending` : `You have no orders yet! :(`}</b></h3>
            <div className="row d-flex justify-content-evenly w-100">
                {
                    orders.map(order => <OrdersCard order={order} key={order._id} />)
                }
                {orders.length > 0 ? <div className="border mt-4 w-75">
                    <h5 className="text-center text-secondary"><strong>Order Details</strong></h5>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Order Number:</th>
                                <th></th>
                                <th>#{orders[0]._id}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>product price:</th>
                                <th></th>
                                <th>${total}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Shipping charge:</th>
                                <th></th>
                                <th>$40</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Total :</th>
                                <th></th>
                                <th>${total + 40}</th>
                            </tr>
                        </thead>
                    </table>
                </div> : <Spinner />}
            </div>
        </div>
    );
};

export default Orders;