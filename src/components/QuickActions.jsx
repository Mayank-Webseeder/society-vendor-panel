import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, MessageSquare, UserPen, ArrowRight } from 'lucide-react';


const actions = [
  {
    icon: FileText,
    label: 'Apply for New Job',
    description: 'Browse and apply to opportunities',
    gradient: 'from-blue-500 to-blue-600',
    shadowColor: 'shadow-blue-500/25',
    redirect: '/new-leads'
  },
  {
    icon: Calendar,
    label: 'Update Availability',
    description: 'Manage your work schedule',
    gradient: 'from-emerald-500 to-emerald-600',
    shadowColor: 'shadow-emerald-500/25',
    redirect: '/my-profile/work-details'
  },
  {
    icon: UserPen,
    label: 'Update Profile',
    description: 'Make changes to your profile',
    gradient: 'from-purple-500 to-purple-600',
    shadowColor: 'shadow-purple-500/25',
    redirect: '/my-profile'
  }
];



const QuickActions = () => {

  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState(null);

  const handleActionClick = (action) => {
    setActiveAction(action.label);
    if (action.redirect) {
      navigate(action.redirect);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      className="bg-white/80 border border-gray-100 rounded-2xl shadow-md p-3 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Heading */}
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <div>
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 tracking-tight">Quick Actions</h2>
          <p className="text-gray-500 mt-0.5 sm:mt-2 ml-2 text-xs sm:text-sm">Get things done faster</p>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="block sm:hidden">
        <motion.div
          className="flex gap-2 overflow-x-auto pb-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.button
                key={action.label}
                variants={itemVariants}
                className={`group relative flex-shrink-0 w-20 h-20 bg-gradient-to-br ${action.gradient} rounded-2xl text-center transition-all duration-300 hover:scale-[1.02] border-0 cursor-pointer`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActionClick(action)}
              >
                {/* Icon container */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-1">
                    <IconComponent className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-white text-xs font-medium leading-tight px-1">
                    {action.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Desktop Design */}
      <motion.div
        className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <motion.button
              key={action.label}
              variants={itemVariants}
              className={`group relative overflow-hidden bg-gradient-to-br ${action.gradient} rounded-2xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${action.shadowColor} border-0 cursor-pointer`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleActionClick(action)}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6 transition-transform duration-500 group-hover:scale-110"></div>
              
              {/* Icon container */}
              <div className="relative z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {action.label}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  {action.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="flex items-center text-white/90 group-hover:translate-x-2 transition-all duration-300 delay-100">
                  <span className="text-xs font-medium mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Go
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Bottom accent */}
      <div className="mt-0 pt-6">
        <div className="flex items-center justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 bg-gray-300 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: dot * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;


// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const actions = [
//   {
//     icon: '📋',
//     label: 'Apply for New Job',
//     bg: 'bg-blue-500',
//     hoverBg: 'hover:bg-blue-600',
//     redirect: '/new-leads'
//   },
//   {
//     icon: '📅',
//     label: 'Update Availability',
//     bg: 'bg-green-500',
//     hoverBg: 'hover:bg-green-600',
//     redirect: '/my-profile/work-details'
//   },
//   {
//     icon: '💬',
//     label: 'View Messages',
//     bg: 'bg-purple-500',
//     hoverBg: 'hover:bg-purple-600',
//     redirect: ''
//   }
// ];



// const QuickActions = () => {

//   const navigate = useNavigate();

//   return(
//     <motion.div
//       className="bg-white rounded-2xl shadow-md p-5"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       // transition={{ delay: 0.5 }}
//     >
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {actions.map(action => (
//           <motion.button
//             key={action.label}
//             className={`py-3 px-4 border-none ${action.bg} ${action.hoverBg} text-white text-base rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center gap-2`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => {
//               if (action.redirect) {
//                 navigate(action.redirect);
//               }
//             }}
//           >
//             <span>{action.icon}</span>
//             {action.label}
//           </motion.button>
//         ))}
//       </div>
//     </motion.div>
// )};

// export default QuickActions;