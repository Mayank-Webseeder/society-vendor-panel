import { motion } from 'framer-motion';
import { useUser } from '../UserContext';
import LockIcon from '@mui/icons-material/Lock';
import dummyData from '../static/dummyData_Leads';
import { finalRating } from '../static/dummyData_MyStats';

// Accent mapping for consistent styling
const accentStyles = {
  jobs: {
    ring: 'border-emerald-300/60',
    icon: 'text-emerald-600',
    glowA: 'bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.28),rgba(16,185,129,0)_70%)]',
    glowB: 'bg-[radial-gradient(circle_at_70%_70%,rgba(5,150,105,0.25),rgba(5,150,105,0)_70%)]',
    bar: 'from-emerald-500 via-teal-400 to-transparent'
  },
  earnings: {
    ring: 'border-green-300/60',
    icon: 'text-green-600',
    glowA: 'bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.28),rgba(34,197,94,0)_70%)]',
    glowB: 'bg-[radial-gradient(circle_at_70%_70%,rgba(22,163,74,0.25),rgba(22,163,74,0)_70%)]',
    bar: 'from-green-500 via-emerald-400 to-transparent'
  },
  rating: {
    ring: 'border-amber-300/60',
    icon: 'text-amber-600',
    glowA: 'bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.32),rgba(245,158,11,0)_70%)]',
    glowB: 'bg-[radial-gradient(circle_at_70%_70%,rgba(217,119,6,0.28),rgba(217,119,6,0)_70%)]',
    bar: 'from-amber-500 via-orange-400 to-transparent'
  },
  response: {
    ring: 'border-blue-300/60',
    icon: 'text-blue-600',
    glowA: 'bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.30),rgba(59,130,246,0)_70%)]',
    glowB: 'bg-[radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.26),rgba(37,99,235,0)_70%)]',
    bar: 'from-blue-500 via-indigo-400 to-transparent'
  },
  locked: {
    ring: 'border-slate-300/50',
    icon: 'text-slate-400',
    glowA: 'bg-[radial-gradient(circle_at_30%_30%,rgba(148,163,184,0.20),rgba(148,163,184,0)_70%)]',
    glowB: 'bg-[radial-gradient(circle_at_70%_70%,rgba(100,116,139,0.15),rgba(100,116,139,0)_70%)]',
    bar: 'from-slate-400 via-slate-300 to-transparent'
  }
};

const PerformanceSummary = () => {
  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const jobsCompleted = dummyData.filter(lead => lead.status === 'Completed').length;

  const summary = {
    jobsCompleted,
    earnings: user.earnings,
    avgRating: finalRating,
    responseTime: user.avgResponseTime
  };

  const metrics = [
    {
      key: 'jobs',
      label: 'Jobs Completed',
      value: subscriptionActive ? summary.jobsCompleted : <LockIcon fontSize="small" className="text-amber-500" />,
      display: subscriptionActive ? summary.jobsCompleted : null,
      icon: '✓'
    },
    {
      key: 'earnings',
      label: 'Earnings',
      value: subscriptionActive ? `$${summary.earnings}` : <LockIcon fontSize="small" className="text-amber-500" />,
      display: subscriptionActive ? `$${summary.earnings}` : null,
      icon: '$'
    },
    {
      key: 'rating',
      label: 'Avg Rating',
      value: subscriptionActive ? `${summary.avgRating}` : <LockIcon fontSize="small" className="text-amber-500" />,
      display: subscriptionActive ? `${summary.avgRating}` : null,
      icon: '★',
      suffix: subscriptionActive ? '⭐' : null
    },
    {
      key: 'response',
      label: 'Response Time',
      value: subscriptionActive ? `${summary.responseTime} min` : <LockIcon fontSize="small" className="text-amber-500" />,
      display: subscriptionActive ? `${summary.responseTime}` : null,
      unit: subscriptionActive ? 'min' : null,
      icon: '⏱'
    }
  ];

  return (
    <motion.div
      className="relative group/container rounded-3xl bg-white/80 backdrop-blur-xl border border-solid border-slate-200/70 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.18),0_3px_10px_rgba(0,0,0,0.08)] p-3 sm:p-4 overflow-clip"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Ambient hover gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.22),rgba(99,102,241,0)_70%)] blur-2xl" />
        {/* <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.25),rgba(168,85,247,0)_70%)] blur-2xl" /> */}
      </div>

      {/* Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-inner text-white text-base font-semibold">
            📊
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">This Week</h2>
            <div className="mt-2 h-1 w-28 bg-gradient-to-r from-indigo-500/70 via-violet-500/60 to-transparent rounded-full" />
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2 ml-0.5">Your current performance snapshot</p>
          </div>
        </div>
      </div>

      {/* Metrics Vertical List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {metrics.map((metric, idx) => {
          const locked = !subscriptionActive;
          const accent = locked ? accentStyles.locked : accentStyles[metric.key];
          return (
            <motion.div
              key={metric.label}
              className={`group relative overflow-hidden rounded-2xl border border-solid ${accent.ring} bg-white/70 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-3 flex items-center justify-between shadow-[0_4px_10px_-2px_rgba(0,0,0,0.10),0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_7px_18px_-5px_rgba(0,0,0,0.22),0_3px_10px_rgba(0,0,0,0.12)] transition-all duration-400 cursor-default`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -3 }}
            >
              {/* Hover ambient */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute -top-10 -left-8 w-36 h-36 ${accent.glowA} blur-2xl`} />
                <div className={`absolute -bottom-12 -right-6 w-48 h-48 ${accent.glowB} blur-2xl`} />
              </div>

              {/* Left section: icon + label */}
              <div className="relative z-10 flex items-center gap-4 min-w-0">
                <div className={`w-11 h-11 rounded-xl border border-solid ${accent.ring} bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <span className={`text-base font-semibold ${accent.icon}`}>{metric.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] sm:text-sm font-medium text-slate-600 tracking-tight">{metric.label}</span>
                  {!subscriptionActive && (
                    <span className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Locked metric</span>
                  )}
                </div>
              </div>

              {/* Right section: value */}
              <div className="relative z-10 flex items-end gap-1">
                <span className={`font-semibold text-lg sm:text-xl tracking-tight ${accent.icon}`}>{metric.value}</span>
              </div>

              {/* Bottom bar accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.bar} opacity-90`} />
            </motion.div>
          );
        })}
      </div>

      {/* Footer status */}
      <div className="mt-6 pt-0">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-500">
          {subscriptionActive ? (
            <>
              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              <span>Live metrics updated</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse" />
              <span>Upgrade to unlock live metrics</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceSummary;