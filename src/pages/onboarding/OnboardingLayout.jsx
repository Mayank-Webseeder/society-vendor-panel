import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";

const OnboardingLayout = () => {
  return (
    <OnboardingProvider>
      <div 
        className="relative h-screen w-screen flex flex-col justify-center items-center"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 30%, #1e1b4b 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Professional grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Subtle geometric accent */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            transform: 'skewX(15deg)',
            transformOrigin: 'top',
          }}
        />

        {/* Professional corner accents */}
        <div
          className="absolute top-0 right-0 w-50 h-50 rounded-full"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            transform: 'translate(50%, -50%)',
          }}
        />

        <div
          className="absolute bottom-0 left-0 rounded-full"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            transform: 'translate(-50%, 50%)',
          }}
        />

        {/* VELRA Branding - Top Left */}
        <div
          className="absolute top-3 left-[10%] z-10"
        >
          <h1
            style={{
              fontWeight: '700',
              background: 'linear-gradient(90deg, #ffffff, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.2rem',
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              margin: 0,
            }}
          >
            VELRA
            <div
              style={{
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                background: 'linear-gradient(90deg, #60a5fa, #ffffff)',
                borderRadius: '1px',
              }}
            />
          </h1>
        </div>

        <Outlet />

      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;