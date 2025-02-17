import React from "react"
import { FaUser, FaShoppingBag, FaBell, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import ProfileSection from "./ProfileSection"
import OrderHistory from "./OrderHistory"
import NotificationPreferences from "./NotificationPreferences"
import { Navigate, useNavigate, useParams } from "react-router-dom"

const AccountPage = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const { tab } = useParams() // Get the tab from the URL

  const activeTab = tab || "profile"

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  if (!currentUser) {
    return <Navigate to="/signin" />
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Account</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-gray-50 p-4">
              <nav>
                <ul>
                  {[
                    { id: "profile", icon: FaUser, label: "Profile" },
                    { id: "orders", icon: FaShoppingBag, label: "Orders" },
                    { id: "notifications", icon: FaBell, label: "Notifications" },
                  ].map((item) => (
                    <li key={item.id} className="mb-2">
                      <button
                        onClick={() => navigate(`/account/${item.id}`)}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                          activeTab === item.id ? "bg-indigo-500 text-white" : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <item.icon className="mr-3" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-600 hover:bg-red-100"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </div>

            {/* Main content */}
            <div className="md:w-3/4 p-6">
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "orders" && <OrderHistory />}
              {activeTab === "notifications" && <NotificationPreferences />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
