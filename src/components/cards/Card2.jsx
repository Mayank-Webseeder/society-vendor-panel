import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import dummyData from "../../static/dummyData_Leads";
import { useUser } from '../../UserContext';


const Card2 = () => {

  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const navigate = useNavigate();

  const jobsCompleted = dummyData.filter(lead => lead.status === "Completed").length;

  const handleCardClick = () => {
    // Redirect to MyJobs.jsx with filter set to "Completed"
    navigate("/my-jobs", { state: { filter: "Completed" } });
  };


  return (
    <>
      <div onClick={handleCardClick} className="group relative hidden sm:block overflow-hidden rounded-2xl w-56 md:w-60 h-36 md:h-40 bg-white/75 backdrop-blur-md border border-solid border-slate-200/70 shadow-[0_5px_14px_-6px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.28),0_4px_10px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 -left-6 w-40 h-40 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.20),rgba(99,102,241,0)_65%)] blur-2xl" />
          <div className="absolute -bottom-14 -right-8 w-48 h-48 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.18),rgba(168,85,247,0)_65%)] blur-2xl" />
          {/* Corner grid pattern */}
          {/* <div className="absolute -top-6 -right-6 opacity-20 text-indigo-600">
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" aria-hidden="true">
              <defs>
                <pattern id="gridCard2" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M10 0L0 10" stroke="currentColor" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="140" height="140" fill="url(#gridCard2)" />
            </svg>
          </div> */}
        </div>
        <div className="relative h-full px-4 py-3 flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm ring-1 ring-white/40">
              <CheckCircle2 size={16} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="text-slate-700 text-base font-semibold tracking-tight">Jobs Completed</p>
              <p className="text-[10px] text-slate-500">Total</p>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-end justify-between pr-1">
              <div>
                
                {subscriptionActive && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
                      <ArrowUpRight size={12} />
                      12%
                    </span>
                    <span className="text-[10px] text-slate-500">vs last week</span>
                  </div>
                )}
                <p className="text-slate-900 text-3xl md:text-4xl font-bold">
                  {subscriptionActive ? jobsCompleted : 'N/A'}
                </p>
              </div>
              <FaChevronRight className="hidden lg:block text-indigo-500/80 group-hover:text-indigo-600 mr-1 mb-1 transition-colors" size={18} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-violet-400 to-transparent opacity-90" />
      </div>
    </>
  )
}


export default Card2;