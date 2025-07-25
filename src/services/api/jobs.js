// For job-related APIs
import api from './axiosInstance';


// // API 8: Society Job Post
// export const createJob = async (jobData) => {
//   const response = await api.post('/api/jobs/create', jobData);
//   return response.data;
// };


// API 9: Vendor fetches Jobs in 20km radius
export const getNearbyJobs = async (latitude, longitude) => {
  const response = await api.get(`/api/jobs/nearby?latitude=${latitude}&longitude=${longitude}`);
  return response.data;
};


// API 10: Vendor applies for Job
export const applyToJob = async (jobId, message) => {
  const response = await api.post(`/jobs/${jobId}/apply`, { message });
  return response.data;
};


// // API 11: Society views Vendor Applications
// export const getJobApplicants = async (jobId) => {
//   const response = await api.get(`/api/applications/${jobId}/applicants`);
//   return response.data;
// };