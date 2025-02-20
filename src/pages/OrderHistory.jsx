import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import moment from "moment"

const OrderHistory = () => {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    if (!currentUser) return;
  
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
  
        const ordersList = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
            };
          })
          .filter((order) => order.reference); // Only keep orders that have a reference
  
        ordersList.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [currentUser]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-xl font-semibold text-gray-600">No orders found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Order History</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">Order ID: {order.id.slice(0, 8)}...</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "success"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">${order.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-4">
                {moment(order.orderDate).format("MMMM DD, YYYY, h:mm A")}
              </p>
              <Link
                to={`/account/orders/${order.id}`}
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory

