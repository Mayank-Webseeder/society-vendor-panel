import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";
import { motion, useReducedMotion } from 'framer-motion';
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
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 30%, #60a5fa 70%, #93c5fd 100%)',
          filter: 'saturate(1.05) contrast(1.02)'
        }}
        />

        {/* Soft animated blobs */}
        <motion.div
          className="absolute -left-24 -top-24 w-96 h-96 rounded-full z-0 pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0.9 }}
          // animate={prefersReducedMotion ? undefined : { x: [0, 14, -10, 0], y: [0, -10, 8, 0] }}
          // transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.18), transparent 40%)',
            filter: 'blur(52px)'
          }}
        />
        <motion.div
          className="absolute -right-28 -bottom-28 w-[28rem] h-[28rem] rounded-full z-0 pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0.85 }}
          // animate={prefersReducedMotion ? undefined : { x: [0, -12, 16, 0], y: [0, 10, -8, 0] }}
          // transition={{ duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(139,92,246,0.12), transparent 45%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Ambient center halo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(59,130,246,0.20), rgba(99,102,241,0.14) 32%, transparent 90%)',
            filter: 'blur(68px)'
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.32) 100%)'
          }}
        />

        {/* Branding - Top Left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-3 select-none">
          <img src={faviconFinal} alt="logo" className="w-10 h-10 drop-shadow" />
          <div className="hidden sm:flex text-xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">My Society Needs</span>
          </div>
        </div>


        {/* Routed content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center overflow-hidden">
          <Outlet />
        </div>

      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;