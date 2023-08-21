import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrdersByStaffId } from './api'; // Assuming you have this function in your api.js

function CartPage() {
  const { staffId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getOrdersByStaffId(staffId);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [staffId]);

  if (orders.length === 0) return <div>No items in the cart.</div>;

  return (
    <div>
      <h2>Cart for Staff ID: {staffId}</h2>
      <ul>
        {orders.map(order => (
          <li key={order.orderID}>
            Product ID: {order.productID}, Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;
