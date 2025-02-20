import React from "react"
import { FaFileContract, FaBalanceScale, FaExclamationTriangle } from "react-icons/fa"

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 md:text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </header>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaFileContract className="mr-3 text-indigo-600" />
                  Acceptance of Terms
                </h2>
                <p className="mt-4 text-gray-600">
                  By accessing or using our services, you agree to be bound by these Terms of Service and all applicable
                  laws and regulations. If you do not agree with any part of these terms, you may not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaBalanceScale className="mr-3 text-indigo-600" />
                  Use of Services
                </h2>
                <p className="mt-4 text-gray-600">
                  Our services are provided "as is" and "as available" without any warranties, expressed or implied. We
                  do not guarantee that our services will always be available, uninterrupted, timely, secure, or
                  error-free.
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                  <li>You must not use our services for any illegal or unauthorized purpose</li>
                  <li>You are responsible for maintaining the confidentiality of your account information</li>
                  <li>
                    We reserve the right to modify or terminate our services for any reason, without notice at any time
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaExclamationTriangle className="mr-3 text-indigo-600" />
                  Limitation of Liability
                </h2>
                <p className="mt-4 text-gray-600">
                  To the fullest extent permitted by applicable law, we shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses
                  resulting from:
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                  <li>Your use or inability to use our services</li>
                  <li>
                    Any unauthorized access to or use of our servers and/or any personal information stored therein
                  </li>
                  <li>Any interruption or cessation of transmission to or from our services</li>
                  <li>
                    Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services
                  </li>
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

export default TermsOfService

