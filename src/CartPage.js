import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrdersByStaffId, getProducts, addOrder, deleteOrder } from "./api";
import BackArrow from "./BackArrow";
import { useStaff } from "./StaffContext";

function formatZAR(amount) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
};

function CartPage() {
  const { staffId } = useParams();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const { staffList } = useStaff();

  const fetchCartData = async () => {
    try {
      const ordersResponse = await getOrdersByStaffId(staffId);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await getProducts();
        setProducts(productsResponse.data);
        fetchCartData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [staffId]);

  const handleAddToCart = async (product) => {
    const existingOrder = orders.find(
      (order) => order.productID === product.productID
    );
    if (existingOrder) {
      try {
        await deleteOrder(existingOrder.orderID);
        const newOrder = {
          ...existingOrder,
          quantity: existingOrder.quantity + 1,
        };
        await addOrder(newOrder);
      } catch (error) {
        console.error("Error updating order:", error);
      }
    } else {
      const newOrder = {
        staffID: staffId,
        productID: product.productID,
        quantity: 1,
      };
      try {
        await addOrder(newOrder);
      } catch (error) {
        console.error("Error adding order:", error);
      }
    }
    fetchCartData();
  };

  const handleRemoveFromCart = async (product) => {
    const existingOrder = orders.find(
      (order) => order.productID === product.productID
    );

    if (existingOrder) {
      if (existingOrder.quantity > 1) {
        try {
          await deleteOrder(existingOrder.orderID);
          const newOrder = {
            ...existingOrder,
            quantity: existingOrder.quantity - 1,
          };
          await addOrder(newOrder);
        } catch (error) {
          console.error("Error updating order:", error);
        }
      } else {
        try {
          await deleteOrder(existingOrder.orderID);
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
      fetchCartData();
    }
  };

  const staffName = staffList.find(
    (staff) => staff.staffID === parseInt(staffId)
  )?.name;
  const cartTotal = orders.reduce((acc, order) => acc + order.totalCost, 0);

  return (
    <div className="container mt-5">
      <BackArrow />
      <h2 className="mb-4">Cart for {staffName || `Staff ID: ${staffId}`}</h2>

      <div className="accordion" id="cartAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="cartHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#cartContent"
            >
              Cart Total: <strong style={{ marginLeft: '8px' }}>{formatZAR(cartTotal)}</strong>
            </button>
          </h2>
          <div
            id="cartContent"
            className="accordion-collapse collapse show"
            data-bs-parent="#cartAccordion"
          >
            <div className="accordion-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col" className="text-end">
                        Total Cost
                      </th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.orderID || index}>
                        <td>{order.title}</td>
                        <td className="text-end">{formatZAR(order.totalCost)}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleRemoveFromCart(order)}
                          >
                            -
                          </button>
                          <span className="badge bg-primary">
                            {order.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-success ms-2"
                            onClick={() => handleAddToCart(order)}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="productsHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productsContent"
            >
              Available Products
            </button>
          </h2>
          <div
            id="productsContent"
            className="accordion-collapse collapse"
            data-bs-parent="#cartAccordion"
          >
            <div className="accordion-body">
              <div className="row">
                {products.map((product, index) => {
                  const correspondingOrder = orders.find(
                    (order) => order.productID === product.productID
                  );

                  return (
                    <div
                      key={product.productID || index}
                      className="col-md-3 mb-3"
                    >
                      <div className="card h-100">
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt={product.title}
                          style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">R{product.price}</p>
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              className="btn btn-sm btn-danger me-2"
                              onClick={() => handleRemoveFromCart(product)}
                            >
                              -
                            </button>
                            <span className="badge bg-primary">
                              {correspondingOrder
                                ? correspondingOrder.quantity
                                : 0}
                            </span>
                            <button 
                              className="btn btn-sm btn-success ms-2"
                              onClick={() => handleAddToCart(product)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
