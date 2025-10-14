import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

const SubscribeStrip = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white px-4 py-3 flex justify-center items-center gap-3 shadow-sm">
      <Crown className="h-5 w-5 text-yellow-400 flex-shrink-0" />

      <span className="text-sm font-medium text-center">
        Upgrade to Premium to access all services and priority support
      </span>

      <Link
        to="/payment"
        className="ml-3 px-4 py-1.5 bg-white text-gray-900 font-semibold rounded-md text-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        Upgrade Now
      </Link>
    </div>
  );
};

export default SubscribeStrip;
