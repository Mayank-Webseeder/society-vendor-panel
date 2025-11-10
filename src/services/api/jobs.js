// For job-related APIs
import api from './axiosInstance';
import { SUMMARY_API } from './index';



export const getNearbyJobs = async (latitude, longitude) => {
  const response = await api.get(SUMMARY_API.JOBS.GET_NEARBY_JOBS(latitude, longitude));
  return response.data;
};


export const applyToJobWithQuotation = async (jobId, quotationDetails) => {
  const response = await api.post(SUMMARY_API.JOBS.APPLY_TO_JOB_WITH_QUOTATION(jobId), quotationDetails);
  return response.data;
}


// API 10(B): Vendor shows Interest (without Quotation)
export const showInterestInJob = async (jobId) => {
  const response = await api.post(SUMMARY_API.JOBS.SHOW_INTEREST(jobId), {});
  return response.data;
}


export const getJobDetailsById = async (jobId) => {
  const response = await api.get(SUMMARY_API.JOBS.GET_JOB_DETAILS(jobId));
  return response.data;
};


// API 24: Vendor views their applied jobs
export const getMyAppliedJobs = async () => {
  const response = await api.get(SUMMARY_API.JOBS.VIEW_MY_APPLICATIONS);
  return response.data;
};