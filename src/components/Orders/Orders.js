import React, { useContext, useEffect, useState } from 'react';
import { loginContext } from '../../App';
import Header from '../Header/Header';
import OrdersCard from '../ordersCard/OrdersCard';
import Spinner from '../Spinner/Spinner';

// const staticOrders = [
//     {
//         _id: "61e32bd74524823a9fa012c1",
//         userName: "Sanjid Hasan",
//         userEmail: "hasansanjid93@gmail.com",
//         productId: "61d2bdf204cb1f1eb3bf2cd8",
//         productName: "Hp h100 gaming headset with mic",
//         productPrice: "248",
//         productImg: "https://i.ibb.co/yWn4mbm/hp-h100-gaming-headset-with-mic.jpg",
//         orderTime: "2022-01-15T20:17:27.084Z"
//     },

// ]

const Orders = () => {
    const [loggedInUser] = useContext(loginContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("https://mate-gadgets.herokuapp.com/orders?email=" + loggedInUser.email, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("loggedInUserToken")
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
            <h3 className="text-center my-3 orders-header"><b>{loggedInUser.email ? "Hello" : "Sorry"} {loggedInUser.name}, <br /> {orders.length > 0 ? `You have ${orders.length} orders on pending` : `You have no orders yet! :(`}</b></h3>
            <div className="">
                <div className="container orders-container">
                    <div className="row d-flex justify-content-evenly">
                        {
                            orders.map(order => <OrdersCard order={order} key={order._id} />)
                        }
                    </div>
                </div>
                {orders.length > 0 ? <div className="border mt-4 w-75 mx-auto" style={{ overflowX: "scroll" }}>
                    <h5 className="text-center text-secondary"><strong>Order Details</strong></h5>
                    <table className="table table-borderless overflow-x:auto">
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