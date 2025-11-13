import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, MapPin, Briefcase, Clock, CheckCircle, XCircle, IndianRupee, FileText, Calendar, User } from "lucide-react";
import { useUser } from "../UserContext";
import AccessLockedModal from "../components/modals/AccessLockedModal";
import JobDetailsModal from "../components/modals/JobDetailsModal";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const MyJobs = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLocked, setIsLocked] = useState(!user?.subscription_active);

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedApplication(null);
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/vendor/my-applications");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-orange-100 text-orange-700",
      approved: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config[status] || "bg-gray-100 text-gray-700"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-600">
        Loading your jobs...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-gray-600">
        <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <p>{error}</p>
        <button
          onClick={fetchJobs}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );

  if (!jobs.length)
    return (
      <div className="text-center py-20 text-gray-600">
        <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p>No job applications found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Job Applications</h1>
      <p className="text-gray-600 mb-6">View and track your applied jobs</p>

      <div className="grid gap-6">
        {jobs.map((item) => {
          const job = item.job;
          const society = job.society;
          
          return (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Applied {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  {getStatusBadge(item.status)}
                </div>
              </div>

              {/* Society Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{society.buildingName}</p>
                    <p className="text-sm text-gray-600">{society.address}</p>
                  </div>
                </div>
                {society.residentsCount && (
                  <p className="text-xs text-gray-500 mt-1">
                    Residents: {society.residentsCount}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                  <span>
                    Offered Price: <strong>₹{job.offeredPrice?.toLocaleString('en-IN')}</strong>
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <a
                    href={job.location?.googleMapLink || job.society?.location?.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    View Location
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500" />
                  <span>Experience: {job.requiredExperience}</span>
                </div>

                {job.scheduledFor && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      Scheduled: {new Date(job.scheduledFor).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>
                    Application Type: <strong className="capitalize">{item.applicationType}</strong>
                  </span>
                </div>

                {item.quotedpdf && (
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL}${item.quotedpdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Quotation PDF
                    </a>
                  </div>
                )}
              </div>

              {job.details && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Job Details:</strong> {job.details}
                  </p>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleViewDetails(item)}
                  className="px-4 border-none py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Full Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <JobDetailsModal 
        open={showDetailsModal} 
        onClose={handleCloseModal} 
        application={selectedApplication} 
      />

      {isLocked && <AccessLockedModal open onClose={() => setIsLocked(false)} />}
    </div>
  );
};

export default MyJobs;