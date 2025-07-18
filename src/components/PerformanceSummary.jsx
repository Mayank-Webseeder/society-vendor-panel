import { motion } from 'framer-motion';

const summary = {
  jobsCompleted: 8,
  earnings: 420,
  avgRating: 4.9,
  responseTime: '2.3 min'
};

const PerformanceSummary = () => (
  <div
      className="w-full bg-gray-200 p-2 rounded-2xl
                text-gray-800 border border-gray-800 flex flex-col gap-5 h-full"
    >
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      // transition={{ delay: 0.7 }}
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4">This Week</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Jobs Completed</span>
          <span className="font-semibold text-green-600">{summary.jobsCompleted}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Earnings</span>
          <span className="font-semibold text-green-600">${summary.earnings}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Avg Rating</span>
          <span className="font-semibold text-yellow-600">{summary.avgRating} ⭐</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Response Time</span>
          <span className="font-semibold text-blue-600">{summary.responseTime}</span>
        </div>
      </div>
    </motion.div>
  </div>
);

export default PerformanceSummary;