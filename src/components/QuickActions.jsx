import { redirect, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const actions = [
  {
    icon: '📋',
    label: 'Apply for New Job',
    bg: 'bg-blue-500',
    hoverBg: 'hover:bg-blue-600',
    redirect: '/new-leads'
  },
  {
    icon: '📅',
    label: 'Update Availability',
    bg: 'bg-green-500',
    hoverBg: 'hover:bg-green-600',
    redirect: '/my-profile/work-details'
  },
  {
    icon: '💬',
    label: 'View Messages',
    bg: 'bg-purple-500',
    hoverBg: 'hover:bg-purple-600',
    redirect: ''
  }
];



const QuickActions = () => {

  const navigate = useNavigate();

  return(
    <motion.div
      className="bg-white rounded-2xl shadow-md p-5 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map(action => (
          <motion.button
            key={action.label}
            className={`py-3 px-4 border-none ${action.bg} ${action.hoverBg} text-white text-base rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (action.redirect) {
                navigate(action.redirect);
              }
            }}
          >
            <span>{action.icon}</span>
            {action.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
)};

export default QuickActions;