import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
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
      className="bg-white rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Jobs</h2>
        <Button sx={{ borderRadius: '8px' }} variant='outlined' className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-sm col-span-2 text-center py-4">No upcoming jobs found.</p>
        ) : (
          jobs.map(job => (
            <motion.div
              key={job.id}
              className="bg-white rounded-lg p-4 border-2 border-solid border-gray-100 hover:border-blue-300 transition-all shadow-sm cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              onClick={() => {
                setSelectedJob(job);
                setModalOpen(true);
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900/80 text-sm">{job.work}</h4>
                <span className="px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                  Approved
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="mr-1">🕒</span>
                {job.time} • {getDateLabel(job.date)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">📍</span>
                {job.name}
              </div>
            </motion.div>
          ))
        )}
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