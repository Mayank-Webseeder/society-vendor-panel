import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, FileText, Settings, CreditCard, HelpCircle } from 'lucide-react';
import { useUser } from '../UserContext';

const sidebarOptions = [
  { label: 'Personal Info', icon: User, route: '/my-profile' },
  { label: 'Security', icon: Lock, route: '/my-profile/security-options' },
  // { label: 'Work Details', icon: Settings, route: '/my-profile/work-details', isPremium: true },
  // { label: 'Documents', icon: FileText, route: '/my-profile/documents-verification' },
  { label: 'Subscription', icon: CreditCard, route: '/my-profile/subscription-details' },
  { label: 'Support', icon: HelpCircle, route: '/my-profile/account-support' },
];

const UserProfile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (option) => {
    if (option.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) {
      return true;
    }
    return location.pathname === option.route;
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Profile Settings</h1>
          <p className="text-gray-600 text-sm">Manage your account settings and preferences</p>
        </div>

        {/* Mobile Navigation - Sticky */}
        <div className="md:hidden mb-6 sticky top-6 z-40">
          <div className="bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            <div className="flex overflow-x-auto gap-1">
              {sidebarOptions.map((option) => {
                const Icon = option.icon;
                const isActive = isActiveRoute(option);
                const isLocked = option.isPremium && !user?.subscription_active;

                return (
                  <button
                    key={option.label}
                    onClick={() => navigate(option.route)}
                    className={`flex flex-col items-center min-w-[70px] p-2 rounded-md transition-colors relative ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                      } ${isLocked ? 'opacity-60' : ''}`}
                    disabled={isLocked}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-xs font-medium text-center leading-tight">
                      {option.label.replace(' Info', '')}
                    </span>
                    {isLocked && (
                      <Lock className="w-3 h-3 absolute -top-1 -right-1 text-amber-500" />
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="flex gap-6">
          {/* Desktop Sidebar - Sticky */}
          <div className="hidden md:block w-64">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <nav className="p-2">
                  {sidebarOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isActive = isActiveRoute(option);
                    const isLocked = option.isPremium && !user?.subscription_active;

                    return (
                      <button
                        key={option.label}
                        onClick={() => navigate(option.route)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-1 relative group ${isActive
                          ? 'bg-blue-50 text-blue-700 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                          } ${isLocked ? 'opacity-60' : ''}`}
                        disabled={isLocked}
                      >
                        <div className={`p-1.5 rounded-md ${isActive ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-gray-200'
                          }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm">{option.label}</span>
                        {isLocked && (
                          <Lock className="w-4 h-4 ml-auto text-amber-500" />
                        )}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
