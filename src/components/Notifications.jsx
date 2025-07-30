import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Bell, BellRing, CheckCircle, AlertTriangle, Info, DollarSign, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { notifications as notificationsData, notificationCount } from '../static/dummyData_Notifications';
import { useUser } from '../UserContext';


const typeConfig = {
  info: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-l-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: Info
  },
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-l-green-400',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    icon: CheckCircle
  },
  warning: {
    bgColor: 'bg-orange-50',
    borderColor: 'border-l-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    icon: AlertTriangle
  },
  error: {
    bgColor: 'bg-red-50',
    borderColor: 'border-l-red-400',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    icon: AlertTriangle
  }
};

const getNotificationIcon = (message) => {
  if (message.toLowerCase().includes('payment') || message.toLowerCase().includes('received')) {
    return DollarSign;
  }
  if (message.toLowerCase().includes('feedback') || message.toLowerCase().includes('client')) {
    return MessageSquare;
  }
  if (message.toLowerCase().includes('job') || message.toLowerCase().includes('opportunity')) {
    return BellRing;
  }
  return Info;
};

const NotificationItem = ({ notification, index, onNotificationClick }) => {
  const config = typeConfig[notification.type] || typeConfig.info;
  const IconComponent = getNotificationIcon(notification.message);

  return (
    <motion.div
      className={`group relative rounded-xl border-l-4 ${config.bgColor} ${config.borderColor} hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden`}
      whileHover={{ x: 2 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onNotificationClick}
    >
      <div className="px-4 py-2 flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 leading-relaxed mb-1">
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 font-medium">
            {notification.time}
          </p>
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-4 opacity-80" />
      </div>
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};



const Notifications = () => {

  const { user } = useUser();

  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);

  // Use imported notifications and notificationCount
  const allNotifications = notificationsData;
  const count = notificationCount();

  const displayedNotifications = showAll ? allNotifications : allNotifications.slice(0, 3);

  // Close on outside click when showAll is true
  useEffect(() => {
    if (!showAll) return;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAll]);

  const handleNotificationClick = (notification) => {
    if (notification.locked) {
      setOpenModal(true);
    } else {
      // Handle the notification click for unlocked notifications
      console.log('Notification clicked:', notification);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-fit rounded-2xl flex flex-col"
    >
      <motion.div
        className="rounded-2xl backdrop-blur-sm shadow-md flex flex-col bg-white border border-gray-100 overflow-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={
          showAll
            ? { maxHeight: 545, overflowY: 'auto' }
            : { maxHeight: 545, overflowY: 'hidden' }
        }
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-50 bg-gradient-to-r from-gray-50/50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div> */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Notifications</h2>
                <p className="text-sm text-gray-500 mt-0.5">Stay updated with your activities</p>
              </div>
            </div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              {
                user.membershipActive  &&  user.notificationsEnabled  &&  (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs text-white font-bold">{count}</span>
                    </div>
                    {count > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                    )}
                  </>
                )
              }
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-3">
            {!user.membershipActive ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-base font-medium mb-1">Notifications are locked</p>
                <p className="text-gray-400 text-sm">Subscribe to unlock notifications and stay updated.</p>
              </div>
            ) : count === 0 || !user.notificationsEnabled ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-base font-medium mb-1">No notifications</p>
                <p className="text-gray-400 text-sm">We'll notify you when something happens</p>
              </div>
            ) : (
              displayedNotifications.map((notification, index) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  index={index} 
                  onNotificationClick={() => handleNotificationClick(notification)} 
                />
              )))
            }
          </div>

          {/* Action Buttons */}
          {(!showAll && count > 3 && user.notificationsEnabled && user.membershipActive) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                variant="outlined" 
                color="primary"
                sx={{
                  marginTop: 4,
                  borderRadius: '12px',
                  width: '100%',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: '#e5e7eb',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#3b82f6',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb'
                  }
                }}
                onClick={() => setShowAll(true)}
              >
                <span className="flex items-center gap-2">
                  VIEW ALL NOTIFICATIONS
                  <ChevronDown size={16} />
                </span>
              </Button>
            </motion.div>
          )}
          
          {(showAll && count > 3 && user.notificationsEnabled && user.membershipActive) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant='outlined'
                color='primary'
                sx={{
                  marginTop: 4,
                  borderRadius: '12px',
                  width: '100%',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: '#e5e7eb',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#3b82f6',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb'
                  }
                }}
                onClick={() => setShowAll(false)}
              >
                <span className="flex items-center gap-2">
                  Show Less
                  <ChevronUp size={16} />
                </span>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;



// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Button from '@mui/material/Button';
// import { notifications as notificationsData, notificationCount } from '../static/dummyData_Notifications';


// const typeColors = {
//   info: 'bg-blue-50 border-l-blue-400',
//   success: 'bg-green-50 border-l-green-400',
//   warning: 'bg-yellow-50 border-l-yellow-400',
//   error: 'bg-red-50 border-l-red-400'
// };

// const NotificationItem = ({ notification }) => (
//   <motion.div
//     className={`p-3 rounded-lg border-l-4 ${typeColors[notification.type] || ''} hover:bg-opacity-80 transition-colors cursor-pointer`}
//     whileHover={{ scale: 1.01 }}
//   >
//     <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
//     <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//   </motion.div>
// );



// const Notifications = () => {

//   const [showAll, setShowAll] = useState(false);
//   const containerRef = useRef(null);

//   // Use imported notifications and notificationCount
//   const allNotifications = notificationsData;
//   const count = notificationCount();

//   const displayedNotifications = showAll ? allNotifications : allNotifications.slice(0, 3);

//   // Close on outside click when showAll is true
//   useEffect(() => {
//     if (!showAll) return;
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setShowAll(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showAll]);



//   return (
//     <div
//     ref={containerRef}
//       className="w-full bg-gray-200 p-2 rounded-2xl
//                 text-gray-800 border border-gray-800 flex flex-col gap-5 h-full"
//     >
//       <motion.div
//         className="rounded-2xl flex flex-col shadow-md p-4 bg-white"
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         style={
//           showAll
//             ? { maxHeight: 420, overflowY: 'auto' }
//             : { maxHeight: 'none', overflowY: 'visible' }
//         }
//       >
//         <div className="flex items-center justify-between mb-4 p-2">
//           <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
//           <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//             <span className="text-xs text-white font-bold">{count}</span>
//           </div>
//         </div>
//         <div className="space-y-3">
//           {count === 0 ? (
//             <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
//           ) : (
//             displayedNotifications.map((notification) => (
//               <NotificationItem key={notification.id} notification={notification} />
//             ))
//           )}
//         </div>
//         {(!showAll && count > 3) && (
//           <Button 
//             variant="outlined" 
//             color="primary"
//             sx={{
//               marginTop: 3,
//               borderRadius: '8px',
//               width: '85%',
//               alignSelf: 'center',
//             }}
//             onClick={() => setShowAll(true)}
//           >
//             View All Notifications
//           </Button>
//         )}
//         {(showAll && count > 3) && (
//           <Button
//             variant='outlined'
//             color='primary'
//             sx={{
//               marginTop: 3,
//               borderRadius: '8px',
//               width: '85%',
//               alignSelf: 'center',
//             }}
//             onClick={() => setShowAll(false)}
//           >
//             Show Less
//           </Button>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Notifications;