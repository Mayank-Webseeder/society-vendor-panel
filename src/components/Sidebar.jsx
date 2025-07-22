import sidebarMenu from '../static/sidebarMenu';
import { useLocation, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import BellNotification from './BellNotification';
import { useUser } from '../UserContext';


const Sidebar = ({ mobileTopBar = false }) => {

  const location = useLocation();
  const { user } = useUser();

  // Top 6 menu items (excluding last 3)
  const topMenuItems = sidebarMenu.slice(0, 6);
  // Last 3 menu items  
  const bottomMenuItems = sidebarMenu.slice(-3);

  // Filter items for mobile (exclude Availability, Help, Notifications, and Logout)
  const mobileMenuItems = sidebarMenu.filter(item => 
    item.title !== "Availability" && 
    item.title !== "Help" && 
    item.title !== "Notifications" &&
    item.title !== "Log out"
  );

  // Mobile Bottom Bar Layout
  if (mobileTopBar) {
    return (
      <nav className="flex items-center justify-center px-2 w-full h-full">
        {/* Menu Items */}
        <div className="flex justify-between items-center w-full gap-4">
          {/* Regular menu items first */}
          {mobileMenuItems.map((item, idx) => {
            const isActive = location.pathname === item.redirect;
            const Icon = item.icon;
            return (
              <Link to={item.redirect} key={idx} className="flex justify-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors
                    ${isActive ? 'bg-black' : 'hover:bg-[#1E3A8A]'}
                  `}
                >
                  <Icon size={18} className="text-white" />
                </div>
              </Link>
            );
          })}
          
          {/* Bell Notification second to last */}
          <BellNotification mobile />
          
          {/* Logout button at the very end */}
          {(() => {
            const logoutItem = sidebarMenu.find(item => item.title === "Log out");
            const isActive = location.pathname === logoutItem.redirect;
            const Icon = logoutItem.icon;
            return (
              <Link to={logoutItem.redirect} className="flex justify-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors
                    ${isActive ? 'bg-black' : 'hover:bg-[#1E3A8A]'}
                  `}
                >
                  <Icon size={19} className="text-white" />
                </div>
              </Link>
            );
          })()}
        </div>
      </nav>
    );
  }

  // Desktop Sidebar Layout
  return (
    <nav className="flex flex-col items-center w-full h-full justify-between">
      {/* Top menu items */}
      <div className="flex flex-col items-center gap-5 w-full mt-1">
        <Link to='/dashboard' className='hidden sm:block no-underline'>
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
          const isBell = item.title === "Notifications";

          return (
            <div key={idx} className="w-full flex justify-center">
              {isBell ? (
                // Render BellNotification for the bell icon
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