import sidebarMenu from '../static/sidebarMenu';
import { useLocation, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { notificationCount } from '../static/dummyData_Notifications';
import NotificationPopup from './NotificationPopup';
import BellNotification from './BellNotification';
import { useUser } from '../UserContext';
import { FaRegBell } from "react-icons/fa";


const Sidebar = () => {

  const location = useLocation();
  const { user } = useUser();

  // Top 6 menu items (excluding last 3)
  const topMenuItems = sidebarMenu.slice(0, 6);
  // Last 3 menu items  
  const bottomMenuItems = sidebarMenu.slice(-3);
  
  console.log('🔍 All sidebarMenu items:', sidebarMenu.map(item => item.title));
  console.log('🔍 bottomMenuItems:', bottomMenuItems.map(item => item.title));

  // Helper: check if icon is FaBell (works for react-icons/fa and similar)
  const isBellIcon = (Icon) => {
    console.log('🔍 Checking icon:', Icon, 'displayName:', Icon?.displayName, 'name:', Icon?.name);
    console.log('🔍 Icon toString:', Icon.toString());
    console.log('🔍 Direct comparison with FaRegBell:', Icon === FaRegBell);
    
    return Icon.displayName === "FaBell" ||
           Icon.displayName === "FaRegBell" ||
           Icon.name === "FaBell" ||
           Icon.name === "FaRegBell" ||
           Icon === FaRegBell || // Direct comparison
           Icon.toString().includes('FaRegBell') || // String check
           Icon.toString().includes('FaBell'); // String check
  };

  return (
    <nav className="flex flex-col items-center w-full h-full justify-between">
      {/* Top menu items */}
      <div className="flex flex-col items-center gap-5 w-full mt-1">
        <Link to='/dashboard' className='no-underline'>
          <p className='text-xl text-[#56A9D9]' style={{ fontFamily: 'Parisienne, cursive' }}>Velra</p>
        </Link>
        {topMenuItems.map((item, idx) => {
          const isActive = location.pathname === item.redirect;
          const Icon = item.icon;
          return (
            <Link to={item.redirect} key={idx} className="w-full flex justify-center">
              <Tooltip title={item.title} placement="right">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors
                    ${isActive ? 'bg-black' : 'hover:bg-[#1E3A8A]'}
                  `}
                  style={{ padding: 0 }}
                >
                  <Icon size={30} className="text-white" />
                </div>
              </Tooltip>
            </Link>
          );
        })}
      </div>

      {/* Bottom menu items */}
      <div className="flex flex-col items-center gap-4 w-full mb-2">
        {bottomMenuItems.map((item, idx) => {
          const isActive = location.pathname === item.redirect;
          const Icon = item.icon;
          const isBell = item.title === "Notifications"; // Check by title instead
          
          console.log(`🔍 Bottom item ${idx}:`, item.title, 'isBell:', isBell, 'Icon:', Icon);

          return (
            <div key={idx} className="w-full flex justify-center">
              {isBell ? (
                // Render BellNotification for the bell icon (NEW COMPONENT)
                <BellNotification />
              ) : (
                <Link to={item.redirect} className="w-full flex justify-center">
                  <Tooltip title={item.title} placement="right">
                    <div
                      className={`relative flex items-center justify-center w-12 h-12 rounded-lg transition-colors
                        ${isActive ? 'bg-black' : 'hover:bg-[#1E3A8A]'}
                      `}
                      style={{ padding: 0 }}
                    >
                      <Icon size={30} className="text-white" />
                    </div>
                  </Tooltip>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;