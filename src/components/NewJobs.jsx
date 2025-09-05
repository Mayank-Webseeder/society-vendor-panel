import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { Wrench, Calendar, Clock, MapPin, ChevronRight, Briefcase } from 'lucide-react';
import dummyData from '../static/dummyData_Leads';
import { useUser } from '../UserContext';


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const totalNewLeads = dummyData.filter(lead => lead.status === "New").length;

const getTopNewLeads = (data, count = 2) => {
  return data
    .filter(lead => lead.status === "New")
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



const NewJobs = () => {

  const navigate = useNavigate();

  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const topLeads = getTopNewLeads(dummyData);

  const LeadCard = ({ lead, index }) => (
    <motion.div
      className="group relative mb-4 rounded-2xl border border-solid border-blue-200/60 bg-white/65 backdrop-blur-md shadow-[0_4px_10px_-2px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_-4px_rgba(0,0,0,0.18),0_3px_8px_rgba(0,0,0,0.10)] transition-all duration-300 cursor-pointer overflow-hidden"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* <div className="absolute -top-8 -left-4 w-32 h-32 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),rgba(59,130,246,0)_70%)] blur-2xl" /> */}
        {/* <div className="absolute -bottom-10 -right-4 w-40 h-40 bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.25),rgba(99,102,241,0)_70%)] blur-2xl" /> */}
      </div>

      <div className="relative p-3 sm:p-5">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-400/20 via-blue-400/10 to-transparent border border-solid border-blue-300/40 flex items-center justify-center group-hover:from-blue-400/30 group-hover:via-blue-400/20 transition-colors backdrop-blur-sm">
              <Wrench className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 text-sm sm:text-base mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">
                {lead.work}
              </h4>
              <div className="h-0.5 w-10 bg-gradient-to-r from-blue-500/60 via-indigo-500/60 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-blue-700 bg-blue-50/70 backdrop-blur border border-solid border-blue-200/70 px-2 sm:px-2.5 py-1 rounded-lg shadow-sm">
              New
            </span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>

        <div className="mb-2 sm:mb-3">
          <h5 className="font-medium text-slate-900 text-xs sm:text-sm">{lead.name}</h5>
        </div>

        <div className="flex items-start gap-2 sm:gap-2.5 mb-3 sm:mb-4">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-50/60 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0 border border-solid border-blue-100/70">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {lead.address}
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium">
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-indigo-50/70 rounded-md flex items-center justify-center border border-solid border-indigo-100/70">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600" />
            </div>
            <span>{lead.date}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-50/70 rounded-md flex items-center justify-center border border-solid border-green-100/70">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
            </div>
            <span>{lead.time}</span>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </motion.div>
  );




  return (
    <motion.div
      className="relative group/container rounded-3xl bg-white/80 backdrop-blur-xl border border-solid border-slate-200/70 shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ delay: 0.3 }}
    > {/*  border border-gray-100 */}
      {/* Ambient gradient backdrop (hover reveal only for container) */}
      {/* <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-24 -left-16 w-72 h-72 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.22),rgba(59,130,246,0)_70%)] blur-2xl" />
        <div className="absolute -bottom-32 -right-10 w-80 h-80 bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.24),rgba(99,102,241,0)_70%)] blur-2xl" />
      </div> */}

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }} className="relative px-4 sm:px-7 pt-5 sm:pt-7 pb-4 sm:pb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">New Leads</h2>
            <div className="mt-2 h-1 w-28 bg-gradient-to-r from-blue-500/70 via-indigo-500/70 to-transparent rounded-full" />
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2 ml-0.5">
              {subscriptionActive ? (
                <>{totalNewLeads} {totalNewLeads === 1 ? 'new opportunity' : 'new opportunities'} available</>
              ) : (
                <>No new jobs currently</>
              )}
            </p>
          </div>
          {subscriptionActive && (
            <Button
              onClick={() => navigate('/new-leads')}
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
          {topLeads.length === 0 || !subscriptionActive ? (
            <div className="col-span-2 relative rounded-2xl border border-solid border-slate-200/70 bg-white/60 backdrop-blur-sm py-10 sm:py-14 text-center shadow-inner">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-40 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center border border-solid border-slate-200/70 shadow-sm">
                <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-semibold mb-1">No new jobs available</p>
              <p className="text-slate-400 text-xs sm:text-sm">New job opportunities will appear here</p>
            </div>
          ) : (
            topLeads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} index={index} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewJobs;