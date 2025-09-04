import { useUser } from '../../UserContext';
import { Timer, ArrowDownRight } from 'lucide-react';


const Card1 = () => {

  const { user } = useUser();    // Get context data
  const subscriptionActive = user.subscription_active;
  
  return (
  <div className="group relative overflow-hidden rounded-2xl w-56 md:w-60 h-36 md:h-40 bg-white/75 backdrop-blur-md border border-solid border-slate-200/70 shadow-[0_5px_14px_-6px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.28),0_4px_10px_rgba(0,0,0,0.12)] transition-all duration-300">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-6 w-40 h-40 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.20),rgba(56,189,248,0)_65%)] blur-2xl" />
        {/* <div className="absolute -bottom-14 -right-8 w-48 h-48 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.20),rgba(59,130,246,0)_65%)] blur-2xl" /> */}
      </div>
      <div className="relative h-full px-4 py-3 flex flex-col">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-sm ring-1 ring-white/40">
            <Timer size={16} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col leading-tight">
            <p className="text-slate-700 text-base font-semibold tracking-tight">Avg. Response Time</p>
            <p className="text-[10px] text-slate-500">Overall</p>
          </div>
        </div>
        <div className="mt-auto">
          
          {subscriptionActive && (
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
                <ArrowDownRight size={12} />
                7%
              </span>
              <span className="text-[10px] text-slate-500">vs last week</span>
            </div>
          )}
          <p className="text-slate-900 text-3xl md:text-4xl font-bold">
            {subscriptionActive ? `${user.avgResponseTime} min` : 'N/A'}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-300 to-transparent opacity-90" />
    </div>
  )
}


export default Card1;