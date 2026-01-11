import React, { useEffect, useState } from "react";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH ALL ORDERS =================
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
      setLoading(false);
    }
  };

  // ================= UPDATE ORDER STATUS =================
  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(
        `${backendURL}/api/order/status`,
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAllOrders(); // refresh list
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // ================= UI =================
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Orders</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm"
          >
            {/* CUSTOMER INFO */}
            <div className="mb-3">
              <h3 className="font-semibold">Customer</h3>
              <p>Name: {order.customer?.name}</p>
              <p>Email: {order.customer?.email}</p>
              <p>Phone: {order.customer?.phone}</p>
            </div>

            {/* ADDRESS */}
            <div className="mb-3">
              <h3 className="font-semibold">Address</h3>
              <p>
                {order.address?.street}, {order.address?.city},{" "}
                {order.address?.state} - {order.address?.zip}
              </p>
            </div>

            {/* ITEMS */}
            <div className="mb-3">
              <h3 className="font-semibold">Items</h3>
              {order.items.map((item, idx) => (
                <div key={idx} className="text-sm">
                  {item.name} × {item.quantity}
                </div>
              ))}
            </div>

            {/* ORDER META */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p>
                  <strong>Total:</strong> ₹{order.amount}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-blue-600">
                    {order.status}
                  </span>
                </p>
              </div>

              {/* STATUS UPDATE */}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border px-3 py-1 rounded"
              >
                <option>Order Placed</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;