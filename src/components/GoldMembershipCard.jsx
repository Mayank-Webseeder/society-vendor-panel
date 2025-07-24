import { motion } from 'framer-motion';
import { useUser } from '../UserContext';


const GoldMembershipCard = () => {

  const { user } = useUser();

  // Function to calculate the time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const endDate = new Date(user.membershipEndDate);
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

  // Directly apply the desired main card background style
  const mainBackgroundStyle = {
    background: 'linear-gradient(135deg, #FFFDFB 0%, #FFF9F5 100%)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)'
  };

  return (
    <motion.div
      className="mx-4 my-4 min-w-[560px] w-[52%] relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer border-solid border border-amber-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={mainBackgroundStyle} // Apply the fixed background style
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-orange-50/20"></div>

      {/* Elegant shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1200 ease-out"></div>

      {/* Header Section - Enhanced with a more visible subtle golden gradient */}
      <div
        className="relative z-10 p-6 pb-5"
        style={{
          // Header background to a subtle golden gradient
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
          borderBottom: '1px solid rgba(251, 191, 36, 0.15)',
          boxShadow: 'inset 0 -2px 5px rgba(245, 158, 11, 0.05)'
        }}
      >
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Removed the entire premium icon div */}
            <div>
              <motion.h3
                className="text-2xl font-bold mb-1 text-gray-900"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Vendor Gold
              </motion.h3>
              <motion.p
                className="text-amber-600 text-sm font-semibold tracking-wide uppercase"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Premium Membership
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
        {/* Price */}
        <motion.div
          className="flex items-baseline justify-between mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-baseline gap-1">
            <span className="text-gray-500 text-xl font-medium">₹</span>
            <span className="text-5xl font-bold text-gray-900">
              {user.membershipPrice}
            </span>
            <span className="text-gray-500 text-sm ml-2 font-medium">/year</span>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200">
            PREMIUM
          </div>
        </motion.div>
        {/* Payment Info */}
        <motion.div
          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
            {/* Checkmark SVG icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-gray-700 font-medium">One-time yearly payment</span>
        </motion.div>
        {/* Validity */}
        <motion.div
          className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-100"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              {/* Calendar SVG icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <span className="text-gray-500 text-xs font-medium block">Valid until</span>
              <span className="text-blue-700 text-sm font-bold">{user.membershipEndDate}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-500 text-xs font-medium">Expires in</div>
            <div className="text-orange-600 text-sm font-bold">{calculateTimeLeft()}</div>
          </div>
        </motion.div>
        {/* Footer */}
        <motion.div
          className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + (i * 0.1) }}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm font-medium">Elite Member</span>
        </motion.div>
      </div>
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-100/30 to-transparent rounded-bl-3xl"></div>
    </motion.div>
  );
};

export default GoldMembershipCard;