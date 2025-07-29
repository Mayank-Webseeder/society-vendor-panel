import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Clock, MapPin, Calendar, ChevronRight } from 'lucide-react';
import dummyData from '../static/dummyData_Leads';
import CancelJobModal from './modals/CancelJobModal';
import { useUser } from '../UserContext';


// Helper to parse "17th Jul" to a Date object for current year
function parseJobDate(dateStr) {
  const [dayRaw, monthRaw] = dateStr.split(' ');
  const day = parseInt(dayRaw, 10);
  const month = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ].findIndex(m => monthRaw.startsWith(m));
  const year = new Date().getFullYear();
  if (day && month !== -1) {
    return new Date(year, month, day);
  }
  return null;
}

function getDateLabel(dateStr) {
  const jobDate = parseJobDate(dateStr);
  if (!jobDate) return dateStr;

  const today = new Date();
  const tomorrow = new Date();
  today.setHours(0,0,0,0);
  tomorrow.setHours(0,0,0,0);
  tomorrow.setDate(today.getDate() + 1);

  jobDate.setHours(0,0,0,0);

  if (jobDate.getTime() === today.getTime()) return "Today";
  if (jobDate.getTime() === tomorrow.getTime()) return "Tomorrow";
  return dateStr;
}

const approvedJobs = dummyData.filter(lead => lead.pendingStatus === 'Approved').length;


const AppliedJobs = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const today = new Date();
      today.setHours(0,0,0,0);

      const filtered = dummyData.filter(job => {
        if (job.status !== "Applied" || job.pendingStatus !== "Approved") return false;
        const jobDate = parseJobDate(job.date);
        if (!jobDate) return false;
        jobDate.setHours(0,0,0,0);
        return jobDate.getTime() >= today.getTime();
      });

      setJobs(filtered);
    });
  }, []);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-50 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Applied Jobs</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 ml-1">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} scheduled
            </p>
          </div>
          {
            user.membershipActive  &&
              <Button
                onClick={() => navigate('/my-jobs', { state: { filter: 'Applied' } })}
                sx={{ borderRadius: '8px' }} 
                variant='outlined' 
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-xs sm:text-sm rounded-xl border border-blue-200 transition-all duration-200 hover:shadow-md"
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ChevronRight size={14} className="sm:w-4 sm:h-4" />
              </Button>
          }
        </div>
      </div>

      {/* Content */}
      <div className="border-none px-3 sm:px-6 py-1">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:md:grid-cols-2">
          {jobs.length === 0 ? (
            <div className="col-span-2 text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm sm:text-base font-medium mb-1">No upcoming jobs</p>
              <p className="text-gray-400 text-xs sm:text-sm">New job requests will appear here</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="group relative mb-2 bg-gradient-to-br from-white to-gray-50/30 rounded-xl border-solid border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedJob(job);
                  setModalOpen(true);
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-3 sm:p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-green-900 transition-colors">
                        {job.work}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                          Approved
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>

                  {/* Details */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-600">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-xs sm:text-sm text-gray-900">{job.time}</span>
                        <span className="text-gray-500 mx-1 sm:mx-2">•</span>
                        <span className="text-xs sm:text-sm font-medium text-green-600">{getDateLabel(job.date)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5 text-gray-600">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{job.name}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Cancel Job Modal */}
      <CancelJobModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lead={selectedJob}
      />
    </motion.div>
  );
};


export default AppliedJobs;