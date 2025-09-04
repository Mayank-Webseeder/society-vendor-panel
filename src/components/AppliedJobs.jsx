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
  const subscriptionActive = user.subscription_active;

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

  // show at most 2 cards (kept earlier change)
  const displayedJobs = jobs.slice(0, 2);

  const JobCard = ({ job, index }) => (
    <motion.div
      className="group relative mb-2 rounded-2xl border border-solid border-green-200/60 bg-white/60 backdrop-blur-md shadow-[0_4px_10px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer overflow-hidden"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      // onClick={() => { setSelectedJob(job); setModalOpen(true); }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-8 -left-6 w-36 h-36 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.18),rgba(34,197,94,0)_70%)] blur-2xl" />
        {/* <div className="absolute -bottom-10 -right-6 w-40 h-40 bg-[radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.16),rgba(16,185,129,0)_70%)] blur-2xl" /> */}
      </div>

      <div className="relative p-3 sm:p-5">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 text-sm sm:text-base mb-1 group-hover:text-green-700 transition-colors">
              {job.work}
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700 bg-green-50/70 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-solid border-green-100/70">Approved</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-all duration-200" />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-2.5 text-gray-600">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-solid border-blue-100/70">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <div>
              <span className="font-medium text-xs sm:text-sm text-gray-900">{job.time}</span>
              <span className="text-gray-500 mx-1 sm:mx-2">•</span>
              <span className="text-xs sm:text-sm font-medium text-green-600">{getDateLabel(job.date)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 text-gray-600">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center border border-solid border-slate-200/60">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">{job.name}</span>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );

  return (
    <motion.div
      className="relative group/container rounded-3xl bg-white/80 backdrop-blur-xl border border-solid border-slate-200/70 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Ambient green gradient hover reveal */}
      {/* <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-28 -left-20 w-80 h-80 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.22),rgba(34,197,94,0)_70%)] blur-2xl" />
        <div className="absolute -bottom-36 -right-16 w-96 h-96 bg-[radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.22),rgba(16,185,129,0)_70%)] blur-2xl" />
      </div> */}

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }} className="relative px-4 sm:px-7 pt-5 sm:pt-7 pb-4 sm:pb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Applied Jobs</h2>
            <div className="mt-2 h-1 w-28 bg-gradient-to-r from-green-500/70 via-emerald-400/70 to-transparent rounded-full" />
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2 ml-0.5">
              {subscriptionActive ? (
                <>{jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} scheduled</>
              ) : (
                <>No applied jobs available</>
              )}
            </p>
          </div>
          {subscriptionActive && (
            <Button
              onClick={() => navigate('/my-jobs', { state: { filter: 'Applied' } })}
              sx={{ borderRadius: '14px', textTransform: 'none' }}
              variant='outlined'
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-white/70 backdrop-blur border border-solid border-blue-200/70 hover:border-blue-300 text-blue-700 hover:text-blue-800 font-medium text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ChevronRight size={15} className="sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-3 sm:px-6 py-2 sm:py-4">
        <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:md:grid-cols-2">
          {displayedJobs.length === 0  ||  !subscriptionActive ? (
            <div className="col-span-2 relative rounded-2xl border border-solid border-slate-200/70 bg-white/60 backdrop-blur-sm py-10 sm:py-14 text-center shadow-inner">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-40 bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center border border-solid border-slate-200/70 shadow-sm">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-semibold mb-1">No upcoming jobs</p>
              <p className="text-slate-400 text-xs sm:text-sm">Approved job requests will appear here</p>
            </div>
          ) : (
            displayedJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
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