import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";
import { motion } from 'framer-motion';
import faviconFinal from '/faviconFinal.png';

const OnboardingLayout = () => {
  // const prefersReducedMotion = useReducedMotion();
  return (
    <OnboardingProvider>
      <div className="relative min-h-screen min-w-screen flex flex-col justify-center items-center overflow-clip">
        {/* Background base gradient */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: 0 }}
            style={{
            background: 'linear-gradient(135deg, rgba(191, 219, 254, 0.5) 0%, rgba(219, 234, 254, 0.45) 25%, rgba(147, 197, 253, 0.4) 50%, rgba(96, 165, 250, 0.35) 75%, rgba(241, 245, 249, 0.3) 90%, rgba(255, 255, 255, 0.25) 100%)'
          }}
          />

          {/* Soft animated blobs */}
        <motion.div
          className="absolute -left-24 -top-24 w-96 h-96 rounded-full z-0 pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0.9 }}
          // animate={prefersReducedMotion ? undefined : { x: [0, 14, -10, 0], y: [0, -10, 8, 0] }}
          // transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.02), transparent 40%)',
            filter: 'blur(52px)'
          }}
        />
        <motion.div
          className="absolute -right-28 -bottom-28 w-[28rem] h-[28rem] rounded-full z-0 pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0.85 }}
          // animate={prefersReducedMotion ? undefined : { x: [0, -12, 16, 0], y: [0, 10, -8, 0] }}
          // transition={{ duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.01), transparent 45%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Ambient center halo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.01), rgba(255,255,255,0.005) 32%, transparent 90%)',
            filter: 'blur(68px)'
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.005) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.02) 100%)'
          }}
        />

        {/* Branding - Top Left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-3 select-none">
          <img src={faviconFinal} alt="logo" className="w-10 h-10 drop-shadow" />
          <div className="hidden sm:flex text-xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">My Society Needs</span>
          </div>
        </div>


        {/* Routed content */}
        <div className="relative z-10 flex flex-col w-[80%] h-full min-h-[620px] items-center">
          <Outlet />
        </div>

      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;