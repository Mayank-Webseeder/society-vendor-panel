import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  User,
  Building,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  X,
  Filter,
  Search,
  FileText,
} from "lucide-react";
import { LuIndianRupee } from "react-icons/lu"; 
import { MdCurrencyRupee } from "react-icons/md";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



const ApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    quotationFile: null,
    message: "",
    estimatedDays: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ quotationFile: null, message: "", estimatedDays: "" });
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
      return;
    }
    setFormData({ ...formData, quotationFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(job._id, formData);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-900 p-6 relative">
          <button
            onClick={onClose}
            className="absolute border-none cursor-pointer top-4 right-4 bg-gray-900 text-red-500"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-1">Apply for Job</h2>
          <p className="text-blue-100">{job?.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Job Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Building className="text-blue-600" size={16} />
                <span>{job?.society?.buildingName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdCurrencyRupee className="text-green-600" size={16} />
                <span className="font-semibold">
                  {job?.offeredPricing?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-purple-600" size={16} />
                <span>{job?.requiredExperience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="text-indigo-600" size={16} />
                <span>{job?.type}</span>
              </div>
            </div>
          </div>

          {job?.quotationRequired && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="text-amber-600 mt-1" size={20} />
                <div>
                  <p className="text-amber-800 font-semibold text-sm">
                    Quotation Required
                  </p>
                  <p className="text-amber-700 text-xs mt-1">
                    Please upload your quotation as a PDF file
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Quotation PDF <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-600 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-3 hover:border-blue-400 focus:outline-none"
                />
                {formData.quotationFile && (
                  <p className="text-xs text-green-600 mt-2">
                    Selected file: {formData.quotationFile.name}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Message <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
              placeholder="Introduce yourself and explain why you're a great fit..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-none bg-slate-300 rounded-xl text-red-700 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-blue-600 border-none text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};






// Job Card Component
const JobCard = ({ job, onApply }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      'New': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
      'In Progress': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
      'Completed': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
      'Expired': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' }
    };
    const badge = badges[status] || badges['New'];
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
        {status}
      </span>
    );
  };

  return (
<div className="bg-white w-full  mx-auto rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300 overflow-hidden p-5 flex flex-col space-y-4">
  {/* Title & Status */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
    <div className="flex-1 min-w-0">
      <h3 className="text-xl font-semibold text-gray-900 truncate group-hover:text-blue-700 transition">{job.title}</h3>
      <div className="flex items-center gap-1 text-blue-600 text-sm mt-1">
        <Briefcase size={14} />
        <span className="font-medium">{job.type}</span>
      </div>
    </div>
    {getStatusBadge(job.status)}
  </div>

  {/* Quotation Required Badge */}
  {job.quotationRequired && (
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
      <FileText size={12} />
      <span>Quotation Required</span>
    </div>
  )}

  {/* Description */}
  <p className="text-gray-700 text-sm line-clamp-3">{job.details}</p>

  {/* Key Info Grid */}
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex flex-col space-y-1">
      <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
        <LuIndianRupee size={16} />
        <span>Offered</span>
      </div>
      <p className="text-lg font-bold text-green-800">{job.offeredPricing.toLocaleString("en-IN")}</p>
    </div>
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 flex flex-col space-y-1">
      <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
        <Clock size={16} />
        <span>Experience</span>
      </div>
      <p className="text-sm font-bold text-indigo-800">{job.requiredExperience}</p>
    </div>
  </div>

  {/* Schedule & Contact */}
  <div className="flex flex-col sm:flex-row gap-4 text-gray-600 text-sm">
    <div className="flex items-center gap-2">
      <Calendar size={16} className="text-blue-600" />
      <span>{formatDate(job.scheduledFor)}</span>
    </div>
    <div className="flex items-center gap-2">
      <Phone size={16} className="text-blue-600" />
      <span>{job.contactNumber}</span>
    </div>
  </div>

  {/* Society Info */}
  {job.society && (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 space-y-3">
      <div className="flex items-center gap-2 font-semibold text-blue-700">
        <Building size={18} />
        <span className="truncate">{job.society.buildingName}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span>{job.society.username}</span>
        </div>
        <div className="flex items-center gap-2 truncate">
          <MapPin size={14} />
          <span>{job.society.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} />
          <span>{job.society.residentsCount} residents</span>
        </div>
      </div>
      {job.location?.googleMapLink && (
        <a
          href={job.location.googleMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex no-underline items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition"
        >
          <MapPin size={16} />
          <span>View Map</span>
        </a>
      )}
    </div>
  )}

  {/* Posted On & Apply Button */}
  <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
    <time className="text-xs text-gray-400">Posted on {job.postedAt}</time>
<button
  onClick={() => onApply(job)}
  className="px-4 py-2 bg-blue-600 border-none text-white rounded-lg hover:bg-blue-700"
>
  Apply Now
</button>

  </div>
</div>





  );
};

// Main Component
const NewLeads = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    quotationRequired: 'all',
    priceRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

// Fetch Applied Jobs Once
useEffect(() => {
  fetchAppliedJobs();
}, []);
  // Fetch Jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

 const fetchJobs = async () => {
  try {
    setLoading(true);
    setError(null);

    const { data } = await api.get("/api/jobs/nearby");

    // ✅ Filter: sirf un jobs ko rakhna jinka applicationStatus null hai
    const filteredJobs = data.filter((job) => job.applicationStatus === null);

    setJobs(filteredJobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    setError(err.response?.data?.message || "Failed to load jobs. Please try again later.");
    showNotification(
      err.response?.data?.message || "Failed to load jobs",
      "error"
    );
  } finally {
    setLoading(false);
  }
};


  const fetchAppliedJobs = async () => {
  try {
    const { data } = await api.get("/api/vendor/my-applications"); 
    // Assuming your backend returns a list of user's applications with jobId
    const ids = data.map(app => app.jobId?._id || app.jobId);
    setAppliedJobIds(ids);
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
  }
};

  // Submit job application
// const handleSubmitApplication = async (jobId, formData) => {
//   try {
//     const payload = new FormData();

//     if (formData.quotationFile)
//       payload.append("quotedpdf", formData.quotationFile); // ✅ fixed field name
//     if (formData.message)
//       payload.append("message", formData.message);
//     if (formData.estimatedDays)
//       payload.append("estimatedDays", formData.estimatedDays);

//     const endpoint = selectedJob?.quotationRequired
//       ? `/api/applications/${jobId}/apply`
//       : `/api/applications/${jobId}/interest`;

//     const { data } = await api.post(endpoint, payload, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // optional if your API uses auth
//       },
//     });

//     showNotification(
//       data.msg || data.message || "Application submitted successfully!",
//       "success"
//     );
//     setShowModal(false);
//     await fetchJobs();
//   } catch (err) {
//     console.error("Error applying for job:", err);
//     console.log("Backend says:", err.response?.data);
//     showNotification(
//       err.response?.data?.message || err.response?.data?.msg || "Failed to submit application.",
//       "error"
//     );
//   }
// };


const handleSubmitApplication = async (jobId, formData) => {
  try {
    if (selectedJob?.quotationRequired && !formData.quotationFile) {
      showNotification("Please upload a quotation PDF before submitting.", "error");
      return;
    }

    // Convert file to base64
    let quotedpdf = null;
    if (formData.quotationFile) {
      const base64 = await toBase64(formData.quotationFile);
      quotedpdf = {
        fileBase64: base64,
        name: formData.quotationFile.name,
      };
    }

    const payload = {
      quotedpdf,
      message: formData.message,
      estimatedDays: formData.estimatedDays,
    };

    const endpoint = selectedJob?.quotationRequired
      ? `/api/applications/${jobId}/apply`
      : `/api/applications/${jobId}/interest`;

    const { data } = await api.post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    showNotification(
      data.msg || data.message || "Application submitted successfully!",
      "success"
    );
    setShowModal(false);
    await fetchJobs();
  } catch (err) {
    console.error("Error applying for job:", err);
    showNotification(
      err.response?.data?.message || "Failed to submit application.",
      "error"
    );
  }
};

// Utility to convert file to base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};








  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {

    if (appliedJobIds.includes(job._id)) return false;
    // Search filter
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.details.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (filters.type !== 'all' && job.type !== filters.type) return false;
    
    // Status filter
    if (filters.status !== 'all' && job.status !== filters.status) return false;
    
    // Quotation filter
    if (filters.quotationRequired !== 'all') {
      const requiresQuotation = filters.quotationRequired === 'required';
      if (job.quotationRequired !== requiresQuotation) return false;
    }
    
    // Price range filter
    if (filters.priceRange !== 'all') {
      const price = job.offeredPricing;
      if (filters.priceRange === 'low' && price >= 10000) return false;
      if (filters.priceRange === 'medium' && (price < 10000 || price >= 20000)) return false;
      if (filters.priceRange === 'high' && price < 20000) return false;
    }
    
    return true;
  });

  const jobTypes = ['all', ...new Set(jobs.map(j => j.type))];
  const statuses = ['all', 'New', 'Completed', 'Expired'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in max-w-md">
          <div className={`flex items-start gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle size={24} className="flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle size={24} className="flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-sm">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards Section */}



      {/* Application Modal */}
      <ApplicationModal
        job={selectedJob}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitApplication}
      />

      {/* Header */}
      <div className=" text-black">
        <div className="container mx-auto px-4 mt-5">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
              Available Jobs
            </h1>
            <p className="text-gray-800 text-lg mb-6">
              Discover opportunities that match your skills and expertise
            </p>
            
            {/* Search Bar */}
         
          </div>
        </div>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4 px-5">

  {/* Total Jobs */}
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">Total Jobs</p>
        <p className="text-2xl font-semibold text-gray-900">{jobs.length}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Briefcase className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>

  {/* Completed Jobs */}
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">Completed Jobs</p>
        <p className="text-2xl font-semibold text-gray-900">
          {jobs.filter(job => job.status === "Completed").length}
        </p>
      </div>
      <div className="p-3 bg-green-50 rounded-lg">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>

  {/* New Jobs */}
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">New Jobs</p>
        <p className="text-2xl font-semibold text-gray-900">
          {jobs.filter(job => job.status === "New").length}
        </p>
      </div>
      <div className="p-3 bg-purple-50 rounded-lg">
        <Clock className="w-6 h-6 text-purple-600" />
      </div>
    </div>
  </div>

  {/* Quotation Required (optional) */}
  {/* <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">Quotation Required</p>
        <p className="text-2xl font-semibold text-gray-900">
          {jobs.filter(job => job.quotationRequired).length}
        </p>
      </div>
      <div className="p-3 bg-amber-50 rounded-lg">
        <FileText className="w-6 h-6 text-amber-600" />
      </div>
    </div>
  </div> */}

</div>

   <div className="relative max-w-2xl px-5">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs by title, type, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-white text-gray-800 border-none placeholder-gray-400 shadow focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
            </div>
      <div className="container mx-auto px-4 py-4">
        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Filter size={20} />
            <span>Filters</span>
            {Object.values(filters).filter(f => f !== 'all').length > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {Object.values(filters).filter(f => f !== 'all').length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 space-y-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Filter size={20} className="text-blue-600" />
                  Filters
                </h2>
                {Object.values(filters).some(f => f !== 'all') && (
                  <button
                    onClick={() => setFilters({ type: 'all', status: 'all', quotationRequired: 'all', priceRange: 'all' })}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Job Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quotation Required Filter */}
              {/* <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Quotation</label>
                <select
                  value={filters.quotationRequired}
                  onChange={(e) => setFilters({...filters, quotationRequired: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                >
                  <option value="all">All Jobs</option>
                  <option value="required">Quotation Required</option>
                  <option value="not-required">No Quotation</option>
                </select>
              </div> */}

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under ₹10,000</option>
                  <option value="medium">₹10,000 - ₹20,000</option>
                  <option value="high">Above ₹20,000</option>
                </select>
              </div>

              {/* Results Count */}
              {/* <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-bold text-gray-800">{filteredJobs.length}</span> of{' '}
                  <span className="font-bold text-gray-800">{jobs.length}</span> jobs
                </p>
              </div> */}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="text-blue-600" size={32} />
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                <XCircle className="mx-auto mb-4 text-red-500" size={56} />
                <p className="text-red-800 font-bold text-lg mb-2">Error Loading Jobs</p>
                <p className="text-red-600 mb-6">{error}</p>
                <button
                  onClick={fetchJobs}
                  className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center">
                <Briefcase className="mx-auto mb-4 text-gray-300" size={72} />
                <p className="text-gray-800 text-xl font-bold mb-2">No Jobs Found</p>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
                {(Object.values(filters).some(f => f !== 'all') || searchQuery) && (
                  <button
                    onClick={() => {
                      setFilters({ type: 'all', status: 'all', quotationRequired: 'all', priceRange: 'all' });
                      setSearchQuery('');
                    }}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className=" flex flex-wrap gap-6">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onApply={handleApplyClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLeads;



