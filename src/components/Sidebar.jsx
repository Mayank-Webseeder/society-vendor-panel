import sidebarMenu from '../static/sidebarMenu';
import { useLocation, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import BellNotification from './BellNotification';
import { useUser } from '../UserContext';

const Sidebar = ({ mobileTopBar = false }) => {
  const location = useLocation();
  const { user } = useUser();

  // Organize menu items
  const navigationItems = sidebarMenu.slice(0, 6);
  const utilityItems = sidebarMenu.slice(-3);

  // Mobile menu filtering
  const mobileItems = sidebarMenu.filter(item =>
    !['Availability', 'Help', 'Notifications', 'Log out'].includes(item.title)
  );

  const renderMenuItem = (item, index, isActive, customClass = '') => {
    const Icon = item.icon;
    const isLogout = item.title === 'Log out';

    return (
      <Link
        to={item.redirect}
        key={index}
        className={`group ${customClass}`}
      >
        <div
          className={`
            relative flex items-center justify-center rounded-lg transition-all duration-200
            ${isActive
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }
          `}
        >
          <Icon
            size={mobileTopBar ? 18 : 20}
            className="transition-colors duration-200"
          />
          {isActive && !mobileTopBar && (
            <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-gray-800 rounded-full" />
          )}
          {isActive && mobileTopBar && (
            <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-800 rounded-full" />
          )}
        </div>
      </Link>
    );
  };

  // Mobile Bottom Navigation
  if (mobileTopBar) {
    return (
      <div className="flex items-center justify-center px-3 w-full h-full">
        <div className="flex justify-between items-center w-full max-w-sm gap-1">
          {mobileItems.map((item, idx) => {
            const isActive = location.pathname === item.redirect;
            return renderMenuItem(item, idx, isActive, 'flex justify-center w-9 h-9');
          })}

          <div className="flex justify-center">
            <BellNotification mobile />
          </div>

          {/* {(() => {
            const logoutItem = sidebarMenu.find(item => item.title === 'Log out');
            const isActive = location.pathname === logoutItem.redirect;
            return renderMenuItem(logoutItem, 'logout', isActive, 'flex justify-center w-9 h-9');
          })()} */}
        </div>
      </div>
    );
  }

  // Desktop Sidebar
  return (
    <div className="flex flex-col w-full h-full bg-gray-800">
      {/* Brand Section */}
      <div className="flex justify-center pt-4 pb-6">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-gray-800 font-semibold text-sm">V</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col justify-between px-2">
        <div className="space-y-1">
          {navigationItems.map((item, idx) => {
            const isActive = location.pathname === item.redirect;
            const Icon = item.icon;

            return (
              <div key={idx} className="flex justify-center">
                <Tooltip
                  title={item.title}
                  placement="right"
                  slotProps={{
                    tooltip: {
                      sx: {
                        fontSize: '0.75rem',
                        padding: '6px 10px',
                        backgroundColor: 'white',
                        color: '#1F2937',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }
                    }
                  }}
                >
                  <Link to={item.redirect} className="group block">
                    <div
                      className={`
                        relative flex items-center justify-center w-10 h-10 rounded-lg 
                        transition-all duration-200
                        ${isActive
                          ? 'bg-white text-gray-800 shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                        }
                      `}
                    >
                      <Icon
                        size={20}
                        className="transition-colors duration-200"
                      />
                      {isActive && (
                        <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-gray-800 rounded-full" />
                      )}
                    </div>
                  </Link>
                </Tooltip>
              </div>
            );
          })}
        </div>

        {/* Utility Items */}
        <div className="space-y-1 pb-4">
          <div className="w-6 h-px bg-gray-600 mx-auto mb-3" />

          {utilityItems.map((item, idx) => {
            const isActive = location.pathname === item.redirect;
            const Icon = item.icon;
            const isBell = item.title === 'Notifications';
            const isLogout = item.title === 'Log out';

            return (
              <div key={idx} className="flex justify-center">
                {isBell ? (
                  <BellNotification />
                ) : (
                  <Tooltip
                    title={item.title}
                    placement="right"
                    slotProps={{
                      tooltip: {
                        sx: {
                          fontSize: '0.75rem',
                          padding: '6px 10px',
                          backgroundColor: 'white',
                          color: '#1F2937',
                          border: '1px solid #E5E7EB',
                          borderRadius: '6px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }
                      }
                    }}
                  >
                    <Link to={item.redirect} className="group block">
                      <div
                        className={`
                          relative flex items-center justify-center w-10 h-10 rounded-lg 
                          transition-all duration-200
                          ${isActive
                            ? 'bg-white text-gray-800 shadow-sm'
                            : isLogout
                              ? 'text-gray-400 hover:text-red-300 hover:bg-red-900'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700'
                          }
                        `}
                      >
                        <Icon
                          size={20}
                          className="transition-colors duration-200"
                        />
                        {isActive && (
                          <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-gray-800 rounded-full" />
                        )}
                      </div>
                    </Link>
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
