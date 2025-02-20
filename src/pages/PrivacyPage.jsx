import React from "react"
import { FaUserShield, FaUserSecret, FaLock } from "react-icons/fa"

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 md:text-xl text-gray-600 max-w-3xl mx-auto">
            At ShopNow, we are committed to protecting your personal information and respecting your privacy.
          </p>
        </header>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaUserShield className="mr-3 text-indigo-600" />
                  What Information Do We Collect?
                </h2>
                <p className="mt-4 text-gray-600">
                  We collect information that you provide to us when you use our website or services, including:
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Contact information</li>
                  <li>Payment details (processed securely through our payment providers)</li>
                  <li>Information about your use of our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaUserSecret className="mr-3 text-indigo-600" />
                  How Do We Use Your Information?
                </h2>
                <p className="mt-4 text-gray-600">We use your information for the following purposes:</p>
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                  <li>To provide and improve our services</li>
                  <li>To communicate with you about your account and orders</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To detect and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaLock className="mr-3 text-indigo-600" />
                  How Do We Protect Your Information?
                </h2>
                <p className="mt-4 text-gray-600">
                  We take reasonable measures to protect your information from unauthorized access, use, or disclosure.
                  These measures include:
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                  <li>Using encryption for data transmission</li>
                  <li>Implementing access controls and authentication measures</li>
                  <li>Regularly updating our security practices</li>
                  <li>Training our staff on data protection</li>
                </ul>
              </section>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

