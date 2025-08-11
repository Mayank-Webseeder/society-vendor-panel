import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { Wrench, Calendar, Clock, MapPin, ChevronRight, Briefcase, Timer } from 'lucide-react';
import dummyData from '../static/dummyData_Leads';
import { useUser } from '../UserContext';


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const totalOngoingJobs = dummyData.filter(job => job.status === "Ongoing").length;

const getTopOngoingJobs = (data, count = 2) => {
  return data
    .filter(job => job.status === "Ongoing")
    .sort((a, b) => {
      // Sort by postedOn date descending (most recent first)
      const parseDate = str => {
        const [day, month] = str.split(' ');
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const mIdx = months.findIndex(m => month.startsWith(m));
        return new Date(new Date().getFullYear(), mIdx, parseInt(day, 10));
      };
      return parseDate(b.date) - parseDate(a.date);
    })
    .slice(0, count);
};



const OngoingJobs = () => {

  const navigate = useNavigate();

  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const topJobs = getTopOngoingJobs(dummyData);

  const JobCard = ({ job, index }) => (
    <motion.div
      className="group relative mb-4 bg-gradient-to-br from-white to-gray-50/30 rounded-xl border-solid border border-gray-200 hover:border-orange-200 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-3 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-orange-900 transition-colors line-clamp-1">
                {job.work}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-medium text-orange-700 bg-orange-50 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-orange-200">
              Ongoing
            </span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>

        {/* Property Name */}
        <div className="mb-2 sm:mb-3">
          <h5 className="font-medium text-gray-900 text-xs sm:text-sm">{job.name}</h5>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 sm:gap-2.5 mb-3 sm:mb-4">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {job.address}
          </p>
        </div>

        {/* Time, Date, and Due Time */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-50 rounded-md flex items-center justify-center">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
            </div>
            <span className="font-medium">{job.date}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-50 rounded-md flex items-center justify-center">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
            </div>
            <span className="font-medium">{job.time}</span>
          </div>
          {job.dueTime && (
            <div className="flex items-center gap-1 sm:gap-1.5 text-red-600">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-50 rounded-md flex items-center justify-center">
                <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600" />
              </div>
              <span className="font-medium">Due {job.dueTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );



  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-50 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Work in Progress</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 ml-1">
              {
                subscriptionActive ?
                  <>
                    {totalOngoingJobs} {totalOngoingJobs === 1 ? 'job in progress' : 'jobs in progress'}
                  </>
                  :
                  <>
                    No job currently in progress
                  </>
              }
            </p>
          </div>
          {
            subscriptionActive  &&
              <Button 
                onClick={() => navigate('/my-jobs', { state: { filter: 'Ongoing' } })}
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
      <div className="px-3 sm:px-6 py-1">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:md:grid-cols-2">
          {topJobs.length === 0  ||  !subscriptionActive ? (
            <div className="col-span-2 border-solid border border-gray-300 mb-4 rounded-2xl text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm sm:text-base font-medium mb-1">No ongoing jobs</p>
              <p className="text-gray-400 text-xs sm:text-sm">Active job progress will appear here</p>
            </div>
          ) : (
            topJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OngoingJobs;