import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Calendar, UserCog } from 'lucide-react';

// Animation variants (consistent stagger pattern)
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

// Action definitions (cleaner accent-based styling)
const actions = [
  {
    label: 'Apply for New Job',
    description: 'Browse and apply for the latest leads',
    icon: Briefcase,
    accent: 'blue',
    redirect: '/new-leads'
  },
  {
    label: 'Update Availability',
    description: 'Adjust your working days & hours',
    icon: Calendar,
    accent: 'emerald',
    redirect: '/my-profile/work-details'
  },
  {
    label: 'Edit Your Profile',
    description: 'Keep your profile & services up to date',
    icon: UserCog,
    accent: 'violet',
    redirect: '/my-profile'
  }
];

const QuickActions = () => {
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    if (action.redirect) navigate(action.redirect);
  };

  return (
    <motion.div
      className="relative group/container rounded-3xl bg-white/80 backdrop-blur-xl border border-solid border-slate-200/70 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.20),0_3px_10px_rgba(0,0,0,0.08)] p-4 sm:p-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Ambient hover gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-28 -left-20 w-80 h-80 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.22),rgba(59,130,246,0)_70%)] blur-2xl" />
        <div className="absolute -bottom-36 -right-16 w-96 h-96 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.22),rgba(168,85,247,0)_70%)] blur-2xl" />
      </div>

      {/* Heading */}
      <div className="relative flex items-center justify-between mb-4 sm:mb-7">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Quick Actions</h2>
          <div className="mt-2 h-1 w-32 bg-gradient-to-r from-blue-500/70 via-purple-500/60 to-transparent rounded-full" />
          <p className="text-[11px] sm:text-xs text-slate-500 mt-2 ml-0.5">Get things done faster</p>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="block sm:hidden -mx-1">
        <motion.div
          className="flex relative justify-start px-2 gap-3 pt-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300/40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {actions.map((action) => {
            const IconComponent = action.icon;
            const accent = action.accent;
            return (
              <motion.button
                key={action.label}
                variants={itemVariants}
                className={`group relative flex-shrink-0 w-28 h-32 rounded-2xl bg-white/75 backdrop-blur-md border border-solid border-slate-200/70 shadow-[0_4px_10px_-3px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_18px_-6px_rgba(0,0,0,0.25),0_3px_8px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer overflow-hidden`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleActionClick(action)}
              >
                {/* Accent ring (pseudo replacement) */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.55),rgba(255,255,255,0)_70%)]`} />
                <div className="relative z-10 flex flex-col items-center justify-between h-full py-3 px-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 border border-solid bg-gradient-to-br from-white/70 to-white/40 shadow-sm
                    ${accent === 'blue' ? 'border-blue-200/70' : ''}
                    ${accent === 'emerald' ? 'border-emerald-200/70' : ''}
                    ${accent === 'violet' ? 'border-violet-200/70' : ''}
                  `}>
                    <IconComponent className={`w-6 h-6
                      ${accent === 'blue' ? 'text-blue-600' : ''}
                      ${accent === 'emerald' ? 'text-emerald-600' : ''}
                      ${accent === 'violet' ? 'text-violet-600' : ''}
                    `} strokeWidth={1.6} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800 text-center leading-snug px-1 line-clamp-2">
                    {action.label}
                  </span>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-80 bg-gradient-to-r rounded-b-2xl
                  ${accent === 'blue' ? 'from-blue-400 via-indigo-400 to-transparent' : ''}
                  ${accent === 'emerald' ? 'from-emerald-400 via-teal-400 to-transparent' : ''}
                  ${accent === 'violet' ? 'from-violet-400 via-fuchsia-400 to-transparent' : ''}
                `} />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Desktop Design */}
      <motion.div
        className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action) => {
          const IconComponent = action.icon;
          const accent = action.accent;
          return (
            <motion.button
              key={action.label}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl bg-white/75 backdrop-blur-md p-5 flex flex-col border border-solid border-slate-200/70 text-left cursor-pointer transition-all duration-400 shadow-[0_5px_14px_-5px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.28),0_4px_10px_rgba(0,0,0,0.12)] hover:-translate-y-1`}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleActionClick(action)}
            >
              {/* Hover ambient */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute -top-8 -left-6 w-40 h-40 blur-2xl rounded-full
                  ${accent === 'blue' ? 'bg-blue-300/25' : ''}
                  ${accent === 'emerald' ? 'bg-emerald-300/25' : ''}
                  ${accent === 'violet' ? 'bg-violet-300/30' : ''}
                `} />
                {/* <div className={`absolute -bottom-10 -right-4 w-48 h-48 blur-2xl rounded-full
                  ${accent === 'blue' ? 'bg-indigo-300/20' : ''}
                  ${accent === 'emerald' ? 'bg-teal-300/20' : ''}
                  ${accent === 'violet' ? 'bg-fuchsia-300/25' : ''}
                `} /> */}
              </div>
              {/* Icon */}
              <div className="flex justify-center w-full mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/70 to-white/40 border border-solid backdrop-blur-sm shadow-sm
                  ${accent === 'blue' ? 'border-blue-200/70 group-hover:border-blue-300/80' : ''}
                  ${accent === 'emerald' ? 'border-emerald-200/70 group-hover:border-emerald-300/80' : ''}
                  ${accent === 'violet' ? 'border-violet-200/70 group-hover:border-violet-300/80' : ''}
                `}>
                  <IconComponent className={`w-8 h-8
                    ${accent === 'blue' ? 'text-blue-600' : ''}
                    ${accent === 'emerald' ? 'text-emerald-600' : ''}
                    ${accent === 'violet' ? 'text-violet-600' : ''}
                  `} strokeWidth={1.4} />
                </div>
              </div>
              {/* Title */}
              <h3 className="text-slate-800 font-semibold text-base sm:text-lg mb-2 tracking-tight group-hover:translate-x-0.5 transition-transform">
                {action.label}
              </h3>
              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                {action.description}
              </p>
              {/* CTA */}
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border border-solid backdrop-blur-sm shadow-sm
                  ${accent === 'blue' ? 'text-blue-700 border-blue-200/70 bg-blue-50/60 group-hover:bg-blue-100/60' : ''}
                  ${accent === 'emerald' ? 'text-emerald-700 border-emerald-200/70 bg-emerald-50/60 group-hover:bg-emerald-100/60' : ''}
                  ${accent === 'violet' ? 'text-violet-700 border-violet-200/70 bg-violet-50/60 group-hover:bg-violet-100/60' : ''}
                `}>
                  Go
                </span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1
                  ${accent === 'blue' ? 'text-blue-500' : ''}
                  ${accent === 'emerald' ? 'text-emerald-500' : ''}
                  ${accent === 'violet' ? 'text-violet-500' : ''}
                `} />
              </div>
              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-90 bg-gradient-to-r
                ${accent === 'blue' ? 'from-blue-400 via-indigo-400 to-transparent' : ''}
                ${accent === 'emerald' ? 'from-emerald-400 via-teal-400 to-transparent' : ''}
                ${accent === 'violet' ? 'from-violet-400 via-fuchsia-400 to-transparent' : ''}
              `} />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Bottom animated accent dots */}
      <div className="mt-3 sm:mt-6">
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: dot * 0.25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;
