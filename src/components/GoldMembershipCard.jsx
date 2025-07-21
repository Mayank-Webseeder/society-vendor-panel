import { motion } from 'framer-motion';

const GoldMembershipCard = () => {
  return (
    <motion.div 
      className="min-w-80 w-[60%] relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-400 group cursor-pointer border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        background: 'linear-gradient(145deg, #1f1f1f 0%, #2a2a2a 50%, #1f1f1f 100%)',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.08)'
      }}
    >
      {/* Subtle gold accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-amber-600/10"></div>
      
      {/* Sharp shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-out"></div>
      
      {/* Header Section with Highlight */}
      <div 
        className="relative z-10 p-5 pb-4 border-b border-amber-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(255, 193, 7, 0.08) 50%, rgba(255, 215, 0, 0.12) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255, 215, 0, 0.15), inset 0 -1px 0 rgba(255, 215, 0, 0.08)'
        }}
      >
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center shadow-xl border border-amber-300/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              style={{
                boxShadow: '0 8px 20px rgba(255, 193, 7, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="w-5 h-5 bg-white rounded-sm opacity-95 shadow-sm"></div>
            </motion.div> */}
            
            <div>
              <motion.h3 
                className="text-xl font-black tracking-wide mb-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  // filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                }}
              >
                VENDOR GOLD
              </motion.h3>
              <motion.p 
                className="text-amber-200 text-sm tracking-widest font-medium"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                MEMBERSHIP
              </motion.p>
            </div>
          </div>

          <motion.div 
            className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-emerald-400/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
            }}
          >
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            ACTIVE
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 p-5">
        {/* Price */}
        <motion.div 
          className="flex items-baseline justify-between mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-baseline gap-1">
            <span className="text-gray-400 text-xl">₹</span>
            <span 
              className="text-4xl font-black"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              999
            </span>
            <span className="text-gray-400 text-sm ml-1">/year</span>
          </div>
          
          <div className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2 py-1 rounded border border-amber-500/20">
            PREMIUM
          </div>
        </motion.div>

        {/* Payment Info */}
        <motion.div 
          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <span className="text-gray-200 font-medium">One-time yearly payment</span>
        </motion.div>

        {/* Validity */}
        <motion.div 
          className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xs">📅</span>
            </div>
            <div>
              <span className="text-gray-400 text-xs block">Valid until</span>
              <span className="text-blue-300 text-sm font-bold">24th June, 2026</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-gray-400 text-xs">Expires in</div>
            <div className="text-orange-400 text-sm font-bold">18 months</div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-amber-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + (i * 0.1) }}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs font-medium">Elite Member</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GoldMembershipCard;