import {
  X,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  FileText,
  Calendar,
  User,
  Phone,
  CheckCircle,
} from "lucide-react";

const JobDetailsModal = ({ open, onClose, application }) => {
  if (!open || !application) return null;

  const job = application.job;
  const society = job.society;

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-orange-100 text-orange-700 border-orange-300",
      approved: "bg-blue-100 text-blue-700 border-blue-300",
      completed: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return (
      <span
        className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
          config[status] ||
          "bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white p-6 rounded-t-xl ">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-blue-100 text-sm">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Applied{" "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4">{getStatusBadge(application.status)}</div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 🏢 Society Details */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Society Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Building Name</p>
                <p className="font-semibold text-gray-900">
                  {society.buildingName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-900">{society.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="text-gray-900">{society.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-blue-600">{society.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Residents Count</p>
                <p className="font-semibold text-gray-900">
                  {society.residentsCount}
                </p>
              </div>
            </div>
          </div>

          {/* 💼 Job Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Job Description
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
              <p className="text-gray-800">{job.details}</p>
            </div>

            {/* 💰 Price + 📍 Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Offered Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{job.offeredPrice?.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <a
                    href={
                      job.location?.googleMapLink ||
                      society.location?.googleMapLink
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 📋 Additional Job Info */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Experience Required</p>
                <p className="font-semibold text-gray-900">
                  {job.requiredExperience}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <a
                  href={`tel:${job.contactNumber}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {job.contactNumber}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled For</p>
                <p className="font-semibold text-gray-900">
                  {new Date(job.scheduledFor).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Job Posted On</p>
                <p className="font-semibold text-gray-900">
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
