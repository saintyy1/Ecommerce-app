import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaLock, FaSpinner } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin", { state: { from: "/checkout" } });
    } else {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFormData((prevData) => ({
              ...prevData,
              email: currentUser.email || "",
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
            }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              email: currentUser.email || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [currentUser, navigate]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {

      const userId = currentUser.uid; // Get user ID from Firebase Auth
      const email = currentUser.email; // Get user email
      const orderId = Date.now().toString(); // Generate unique ID

      // Step 1: Save order in Firestore based on userId
      const orderRef = doc(db, "orders", orderId); // Save the order under the user's ID
      await setDoc(orderRef, {
          email,
          userId,
          orderId,
          items: cart,
          amount: total,
          status: "pending",
          reference: null, // No reference yet
          orderDate: new Date().toISOString(),
      });

      const callbackUrl = "http://localhost:5173/order-confirmation"; // Redirect URL after payment
      const response = await fetch("http://localhost:5000/api/initialize-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, amount: total, callback_url: callbackUrl, orderId: orderId }),
      });

      const data = await response.json();
      if (data.message && data.data.authorization_url) {
        window.location.href = data.data.authorization_url; // Redirect user to Paystack
      } else {
        console.error("Payment initialization failed", data);
      }
    } catch (error) {
      console.error("Error initializing payment", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="col-span-1 p-2 border rounded-lg"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="col-span-1 p-2 border rounded-lg"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-2 border rounded-lg"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full p-2 border rounded-lg"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="p-2 border rounded-lg"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="p-2 border rounded-lg"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  className="w-full p-2 border rounded-lg"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" /> Pay Now
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
