import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';


const shineBtnStyles = `
@keyframes shine-btn {
  0% { left: -75%; opacity: 0; }
  20% { opacity: 1; }
  60% { left: 100%; opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
@keyframes btn-translate {
  0% { transform: translateY(0); }
  30% { transform: translateY(-3px) scale(1.04); }
  60% { transform: translateY(0); }
  100% { transform: translateY(0); }
}
.button-shine-effect {
  position: absolute;
  left: -75%;
  top: 0;
  height: 100%;
  width: 150%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  animation: shine-btn 1.2s cubic-bezier(0.4,0,0.2,1) 1;
}
.group/button:active {
  animation: btn-translate 0.3s cubic-bezier(0.4,0,0.2,1);
}
.group/button:focus {
  animation: btn-translate 1s cubic-bezier(0.1,0,0.1,0.1);
}
`;

const SubscribeStrip = () => {

  return (
    <>
      <style>{shineBtnStyles}</style>
      <div className="relative w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-200 text-blue-700 text-sm sm:text-base font-medium px-4 py-2 flex justify-center items-center gap-2 shadow-md overflow-hidden group">
        {/* This is the shine overlay. It should be behind interactive elements. */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine z-0"></div>

        {/* Content and button should have a higher z-index to be clickable and visible */}
        <div className="relative flex justify-center items-center gap-2 z-10">
          <SparklesIcon
            className="h-5 w-5 text-blue-500 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-center">
            Subscribe to unlock all premium features!
          </span>
          <Link
            to="/payment"
            className="no-underline ml-2 px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out text-sm flex-shrink-0
              hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
              relative overflow-hidden group/button"
            aria-label="Subscribe Now to unlock features"
          >
            <span className="relative z-10">Subscribe Now</span>
            {/* Animated shine effect */}
            <span className="button-shine-effect" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubscribeStrip;