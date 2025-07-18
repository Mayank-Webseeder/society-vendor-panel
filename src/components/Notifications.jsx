import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { notifications as notificationsData, notificationCount } from '../static/dummyData_Notifications';


const typeColors = {
  info: 'bg-blue-50 border-l-blue-400',
  success: 'bg-green-50 border-l-green-400',
  warning: 'bg-yellow-50 border-l-yellow-400',
  error: 'bg-red-50 border-l-red-400'
};

const NotificationItem = ({ notification }) => (
  <motion.div
    className={`p-3 rounded-lg border-l-4 ${typeColors[notification.type] || ''} hover:bg-opacity-80 transition-colors cursor-pointer`}
    whileHover={{ scale: 1.01 }}
  >
    <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
  </motion.div>
);



const Notifications = () => {

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



  return (
    <div
    ref={containerRef}
      className="w-full bg-gray-200 p-2 rounded-2xl
                text-gray-800 border border-gray-800 flex flex-col gap-5 h-full"
    >
      <motion.div
        className="rounded-2xl flex flex-col shadow-md p-4 bg-white"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={
          showAll
            ? { maxHeight: 420, overflowY: 'auto' }
            : { maxHeight: 'none', overflowY: 'visible' }
        }
      >
        <div className="flex items-center justify-between mb-4 p-2">
          <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">{count}</span>
          </div>
        </div>
        <div className="space-y-3">
          {count === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
          ) : (
            displayedNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          )}
        </div>
        {(!showAll && count > 3) && (
          <Button 
            variant="outlined" 
            color="primary"
            sx={{
              marginTop: 3,
              borderRadius: '8px',
              width: '85%',
              alignSelf: 'center',
            }}
            onClick={() => setShowAll(true)}
          >
            View All Notifications
          </Button>
        )}
        {(showAll && count > 3) && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              marginTop: 3,
              borderRadius: '8px',
              width: '85%',
              alignSelf: 'center',
            }}
            onClick={() => setShowAll(false)}
          >
            Show Less
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default Notifications;