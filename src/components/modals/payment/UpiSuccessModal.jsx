import { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';

const UpiSuccessModal = ({ onGoToDashboard }) => {
  const checkRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger the checkmark animation on mount
    if (checkRef.current) {
      checkRef.current.classList.add('animate-checkmark-pop');
    }
  }, []);

  // Handler for dashboard navigation with animation
  const handleGoToDashboard = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGoToDashboard();
    }, 1200); // Animation duration (ms)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(134,198,234,0.27)] bg-opacity-30 z-50 font-inter">
      <div
        className="relative rounded-xl shadow-lg flex flex-col items-center border border-white/30 px-6 py-4"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          width: '45vw',
          height: '80vh',
          maxWidth: '900px',
          maxHeight: '700px',
          justifyContent: 'center',
          paddingTop: 0,
        }}
      >
        {/* Close Button */}
        <button
          className="rounded-full flex justify-center items-center border-none absolute top-4 right-4 text-blue-300 hover:text-black cursor-pointer transition-colors"
          onClick={handleGoToDashboard}
          disabled={loading}
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-14 text-slate-800 text-center">
          Payment Successful!
        </h1>

        {/* Animated Checkmark Icon */}
        <div
          ref={checkRef}
          className="flex items-center justify-center rounded-full mb-10"
          style={{
            backgroundColor: '#34A853',
            width: '80px',
            height: '80px',
          }}
        >
          <Check size={50} style={{ color: '#D9D9D9' }} strokeWidth={2.5} />
        </div>

        {/* Descriptive Text */}
        <p className="text-center text-lg mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(0,0,0,0.59)' }}>
          Welcome to My Society Needs! You're now ready to start pitching to verified society requirements.
        </p>

        {/* Go to Dashboard Button */}
        <button
          className={`w-[40%] bg-[#56A9D9] border-none text-xl text-white font-bold py-3 rounded-md shadow-md transition-colors
            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-500 cursor-pointer'}
          `}
          onClick={handleGoToDashboard}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2 animate-pulse">
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Redirecting...
            </span>
          ) : (
            "Go to Dashboard"
          )}
        </button>

        {/* Animation styles */}
        <style>{`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
          .animate-checkmark-pop {
            animation: checkmark-pop 0.7s cubic-bezier(0.23, 1.15, 0.32, 1) both;
          }
          @keyframes checkmark-pop {
            0% {
              transform: scale(0.2) rotate(-30deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.15) rotate(10deg);
              opacity: 1;
            }
            80% {
              transform: scale(0.95) rotate(-5deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default UpiSuccessModal;