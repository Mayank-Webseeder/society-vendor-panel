// For all auth-related APIs
import api from './axiosInstance';
import { SUMMARY_API } from './index';

// API 1: Signup Vendor (Updated to match real endpoint)
export const signupVendor = async (name, contactNumber, password) => {
  const response = await api.post(SUMMARY_API.AUTH.SIGNUP, { name, contactNumber, password });
  if (response.data.authToken) {
    localStorage.setItem('authToken', response.data.authToken);
  }
  return response.data;
};

// API 2: Login Vendor  
export const loginVendor = async (contactNumber, password) => {
  const response = await api.post(SUMMARY_API.AUTH.LOGIN, { contactNumber, password });
  if (response.data.authToken) {
    localStorage.setItem('authToken', response.data.authToken);
  }
  return response.data;
};

// NEW: Send OTP for Contact Number Verification
export const sendOtpContactVerification = async (contactNumber) => {
  const response = await api.post(SUMMARY_API.AUTH.SEND_CONTACT_OTP, { contactNumber });
  return response.data;
};

// NEW: Validate Contact Number with OTP
export const validateContactNumber = async (contactNumber, otp) => {
  const response = await api.post(SUMMARY_API.AUTH.VALIDATE_CONTACT, { contactNumber, otp });
  return response.data;
};

// Keep existing email-related functions for other features
export const sendOtp = async (email) => {
  const response = await api.post(SUMMARY_API.AUTH.SEND_OTP, { email });
  return response.data;
};

export const validateEmail = async (email, otp) => {
  const response = await api.post(SUMMARY_API.AUTH.VALIDATE_EMAIL, { email, otp });
  return response.data;
};

export const createProfile = async (formData) => {
  console.log(formData, "LALALALALL");
  const authToken = localStorage.getItem('authToken');
  const response = await api.put(
    '/api/vendor/createProfile',
    formData
  );

  return response.data;
};

export const sendOtpEmailVerification = async (email) => {
  const response = await api.post(SUMMARY_API.AUTH.SEND_EMAIL_VERIFICATION_OTP, { email });
  return response.data;
};

export const forgetPassword = async (email, otp, newPassword) => {
  const response = await api.post(SUMMARY_API.AUTH.FORGOT_PASSWORD, {
    email,
    otp,
    newPassword
  });
  return response.data;
};

export const vendorSubscriptionPurchase = async () => {
  const response = await api.post(SUMMARY_API.AUTH.SUBSCRIPTION_PURCHASE);
  return response.data;
};

export const checkSubscriptionStatus = async () => {
  const response = await api.get(SUMMARY_API.AUTH.CHECK_SUBSCRIPTION_STATUS);
  return response.data;
};

export const addServiceToSubscription = async (newService) => {
  const response = await api.post(SUMMARY_API.AUTH.ADD_SERVICE, { newService });
  return response.data;
};

export const getVendorDashboard = async () => {
  const response = await api.get(SUMMARY_API.AUTH.DASHBOARD_ACCESS);
  return response.data;
};

export const viewVendorProfile = async () => {
  const response = await api.get(SUMMARY_API.AUTH.VIEW_PROFILE);
  return response.data;
};

export const updateVendorProfile = async (formData) => {
  const response = await api.put(SUMMARY_API.AUTH.UPDATE_PROFILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
