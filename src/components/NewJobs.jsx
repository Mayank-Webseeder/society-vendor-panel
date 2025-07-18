import Button from '@mui/material/Button';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import dummyData from '../static/dummyData_Leads';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const getTopNewLeads = (data, count = 4) => {
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
  const topLeads = getTopNewLeads(dummyData);

  const LeadCard = ({ lead }) => (
    <motion.div
      className="bg-gray-50 rounded-xl p-4 shadow hover:bg-blue-50 transition-colors cursor-pointer flex flex-col h-full"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="flex font-semibold items-center text-gray-900/80">
          <span><WrenchScrewdriverIcon className='w-4 h-4 mr-1'/></span>
          {lead.work}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">New</span>
      </div>
      <div className="text-sm text-gray-700 mb-1">{lead.name}</div>
      <div className="text-xs text-gray-500/70 mb-1">{lead.address}</div>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
        <span>🗓 {lead.date}</span>
        <span>⏰ {lead.time}</span>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">New Jobs</h2>
        <Button sx={{ borderRadius: '8px' }} variant='outlined' className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {topLeads.map(lead => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </motion.div>
  );
};

export default NewJobs;