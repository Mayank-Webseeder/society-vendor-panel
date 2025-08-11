import { useState } from 'react';
import { Check, Calendar, Zap, Users, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../UserContext';


const SubscriptionCard = () => {

  const { user } = useUser();
  const [showAllServices, setShowAllServices] = useState(false);

  // Calculate billing details
  const serviceBasePrice = user.serviceBasePrice;
  const servicesCount = user.servicesCount;
  const subtotal = user.totalCost;
  const gstRate = user.gstRate;
  
  // Calculate discount based on services count
  let discountPercentage = 0;
  let discountAmount = 0;
  
  if (servicesCount >= user.discountUpperLimit) {
    discountPercentage = 20; // 20% discount for 5+ services
    discountAmount = subtotal * 0.20;
  } else if (servicesCount >= user.discountLowerLimit) {
    discountPercentage = 10; // 10% discount for 3+ services
    discountAmount = subtotal * 0.10;
  }
  
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = discountedSubtotal * gstRate;
  const finalAmount = discountedSubtotal + gstAmount;

  // Function to calculate the time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const endDate = new Date(user.subscription_validTill);
    endDate.setHours(11, 30, 0, 0); // Set expiry time to 11:30 AM

    const diff = endDate - now; // Difference in milliseconds

    if (diff <= 0) {
      return "Expired";
    }

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (daysLeft >= 30) {
      const monthsLeft = Math.floor(daysLeft / 30);
      return `${monthsLeft} month${monthsLeft > 1 ? "s" : ""}`;
    } else if (daysLeft >= 1) {
      return `${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
    } else {
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      return `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`;
    }
  };

  // Main card background style
  const mainBackgroundStyle = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 100%)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)'
  };

  return (
    <motion.div
      className="mx-4 my-4 min-w-[560px] w-[52%] relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer border-solid border border-blue-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={mainBackgroundStyle}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-slate-50/20"></div>

      {/* Elegant shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1200 ease-out"></div>

      {/* Header Section */}
      <div
        className="relative z-10 p-6 pb-5"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
          boxShadow: 'inset 0 -2px 5px rgba(59, 130, 246, 0.05)'
        }}
      >
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>

        <div className="relative flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center gap-4">
            <div>
              <motion.h3
                className="text-2xl font-bold mb-1 text-amber-600"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                My Society Needs Premium
              </motion.h3>
              <motion.p
                className="text-blue-600 text-sm font-semibold tracking-wide uppercase"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Service-Based Subscription
              </motion.p>
            </div>
          </div>

          {/* Active status badge */}
          <motion.div
            className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            }}
          >
            {/* Pulsing active indicator */}
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            ACTIVE
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 p-6 pt-5">
        {/* Services and Pricing */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              <span className="text-gray-700 font-semibold">Services Selected</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{servicesCount}</span>
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-gray-500 text-sm font-medium">₹{serviceBasePrice}/service</span>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-xs">Subtotal</div>
              <div className="text-xl font-bold text-gray-900">₹{subtotal.toLocaleString()}</div>
            </div>
          </div>

          {/* Discount Display */}
          {discountPercentage > 0 && (
            <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span className="text-green-700 font-medium text-sm">
                  {discountPercentage}% Discount Applied
                </span>
              </div>
              <span className="text-green-700 font-bold">-₹{discountAmount.toLocaleString()}</span>
            </div>
          )}

          {/* Final Amount */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div>
              <span className="text-blue-100 text-sm font-medium block">Total Amount</span>
              <span className="text-xs text-blue-200">Including GST ({(gstRate * 100).toFixed(0)}%)</span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold">₹{finalAmount.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Services List */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Star size={18} className="text-blue-600" />
            <span className="text-gray-700 font-semibold">Your Services</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(showAllServices ? user.whatYouOffer : user.whatYouOffer.slice(0, 4)).map((service, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check size={14} className="text-green-600" />
                <span className="text-gray-600">{service}</span>
              </div>
            ))}
          </div>
          {user.whatYouOffer.length > 4 && (
            <div 
              className="text-sm text-blue-600 font-medium mt-2 cursor-pointer hover:text-blue-800 transition-colors"
              onClick={() => setShowAllServices(!showAllServices)}
            >
              {showAllServices 
                ? "Show less" 
                : `+ ${user.whatYouOffer.length - 4} more services`
              }
            </div>
          )}
        </motion.div>

        {/* Validity */}
        <motion.div
          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-600 rounded-xl flex items-center justify-center shadow-sm">
              <Calendar size={16} className="text-white" />
            </div>
            <div>
              <span className="text-gray-500 text-xs font-medium block">Valid until</span>
              <span className="text-slate-700 text-sm font-bold">{user.subscription_validTill}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-500 text-xs font-medium">Expires in</div>
            <div className="text-orange-600 text-sm font-bold">{calculateTimeLeft()}</div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">Premium Benefits</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Check size={12} className="text-blue-600" />
              <span className="text-blue-700">Priority Support</span>
            </div>
            <div className="flex items-center gap-1">
              <Check size={12} className="text-blue-600" />
              <span className="text-blue-700">Verified Badge</span>
            </div>
            <div className="flex items-center gap-1">
              <Check size={12} className="text-blue-600" />
              <span className="text-blue-700">Direct Leads</span>
            </div>
            <div className="flex items-center gap-1">
              <Check size={12} className="text-blue-600" />
              <span className="text-blue-700">Analytics</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 + (i * 0.1) }}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm font-medium">Premium Member</span>
        </motion.div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-3xl"></div>
    </motion.div>
  );
};

export default SubscriptionCard;