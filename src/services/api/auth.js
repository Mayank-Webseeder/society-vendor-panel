// For all auth-related APIs
import api from './axiosInstance';


// API 1: Signup Vendor
export const signupVendor = async (name, email, password) => {
  const response = await api.post('/api/vendor/signup', { name, email, password });
  if (response.data.authToken) {
    localStorage.setItem('authToken', response.data.authToken);
  }
  return response.data;
};


// API 2: Login Vendor  
export const loginVendor = async (email, password) => {
  const response = await api.post('/api/vendor/login', { email, password });
  if (response.data.authToken) {
    localStorage.setItem('authToken', response.data.authToken);
  }
  return response.data;
};


// API 3: Send OTP (Forgot Password)
export const sendOtp = async (email) => {
  const response = await api.post('/api/vendor/sendOtp', { email });
  return response.data;
};


// API 4: Validate Email (OTP Verification)
export const validateEmail = async (email, otp) => {
  const response = await api.post('/api/vendor/validateEmail', { email, otp });
  return response.data;
};


// API 5: Send OTP for Email Verification
export const sendOtpEmailVerification = async (email) => {
  const response = await api.post('/api/vendor/sendOtpEmailVerification', { email });
  return response.data;
};


// API 6: Reset Password After OTP
export const forgetPassword = async (email, otp, newPassword) => {
  const response = await api.post('/api/vendor/forgetPassword', { 
    email, 
    otp, 
    newPassword 
  });
  return response.data;
};


// API 7: Create Vendor Profile
export const createProfile = async (formData) => {
  const response = await api.put('/api/vendor/createProfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


// API 21: Vendor Subscription Purchase
export const vendorSubscriptionPurchase = async (selectedServicesCount) => {
  const response = await api.post(`/api/vendor/subscribe`, selectedServicesCount);
  return response.data;
};


// API 22: Check Vendor Subscription Status
export const checkSubscriptionStatus = async () => {
  const response = await api.get(`/api/vendor/subscription-status`);
  return response.data;
};