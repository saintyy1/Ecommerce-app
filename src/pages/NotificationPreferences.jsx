import React, { useState } from "react"
import { FaBell, FaEnvelope } from "react-icons/fa"

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
  })

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FaEnvelope className="text-2xl text-indigo-600 mr-4" />
            <div>
              <p className="font-semibold">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive order updates and promotions via email</p>
            </div>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={preferences.email}
                onChange={() => handleToggle("email")}
              />
              <div
                className={`block w-14 h-8 rounded-full ${preferences.email ? "bg-indigo-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${preferences.email ? "transform translate-x-6" : ""}`}
              ></div>
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FaBell className="text-2xl text-indigo-600 mr-4" />
            <div>
              <p className="font-semibold">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications on your mobile device</p>
            </div>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={preferences.push}
                onChange={() => handleToggle("push")}
              />
              <div
                className={`block w-14 h-8 rounded-full ${preferences.push ? "bg-indigo-600" : "bg-gray-300"}`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${preferences.push ? "transform translate-x-6" : ""}`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default NotificationPreferences

