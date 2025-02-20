import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaEnvelope, FaLock, FaUserPlus, FaUserCircle } from "react-icons/fa"

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const { signup, signInWithGoogle, currentUser } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    if (currentUser && currentUser.emailVerified) {
      navigate("/account");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(formData.email, formData.password)
      setSuccessMessage("Registration successful! Please check your email to verify your account.");
    } catch (err) {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  const handleGoogleSignUp = async () => {
    try {
      setError("")
      setLoading(true)
      await signInWithGoogle()
      // The redirect will happen automatically, so we don't need to navigate here
    } catch (err) {
      setError("Failed to sign up with Google")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-4 py-8 md:px-10">
            <div className="text-center">
              <FaUserCircle className="mx-auto h-16 w-16 text-blue-500" />
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">Join us and start your journey</p>
            </div>

            {successMessage && (
              <p className="text-green-600 bg-green-100 border border-green-500 p-3 rounded-md text-center mt-4">
                {successMessage}
              </p>
            )}

            {error && (
              <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <FaEnvelope className="absolute bottom-4 left-3 z-50 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <FaLock className="absolute top-4 left-3 z-50 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none relative block w-full px-10 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <FaLock className="absolute top-4 left-3 z-50 text-gray-400" />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-b-md relative mt-2 block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaUserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                  </span>
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div>
                  <button
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
                    Sign up with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
            <p className="text-xs leading-5 text-gray-500">
              By signing up, you agree to our{" "}
              <a href="/terms" className="font-medium text-gray-900 hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="font-medium text-gray-900 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

