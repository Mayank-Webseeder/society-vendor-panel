import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";
import { useEffect, useState } from "react";

const OnboardingLayout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <OnboardingProvider>
      <div 
        className="relative h-screen w-screen flex justify-center items-center"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 255, 255, 0.15) 0%, 
              transparent 50%),
            linear-gradient(135deg, 
              #4A90E2 0%, 
              #56A9D9 25%, 
              #5DADE2 50%, 
              #6BB6FF 75%, 
              #4A90E2 100%),
            linear-gradient(45deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 50%),
            radial-gradient(ellipse at top left, 
              rgba(255, 255, 255, 0.2) 0%, 
              transparent 70%),
            radial-gradient(ellipse at bottom right, 
              rgba(74, 144, 226, 0.8) 0%, 
              transparent 70%)
          `,
          backgroundSize: '400% 400%, 100% 100%, 200% 200%, 150% 150%, 150% 150%',
          animation: 'gradientShift 12s ease infinite, backgroundFloat 18s ease-in-out infinite alternate',
        }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          <div 
            className="absolute w-96 h-96 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              top: '15%',
              left: '10%',
              animation: 'float 8s ease-in-out infinite, pulse 4s ease-in-out infinite',
              filter: 'blur(2px)',
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              top: '60%',
              right: '5%',
              animation: 'float 12s ease-in-out infinite reverse, pulse 6s ease-in-out infinite',
              filter: 'blur(3px)',
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
              bottom: '10%',
              left: '70%',
              animation: 'float 10s ease-in-out infinite, pulse 5s ease-in-out infinite',
              filter: 'blur(1px)',
            }}
          />

          {/* Geometric Floating Shapes */}
          <div 
            className="absolute w-24 h-24 opacity-8"
            style={{
              top: '20%',
              right: '15%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              animation: 'rotate 25s linear infinite, float 7s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute w-16 h-16 opacity-12"
            style={{
              bottom: '25%',
              left: '20%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              borderRadius: '8px',
              animation: 'rotate 20s linear infinite reverse, float 9s ease-in-out infinite',
              transform: 'rotate(45deg)',
            }}
          />

          {/* Subtle Particle Effect */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animation: `particle ${8 + Math.random() * 12}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}

          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gridMove 40s linear infinite',
            }}
          />

          {/* Subtle Radial Pattern */}
          <div 
            className="absolute inset-0 opacity-6"
            style={{
              background: `
                conic-gradient(from 0deg at 50% 50%, 
                  transparent 0deg, 
                  rgba(255,255,255,0.05) 2deg, 
                  transparent 4deg, 
                  transparent 88deg, 
                  rgba(255,255,255,0.05) 90deg, 
                  transparent 92deg, 
                  transparent 178deg, 
                  rgba(255,255,255,0.05) 180deg, 
                  transparent 182deg, 
                  transparent 268deg, 
                  rgba(255,255,255,0.05) 270deg, 
                  transparent 272deg, 
                  transparent 358deg, 
                  rgba(255,255,255,0.05) 360deg
                )
              `,
              animation: 'rotate 80s linear infinite',
            }}
          />

          {/* Glassmorphism Layer */}
          <div 
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background: `
                radial-gradient(circle at 30% 70%, 
                  rgba(255, 255, 255, 0.08) 0%, 
                  transparent 60%),
                radial-gradient(circle at 70% 30%, 
                  rgba(255, 255, 255, 0.06) 0%, 
                  transparent 60%)
              `,
            }}
          />
        </div>

        <Outlet />

        <style jsx>{`
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%, 0% 0%, 0% 0%, 0% 0%, 100% 100%;
            }
            25% {
              background-position: 100% 50%, 0% 0%, 100% 100%, 100% 0%, 0% 100%;
            }
            50% {
              background-position: 100% 0%, 0% 0%, 0% 100%, 100% 100%, 0% 0%;
            }
            75% {
              background-position: 0% 0%, 0% 0%, 100% 0%, 0% 100%, 100% 0%;
            }
          }

          @keyframes backgroundFloat {
            0%, 100% {
              background-size: 400% 400%, 100% 100%, 200% 200%, 150% 150%, 150% 150%;
            }
            50% {
              background-size: 500% 500%, 100% 100%, 250% 250%, 180% 180%, 180% 180%;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-15px) scale(1.02);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.25;
            }
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes particle {
            0% {
              transform: translateY(0px) scale(0);
              opacity: 0;
            }
            15% {
              opacity: 1;
              transform: scale(1);
            }
            85% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-80px) scale(0);
              opacity: 0;
            }
          }

          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }
        `}</style>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;