import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    const [status, setStatus] = useState("Verifying...");
    const [reference, setReference] = useState(null);
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const reference = params.get("reference");

        if (!reference) {
            setStatus("No payment reference found.");
            return;
        }

        setReference(reference);

        const verifyPayment = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ reference }),
                });

                const data = await response.json();
                console.log("Verification Response:", data);

                if (data.status) {
                    setStatus(`Payment ${data.status}`);
                    setEmail(data.customerEmail || "No email provided");
                    setAmount(data.amountPaid || 0);
                } else {
                    setStatus("Verification failed");
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
                setStatus("Error verifying payment");
            }
        };
        verifyPayment();
    }, []);

    const isSuccess = status.toLowerCase().includes("success");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                    {status === "Verifying..." ? (
                        <div className="h-16 w-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div> // A loading spinner
                    ) : isSuccess ? (
                        <FaCheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
                    ) : (
                        <FaTimesCircle className="h-16 w-16 text-red-500 animate-pulse" />
                    )}

                    <h2 className="text-2xl font-bold text-gray-900">
                        {status === "Verifying..." ? "Payment Verifying..." : isSuccess ? "Payment Verified!" : "Payment Failed"}
                    </h2>

                    <p className="text-gray-600 text-sm">{status}</p>

                    <div className="mt-4 space-y-2 text-gray-600 text-sm">
                        {reference && (
                            <p>
                                <span className="font-semibold">Reference:</span>{" "}
                                <span className="text-gray-800">{reference}</span>
                            </p>
                        )}
                        {email && (
                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                <span className="text-gray-800">{email}</span>
                            </p>
                        )}
                        {amount > 0 && (
                            <p>
                                <span className="font-semibold">Amount:</span>{" "}
                                <span className="text-gray-800">${amount.toFixed(2)}</span>
                            </p>
                        )}
                    </div>

                    <Link to="/products"
                        className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Return to Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
