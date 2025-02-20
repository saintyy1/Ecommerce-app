import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder({
            id: orderSnap.id,
            ...orderData,
          });
        } else {
          console.error("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return <p className="text-center text-gray-500">Order not found.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/account/orders" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Orders
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-5">Order Details</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="sm:text-2xl font-bold text-gray-900">Order #{order.id}</h2>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-800">
                {order.status}
              </span>
            </div>
            <p className="text-gray-600 text-xs mb-4">
              Date: {moment(order.orderDate).format('MMMM DD, YYYY, h:mm A')}
            </p>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Items</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-xl">${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
