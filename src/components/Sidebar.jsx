import sidebarMenu from '../static/sidebarMenu';
import { useLocation, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useUser } from '../UserContext';

const Sidebar = ({ iconOnly }) => {
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
          // Show notification badge on the first bottom icon if it's a bell
          const showBadge = idx === 0 && isBellIcon(Icon) && user?.notificationsCount > 0;
          return (
            <Link to={item.redirect} key={idx} className="w-full flex justify-center">
              <Tooltip title={item.title} placement="right">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-lg transition-colors
                    ${isActive ? 'bg-black' : 'hover:bg-[#1E3A8A]'}
                  `}
                  style={{ padding: 0 }}
                >
                  <Icon size={30} className="text-white" />
                  {showBadge && (
                    <span
                      className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                      style={{ minWidth: 20, minHeight: 20, fontSize: 12, zIndex: 10 }}
                    >
                      {user.notificationsCount}
                    </span>
                  )}
                </div>
              </Tooltip>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;