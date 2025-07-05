
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingPage from '../../assets/loadingPage.png';
import loadingPageTop from '../../assets/loadingPageTop.png';
import loadingPageBottom from '../../assets/loadingPageBottom.png';


const Step1_Loading = () => {

  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [dotCount, setDotCount] = useState(1);

  // Animate dots when spinner is shown
  useEffect(() => {
    let interval;
    if (showSpinner) {
      interval = setInterval(() => {
        setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
      }, 400);
      // Redirect after 3 seconds
      const timeout = setTimeout(() => {
        navigate('/auth/onboarding/what-you-offer', { replace: true });
      }, 3000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [showSpinner, navigate]);




  return (
    <div className='relative h-screen w-screen flex items-center justify-center bg-white overflow-hidden'>
      <div className='flex flex-col justify-center items-center -translate-y-6'>
        <img src={loadingPage} alt="loadingPage" />

        <div className='flex flex-col jusitfy-center items-center'>
          <p className='font-extrabold text-4xl text-black/[0.69] mb-5'>
            Let's Get You Set Up
            <span className="inline-block w-8">
              {showSpinner && (
                <span className="inline-block animate-dots">
                  {'.'.repeat(dotCount)}
                </span>
              )}
              {!showSpinner && '...'}
            </span>
          </p>
          <p className='font-medium text-lg text-black/[0.59] mb-12'>Build Your Business Presence</p>
        </div>

        {/* Button or Spinner */}
        {!showSpinner ? (
          <button
            type="button"
            className="bg-[#56A9D9] z-20 text-xl text-white border-none font-bold px-6 py-2 rounded-md mb-6 shadow-xl hover:bg-blue-500 transition-colors cursor-pointer"
            onClick={() => setShowSpinner(true)}
          >
            Create Your Profile
          </button>
        ) : (
          <div className="spinner mb-6"></div>
        )}
      </div>

      <img
        src={loadingPageTop}
        className='pointer-events-none absolute -top-14 left-0 w-full h-auto'
        alt="Top-Loading"
      />
      <img
        src={loadingPageBottom}
        className='pointer-events-none absolute -bottom-10 left-0 w-full h-auto'
        alt="Bottom-Loading"
      />

      {/* Spinner Styles */}
      <style>{`
        .spinner {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: radial-gradient(farthest-side,#57a9d9 94%,#0000) top/9px 9px no-repeat,
            conic-gradient(#0000 30%,#57a9d9);
          -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
          animation: spinner-c7wet2 1s infinite linear;
        }
        @keyframes spinner-c7wet2 {
          100% { transform: rotate(1turn); }
        }
        .animate-dots {
          font-weight: bold;
          letter-spacing: 2px;
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};


export default Step1_Loading;