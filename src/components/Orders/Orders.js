import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import OrdersCard from '../ordersCard/OrdersCard';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        fetch("http://localhost:5000/orders")
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [orders])

    return (
        <div>
            <Header/>
            <h2>you have {orders.length} orders</h2>
            <div className="row container">
                {
                    orders.map(order => <OrdersCard order={order} key={order._id}/>)
                }
            </div>
        </div>
    );
};

export default Orders;