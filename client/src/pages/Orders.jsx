import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useAuth } from "@clerk/clerk-react";

const Orders = () => {
  const { currency, backendURL } = useContext(ShopContext);
  const { getToken, isSignedIn } = useAuth();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = await getToken();

      const res = await fetch(`${backendURL}/api/order/userorders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchOrders();
    }
  }, [isSignedIn]);

  return (
    <div className="border-t pt-16 mx-20">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.map((order) =>
        order.items.map((item, index) => (
          <div
            key={index}
            className="py-6 border-t border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-gray-700"
          >
            <div className="flex items-center text-sm gap-6">
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />

              <div>
                <p className="sm:text-base font-medium">{item.name}</p>

                <div className="flex items-center gap-3 mt-2 text-base">
                  <p>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="mt-2 text-sm">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(order.createdAt).toDateString()}
                  </span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>

              <button onClick={fetchOrders} className="border font-medium px-4 py-2 rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
