import { motion } from 'framer-motion';
import { useUser } from '../UserContext';
import dummyData from '../static/dummyData_Leads';
import { finalRating } from '../static/dummyData_MyStats';

const PerformanceSummary = () => {
  const { user } = useUser();
  const responseTime = user.avgResponseTime;
  const jobsCompleted = dummyData.filter(lead => lead.status === "Completed").length;

  const summary = {
    jobsCompleted,
    earnings: 420,
    avgRating: finalRating,
    responseTime,
  };

  const metrics = [
    {
      label: 'Jobs Completed',
      value: summary.jobsCompleted,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      icon: '✓'
    },
    {
      label: 'Earnings',
      value: `$${summary.earnings}`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      icon: '$'
    },
    {
      label: 'Avg Rating',
      value: `${summary.avgRating}`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      icon: '★',
      suffix: true
    },
    {
      label: 'Response Time',
      value: `${summary.responseTime}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      icon: '⏱',
      unit: 'min'
    }
  ];

  return (
    <div className="w-full bg-gray-200 rounded-2xl border-none px-2 shadow-sm h-fit">
      <motion.div
        className="bg-white backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 p-5 h-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">📊</span>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            This Week
          </h2>
        </div>

        <div className="space-y-4 flex-1">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={`flex items-center justify-between p-3 rounded-xl ${metric.bgColor} border border-gray-100/50 hover:shadow-md transition-all duration-200 group`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${metric.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <span className={`text-sm font-bold ${metric.color}`}>
                    {metric.icon}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {metric.label}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className={`font-bold text-lg ${metric.color}`}>
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs text-gray-500 font-medium">
                    {metric.unit}
                  </span>
                )}
                {metric.suffix && (
                  <span className="text-amber-400 text-lg">⭐</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live metrics updated</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceSummary;