import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Clock, MapPin, Calendar, ChevronRight } from 'lucide-react';
import dummyData from '../static/dummyData_Leads';
import CancelJobModal from './modals/CancelJobModal';

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

const upcomingJobs = dummyData.filter(lead => lead.pendingStatus === 'Approved').length;

const UpcomingJobs = () => {

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
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-50 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Upcoming Jobs</h2>
            <p className="text-sm text-gray-500 mt-2 ml-1">
              {upcomingJobs} {upcomingJobs === 1 ? 'job' : 'jobs'} scheduled
            </p>
          </div>
          <Button 
            sx={{ borderRadius: '8px' }} 
            variant='outlined' 
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm rounded-xl border border-blue-200 transition-all duration-200 hover:shadow-md"
          >
            View All
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="border-none px-6 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base font-medium mb-1">No upcoming jobs</p>
              <p className="text-gray-400 text-sm">New job requests will appear here</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="group relative mb-2 bg-gradient-to-br from-white to-gray-50/30 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-blue-900 transition-colors">
                        {job.work}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
                          Approved
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-gray-600">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-sm text-gray-900">{job.time}</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-sm font-medium text-blue-600">{getDateLabel(job.date)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-gray-600">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{job.name}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

export default UpcomingJobs;