import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LogOut, CheckCircle, ArrowLeft, Loader } from 'lucide-react';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleYes = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        logout();
        navigate('/auth', { replace: true });
      }, 1000);
    }, 1000);
  };

  const handleNo = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md">
        {loading && !showSuccess ? (
          // Loading State
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Signing you out...
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we securely log you out
            </p>
          </div>
        ) : showSuccess ? (
          // Success State
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Successfully logged out!
            </h3>
            <p className="text-gray-600 text-sm">
              Redirecting you to login page...
            </p>
          </div>
        ) : (
          // Confirmation State
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-600 text-sm">
                Are you sure you want to sign out? You'll need to enter your credentials again to access your account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleNo}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleYes}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
