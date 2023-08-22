import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrdersByStaffId } from './api';
import BackArrow from './BackArrow';

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

  if (orders.length === 0) return <div className="alert alert-warning">No items in the cart.</div>;

  return (
    <div className="container mt-5">
      <BackArrow />
      <h2 className="mb-4">Cart for {orders[0]?.staffName || `Staff ID: ${staffId}`}</h2>
      <div className="list-group">
        {orders.map((order, index) => (
          <div key={order.orderID || index} className="list-group-item">
            <strong>Product:</strong> {order.title} | 
            <strong> Quantity:</strong> {order.quantity} | 
            <strong> Total Cost:</strong> R{order.totalCost}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
