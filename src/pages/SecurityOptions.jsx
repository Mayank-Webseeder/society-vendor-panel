import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Send } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SecurityOptions = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleClear = () => {
    setContactNumber("");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setMessage("");
  };

  // ✅ Step 1: Send OTP
  const handleSendOTP = async () => {
    if (!contactNumber) {
      setMessage("Please enter your contact number");
      return;
    }

    try {
      setOtpSending(true);
      setMessage("");

      const response = await axios.post(
        `${API_BASE_URL}/api/vendor/sendOTP`,
        { contactNumber },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status) {
        setMessage("✅ OTP sent successfully to your registered number");
      } else {
        setMessage(response.data.msg || "❌ Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      setMessage(error.response?.data?.msg || "❌ Failed to send OTP");
    } finally {
      setOtpSending(false);
    }
  };

  // ✅ Step 2: Validate OTP & Reset Password
  const handleResetPassword = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `${API_BASE_URL}/api/vendor/validateContactNumber`,
        {
          contactNumber,
          otp,
          newPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status) {
        setMessage("✅ Password reset successfully! Please login again.");
        handleClear();
      } else {
        setMessage(response.data.msg || "❌ Invalid OTP or failed to reset password");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setMessage(error.response?.data?.msg || "❌ Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    contactNumber && otp && newPassword && confirmNewPassword && newPassword === confirmNewPassword;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Forgot Password</h2>

      <div className="bg-gray-50 rounded-lg p-6 max-w-md">
        {/* Contact Number + Send OTP */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your registered contact number"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendOTP}
              disabled={!contactNumber || otpSending}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              {otpSending ? "Sending..." : (<><Send size={16} /> Send OTP</>)}
            </button>
          </div>
        </div>

        {/* OTP */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP received"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {confirmNewPassword && newPassword !== confirmNewPassword && (
            <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className="text-sm text-center mt-2 text-gray-800">{message}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleResetPassword}
            disabled={!isFormValid || loading}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityOptions;
