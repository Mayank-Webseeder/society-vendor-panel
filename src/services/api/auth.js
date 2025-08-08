// For all auth-related APIs
import api from './axiosInstance';
import { SUMMARY_API } from './index';



// API 1: Signup Vendor
export const signupVendor = async (name, email, password) => {
  const response = await api.post(SUMMARY_API.AUTH.SIGNUP, { name, email, password });
  if (response.data.authToken) {
    localStorage.setItem('authToken', response.data.authToken);
  }
  return response.data;
};


// API 2: Login Vendor  
export const loginVendor = async (email, password) => {
  const response = await api.post(SUMMARY_API.AUTH.LOGIN, { email, password });
  if (response.data.authToken) {
    localStorage.setItem('authToken', response.data.authToken);
  }
  return response.data;
};


// API 3: Send OTP (Forgot Password)
export const sendOtp = async (email) => {
  const response = await api.post(SUMMARY_API.AUTH.SEND_OTP, { email });
  return response.data;
};


// API 4: Validate Email (OTP Verification for SignUp & Forget Password)
export const validateEmail = async (email, otp) => {
  const response = await api.post(SUMMARY_API.AUTH.VALIDATE_EMAIL, { email, otp });
  return response.data;
};


// API 5: Create Vendor Profile
export const createProfile = async (formData) => {
  const response = await api.put(SUMMARY_API.AUTH.CREATE_PROFILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


// API 6: Send OTP for Email Verification (New Vendor)
export const sendOtpEmailVerification = async (email) => {
  const response = await api.post(SUMMARY_API.AUTH.SEND_EMAIL_VERIFICATION_OTP, { email });
  return response.data;
};


// API 7: Reset Password After OTP (Forgot Password)
export const forgetPassword = async (email, otp, newPassword) => {
  const response = await api.post(SUMMARY_API.AUTH.FORGOT_PASSWORD, { 
    email, 
    otp, 
    newPassword 
  });
  return response.data;
};


// API 21: Vendor Subscription Purchase
export const vendorSubscriptionPurchase = async () => {
  const response = await api.post(SUMMARY_API.AUTH.SUBSCRIPTION_PURCHASE);
  return response.data;
};


// API 22: Check Vendor Subscription Status
export const checkSubscriptionStatus = async () => {
  const response = await api.get(SUMMARY_API.AUTH.CHECK_SUBSCRIPTION_STATUS);
  return response.data;
};


// API 23: Add New Service to Vendor Subscription
export const addServiceToSubscription = async (newService) => {
  const response = await api.post(SUMMARY_API.AUTH.ADD_SERVICE, { newService });
  return response.data;
};


// API 25: Get Vendor Dashboard Details
export const getVendorDashboard = async () => {
  const response = await api.get(SUMMARY_API.AUTH.DASHBOARD_ACCESS);
  return response.data;
};


// API 29: Vendor View Profile
export const viewVendorProfile = async () => {
  const response = await api.get(SUMMARY_API.AUTH.VIEW_PROFILE);
  return response.data;
};


// API 30: Vendor Update Profile
export const updateVendorProfile = async (formData) => {
  const response = await api.put(SUMMARY_API.AUTH.UPDATE_PROFILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};