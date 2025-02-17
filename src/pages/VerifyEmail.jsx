import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, useSearchParams } from "react-router-dom"

const VerifyEmail = () => {
  const { applyVerificationCode } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      const oobCode = searchParams.get("oobCode");
    
      if (!oobCode) {
        setError("Invalid verification link.");
        setLoading(false);
        return;
      }
    
      try {
        await applyVerificationCode(oobCode);
        setMessage("Email verified successfully! Redirecting to Sign In...");
        setTimeout(() => navigate("/signin"), 3000);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    verifyEmail();
  }, [searchParams, navigate, applyVerificationCode]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>

        {loading ? (
          <p className="mt-3 text-gray-600">Verifying your email...</p>
        ) : (
          <>
            {message && <p className="mt-3 font-medium text-green-600">{message}</p>}
          </>
        )}

        <button
          onClick={() => navigate("/signin")}
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  )
}

export default VerifyEmail

