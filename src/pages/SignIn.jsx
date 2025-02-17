import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaEnvelope, FaLock, FaSignInAlt, FaUserCircle } from "react-icons/fa"

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailNotVerified, setEmailNotVerified] = useState(false)
  const { login, signInWithGoogle, currentUser, resendVerificationEmail } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      if (currentUser.emailVerified) {
        navigate("/account");
      } else {
        setEmailNotVerified(true);
      }
    }
  }, [currentUser, navigate]);    

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(formData.email, formData.password)
      navigate("/account")
    } catch (err) {
      setError("Failed to sign in")
    }
    setLoading(false)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-4 py-8 md:px-10">
            <div className="text-center">
              <FaUserCircle className="mx-auto h-16 w-16 text-blue-500" />
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Welcome back!</h2>
              <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
            </div>

            {error && (
              <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {emailNotVerified && (
              <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Email not verified</p>
                <p>
                  Please check your inbox or <button 
                    onClick={() => resendVerificationEmail(currentUser.email)}
                    className="text-blue-600 hover:underline">
                    click here
                  </button> to resend the verification email.
                </p>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <FaEnvelope className="absolute bottom-4 left-3 z-50 text-gray-400" />
                  <input
                    id="email-address"
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
                  <FaLock className="absolute top-4 z-50 left-3 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-b-md relative block w-full px-10 mt-2 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaSignInAlt className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                  </span>
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
            <p className="text-xs leading-5 text-gray-500">
              By signing in, you agree to our{" "}
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
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

