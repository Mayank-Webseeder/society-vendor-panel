// export everything + define SUMMARY_API
import * as AuthAPI from './auth';
import * as JobsAPI from './jobs';


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const SUMMARY_API = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/vendor/signup`,
    LOGIN: `${BASE_URL}/api/vendor/login`,
    SEND_OTP: `${BASE_URL}/api/vendor/sendOtp`,
    VALIDATE_EMAIL: `${BASE_URL}/api/vendor/validateEmail`,
    SEND_EMAIL_VERIFICATION_OTP: `${BASE_URL}/api/vendor/sendOtpEmailVerification`,
    FORGOT_PASSWORD: `${BASE_URL}/api/vendor/forgetPassword`,
    CREATE_PROFILE: `${BASE_URL}/api/vendor/createProfile`,
    SUBSCRIPTION_PURCHASE: `${BASE_URL}/api/vendor/subscribe`,
    CHECK_SUBSCRIPTION_STATUS: `${BASE_URL}/api/vendor/subscription-status`,
  },
  
  JOBS: {
    // CREATE_JOB: `${BASE_URL}/api/jobs/create`,
    GET_NEARBY_JOBS: (lat, lon) => `${BASE_URL}/api/jobs/nearby?latitude=${lat}&longitude=${lon}`,
    SHOW_INTEREST: (jobId) => `${BASE_URL}/api/applications/${jobId}/interest`,
    APPLY_TO_JOB_WITH_QUOTATION: (jobId) => `${BASE_URL}/api/applications/${jobId}/apply`,
    GET_JOB_DETAILS: (jobId) => `${BASE_URL}/api/society/jobs/${jobId}`,
    // APPLY_TO_JOB: (jobId) => `${BASE_URL}/jobs/${jobId}/apply`,
    // GET_APPLICANTS: (jobId) => `${BASE_URL}/api/applications/${jobId}/applicants`,
  },
};



// Utility functions
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('velra_user');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
};


export {
  AuthAPI,
  JobsAPI,
  SUMMARY_API,
};