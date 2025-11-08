import { motion } from 'framer-motion';
import { Clock, CheckCircle, Star, Briefcase } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const StatusCard = ({ icon: Icon, title, value, subtitle, isRating = false, gradient, iconBg, iconColor }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex-1 min-w-0 group cursor-pointer transform hover:-translate-y-1 ${gradient}`}
    >
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-4 translate-y-4"></div>
      </div> */}
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${iconBg} backdrop-blur-sm shadow-sm`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h3 className="text-base font-semibold text-white/90 truncate flex-1">{title}</h3>
        </div>
        
        <div className="space-y-2">
          {isRating ? (
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white drop-shadow-sm">{value}</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(value)}
                </div>
                <span className="text-sm text-white/70 font-medium">({subtitle})</span>
              </div>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-white drop-shadow-sm">{value}</div>
              {subtitle && (
                <div className="text-sm text-white/80 font-medium">{subtitle}</div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white rounded-2xl"></div>
    </motion.div>
  );
};

const StatusCards = ({ data }) => {
  const defaultData = [
    {
      icon: Clock,
      title: "Avg Response Time",
      value: "2.4h",
      subtitle: "Last 30 days",
      gradient: "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800",
      iconBg: "bg-white/20 border border-white/30",
      iconColor: "text-white"
    },
    {
      icon: CheckCircle,
      title: "Jobs Completed",
      value: "127",
      subtitle: "This month",
      gradient: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800",
      iconBg: "bg-white/20 border border-white/30",
      iconColor: "text-white"
    },
    {
      icon: Star,
      title: "Rating & Feedback",
      value: 4,
      subtitle: "24 reviews",
      isRating: true,
      gradient: "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800",
      iconBg: "bg-white/20 border border-white/30",
      iconColor: "text-white"
    },
    {
      icon: Briefcase,
      title: "Applied Jobs",
      value: "18",
      subtitle: "Active applications",
      gradient: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800",
      iconBg: "bg-white/20 border border-white/30",
      iconColor: "text-white"
    }
  ];

  const statusData = data || defaultData;

  return (
    <motion.div 
      className="hidden sm:flex justify-start xl:justify-between items-center rounded-2xl gap-4 w-full flex-shrink-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statusData.map((card, index) => (
        <StatusCard
          key={index}
          icon={card.icon}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          isRating={card.isRating}
          gradient={card.gradient}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
        />
      ))}
    </motion.div>
  );
};

export default StatusCards;


// import { motion } from 'framer-motion';
// import { Clock, CheckCircle, Star, Briefcase } from 'lucide-react';

// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   }
// };

// const StatusCard = ({ icon: Icon, title, value, subtitle, isRating = false, gradient, iconBg, iconColor }) => {
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < rating 
//             ? 'text-amber-400 fill-amber-400' 
//             : 'text-gray-300 dark:text-gray-600'
//         }`}
//       />
//     ));
//   };

//   return (
//     <motion.div
//       variants={cardVariants}
//       className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex-1 min-w-0 group cursor-pointer transform hover:-translate-y-1 border border-white/20 ${gradient}`}
//     >
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
//         <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-4 translate-y-4"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {/* Header with Icon and Title */}
//         <div className="flex items-center gap-3 mb-4">
//           <div className={`p-3 rounded-xl ${iconBg} backdrop-blur-sm shadow-sm`}>
//             <Icon className={`w-6 h-6 ${iconColor}`} />
//           </div>
//           <h3 className="text-base font-semibold text-white/90 truncate flex-1">{title}</h3>
//         </div>
        
//         {/* Value Section */}
//         <div className="space-y-2">
//           {isRating ? (
//             <div className="space-y-3">
//               <div className="text-3xl font-bold text-white drop-shadow-sm">{value}</div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-1">
//                   {renderStars(value)}
//                 </div>
//                 <span className="text-sm text-white/70 font-medium">({subtitle})</span>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="text-3xl font-bold text-white drop-shadow-sm">{value}</div>
//               {subtitle && (
//                 <div className="text-sm text-white/80 font-medium">{subtitle}</div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Hover Glow Effect */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white rounded-2xl"></div>
//     </motion.div>
//   );
// };

// const StatusCards = ({ data }) => {
//   const defaultData = [
//     {
//       icon: Clock,
//       title: "Avg Response Time",
//       value: "2.4h",
//       subtitle: "Last 30 days",
//       gradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800",
//       iconBg: "bg-white/25 border border-white/40",
//       iconColor: "text-white"
//     },
//     {
//       icon: CheckCircle,
//       title: "Jobs Completed",
//       value: "127",
//       subtitle: "This month",
//       gradient: "bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800",
//       iconBg: "bg-white/25 border border-white/40",
//       iconColor: "text-white"
//     },
//     {
//       icon: Star,
//       title: "Rating & Feedback",
//       value: 4,
//       subtitle: "24 reviews",
//       isRating: true,
//       gradient: "bg-gradient-to-br from-orange-500 via-orange-600 to-red-600",
//       iconBg: "bg-white/25 border border-white/40",
//       iconColor: "text-white"
//     },
//     {
//       icon: Briefcase,
//       title: "Applied Jobs",
//       value: "18",
//       subtitle: "Active applications",
//       gradient: "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800",
//       iconBg: "bg-white/25 border border-white/40",
//       iconColor: "text-white"
//     }
//   ];

//   const statusData = data || defaultData;

//   return (
//     <motion.div 
//       className="hidden sm:flex justify-start xl:justify-between items-center rounded-2xl gap-4 w-full flex-shrink-0"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {statusData.map((card, index) => (
//         <StatusCard
//           key={index}
//           icon={card.icon}
//           title={card.title}
//           value={card.value}
//           subtitle={card.subtitle}
//           isRating={card.isRating}
//           gradient={card.gradient}
//           iconBg={card.iconBg}
//           iconColor={card.iconColor}
//         />
//       ))}
//     </motion.div>
//   );
// };

// export default StatusCards;