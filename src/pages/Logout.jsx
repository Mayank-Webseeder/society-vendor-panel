import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LogOut, CheckCircle, X, Shield, User } from 'lucide-react';

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
      }, 1200);
    }, 800);
  };

  const handleNo = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-orange-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-cyan-50 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        {loading && !showSuccess ? (
          // Loading State
          <div className="text-center py-6 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Signing you out securely
            </h3>
            <p className="text-gray-600">
              We're safely logging you out of your account...
            </p>
          </div>
        ) : showSuccess ? (
          // Success State
          <div className="text-center py-6 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Logout successful!
            </h3>
            <p className="text-gray-600">
              Taking you back to the login page...
            </p>
          </div>
        ) : (
          // Confirmation State
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Sign out of your account?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You'll be safely logged out and will need to sign in again to access your dashboard and account features.
              </p>
            </div>

            {/* User info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Vendor Account • Active</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleNo}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
              >
                Stay signed in
              </button>
              <button
                onClick={handleYes}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Sign out
              </button>
            </div>

            {/* Security note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Your session will be securely terminated and all data cleared
              </p>
            </div>
          </div>
        )}

        {/* Close button for confirmation state */}
        {!loading && !showSuccess && (
          <button
            onClick={handleNo}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Logout;
