import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaCheck, FaExclamationTriangle } from "react-icons/fa";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oobCode, setOobCode] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmReset } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setError("Invalid or expired password reset link. Request a new one.");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    
    try {
      setError("");
      setLoading(true);
      await confirmReset(oobCode, formData.password);
      setSuccess("Password reset successfully. Redirecting to sign in...");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-2xl rounded-3xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
            <p className="mt-2 text-sm text-gray-600">Enter your new password below</p>
          </div>

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center">
              <FaCheck className="flex-shrink-0 mr-3" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
              <FaExclamationTriangle className="flex-shrink-0 mr-3" />
              <span>{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <div className="relative">
                <FaLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-10 py-3 border rounded-t-md"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="relative">
                <FaCheck className="absolute top-4 left-3 text-gray-400" />
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-10 py-3 border rounded-b-md"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !oobCode}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
