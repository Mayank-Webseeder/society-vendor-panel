import { useState, useRef, useEffect } from 'react';
import { Bell, X, Clock, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { notifications, notificationCount } from '../static/dummyData_Notifications';
import { FaRegBell } from "react-icons/fa";
import { Button } from '@mui/material';
import { useUser } from '../UserContext';

const BellNotification = ({ mobile = false }) => {

    const { user } = useUser();

    const [isOpen, setIsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [clicked, setClicked] = useState(false);
    const popupRef = useRef(null);
    const bellRef = useRef(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && 
                bellRef.current && !bellRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowAll(false);
                setClicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type) => {
        const iconClass = "w-4 h-4 flex-shrink-0 mt-0.5";
        switch (type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-green-500`} />;
            case 'warning':
                return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
            case 'error':
                return <XCircle className={`${iconClass} text-red-500`} />;
            default:
                return <Info className={`${iconClass} text-blue-500`} />;
        }
    };

    const getNotificationBorderColor = (type) => {
        switch (type) {
            case 'success':
                return 'border-l-green-500';
            case 'warning':
                return 'border-l-yellow-500';
            case 'error':
                return 'border-l-red-500';
            default:
                return 'border-l-blue-500';
        }
    };

    const displayedNotifications = showAll ? (notifications || []) : (notifications || []).slice(0, 4);

    // Early return if user context is not loaded
    if (!user) {
        return (
            <div className="relative">
                <button className={`border-none rounded-lg transition-colors duration-200 text-white cursor-pointer bg-transparent ${mobile ? 'p-1' : 'p-2'}`}>
                    <FaRegBell size={mobile ? 18 : 29} />
                </button>
            </div>
        );
    }

    if (!user.notificationsEnabled) {
        return (
            <div className="relative">
                <button
                    className="p-2 rounded-full hover:bg-gray-500 transition-colors duration-200 opacity-50 cursor-not-allowed"
                    disabled={true}
                    title="Notifications are disabled"
                >
                    <Bell className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        );
    }

    const handleBellClick = () => {
        setIsOpen(!isOpen);
        setClicked(prev => !prev);
        if (!isOpen) {
            setShowAll(false);
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell Icon */}
            <button
                ref={bellRef}
                onClick={handleBellClick}
                className={`border-none flex justify-center items-center transition-colors duration-200 text-white cursor-pointer ${clicked? "bg-black" : 'bg-transparent hover:bg-[#1E3A8A]'} ${mobile ? 'p-1' : 'p-2'}`}
                title="Notifications"
                type="button"
            >
                <FaRegBell size={mobile ? 18 : 30} />
                {notificationCount() > 0 && (
                    <span className={`absolute bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium ${mobile ? '-top-0.5 -right-0.5 w-4 h-4' : '-top-1 -right-1 w-5 h-5'}`}>
                        <span className='block'>{notificationCount()}</span>
                    </span>
                )}
            </button>

            {/* Notification Popup */}
            {isOpen && (
                <>
                    {/* Backdrop overlay for mobile */}
                    {mobile && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    )}
                    
                    <div
                        ref={popupRef}
                        className={`${mobile ? 'fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'absolute left-12 sm:left-14 md:left-16 bottom-0'} w-80 bg-white rounded-lg shadow-xl border-solid border-2 border-gray-300 z-50 overflow-auto`}
                    >
                    {/* Header */}
                    <div style={{borderBottom:'1px solid #D1D5DB'}} className="flex items-center justify-between bg-gray-50">
                        <h3 className="text-lg p-3 font-semibold text-gray-800">Notifications</h3>
                        <Button
                        sx={{ borderRadius:'8px'}}
                            onClick={() => { setIsOpen(false); setClicked(false) }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Notifications List */}
                    <div className={`${showAll ? 'max-h-96 overflow-y-auto' : ''} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}>
                        {displayedNotifications.length > 0 ? (
                            displayedNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors border-l-4 ${getNotificationBorderColor(notification.type)}`}
                                >
                                    <div className="flex items-start space-x-3">
                                        {getNotificationIcon(notification.type)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-800 leading-relaxed">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center mt-2 text-xs text-gray-500">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {notification.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No notifications yet</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 4 && (
                        <div style={{borderTop:'1px solid #D1D5DB'}} className="p-3 bg-gray-50">
                            {!showAll ? (
                                <Button
                                    variant='outlined'
                                    onClick={() => setShowAll(true)}
                                    sx={{ backgroundColor: 'white' }}
                                    className="w-full text-center text-sm hover:text-blue-800 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
                                >
                                    View All Notifications
                                </Button>
                            ) : (
                                <Button
                                    variant='outlined'
                                    onClick={() => setShowAll(false)}
                                    sx={{ backgroundColor: 'white' }}
                                    className="w-full text-center text-sm hover:text-blue-800 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Show Less
                                </Button>
                            )}
                        </div>
                    )}
                    </div>
                </>
            )}
        </div>
    );
};


export default BellNotification;