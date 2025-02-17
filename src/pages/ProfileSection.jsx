import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { toast } from "react-toastify"
import { FaSpinner } from "react-icons/fa"

const ProfileSection = () => {
  const { currentUser } = useAuth()
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProfile(docSnap.data())
        } else {
          setProfile({
            firstName: "",
            lastName: "",
            email: currentUser.email,
            phone: "",
          })
        }
        setLoading(false)
      }
    }

    fetchProfile()
  }, [currentUser])

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await setDoc(doc(db, "users", currentUser.uid), profile)
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Information</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-indigo-600 text-4xl" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ProfileSection

