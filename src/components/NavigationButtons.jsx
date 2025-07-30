// filepath: c:\Users\shiva\Desktop\Society Services App\society-services-app\src\pages\LandingPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SocietyLanding = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold mb-4">Benefits for Society</h1>
    <p className="mb-4">Join our community to access exclusive resources, support local initiatives, and connect with like-minded individuals.</p>
    <ul className="list-disc list-inside mb-4">
      <li>Access to community events and workshops</li>
      <li>Networking opportunities with local leaders</li>
      <li>Exclusive discounts on services and products</li>
    </ul>
  </div>
);

const VendorLanding = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold mb-4">Benefits for Vendors</h1>
    <p className="mb-4">Partner with us to reach a wider audience, increase your sales, and enhance your brand visibility.</p>
    <ul className="list-disc list-inside mb-4">
      <li>Access to a large customer base</li>
      <li>Marketing and promotional support</li>
      <li>Networking opportunities with other vendors</li>
    </ul>
  </div>
);

const LandingPage = () => {
  const [isSociety, setIsSociety] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <AnimatePresence>
        {isSociety ? (
          <motion.div
            key="society"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SocietyLanding />
          </motion.div>
        ) : (
          <motion.div
            key="vendor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <VendorLanding />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsSociety(true)}
        >
          For Society
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsSociety(false)}
        >
          For Vendors
        </button>
      </div>

      <Link to="/auth" className="mt-4 text-blue-600 underline">
        Login / Sign Up
      </Link>
    </div>
  );
};

export default LandingPage;