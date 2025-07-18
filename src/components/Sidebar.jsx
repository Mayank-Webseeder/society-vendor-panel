import sidebarMenu from '../static/sidebarMenu';
import { useLocation, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { notificationCount } from '../static/dummyData_Notifications';
import NotificationPopup from './NotificationPopup';
import { useUser } from '../UserContext';


const Sidebar = () => {

  const location = useLocation();
  const { user } = useUser();

  // Top 6 menu items (excluding last 3)
  const topMenuItems = sidebarMenu.slice(0, 6);
  // Last 3 menu items
  const bottomMenuItems = sidebarMenu.slice(-3);

  // Helper: check if icon is FaBell (works for react-icons/fa and similar)
  const isBellIcon = (Icon) =>
    Icon.displayName === "FaBell" ||
    Icon.displayName === "FaRegBell" ||
    Icon.name === "FaBell" ||
    Icon.name === "FaRegBell";

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
          const isBell = idx === 0 && isBellIcon(Icon);

          return (
            <div key={idx} className="w-full flex justify-center">
              {isBell ? (
                // Render NotificationPopup for the bell icon
                <NotificationPopup />
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