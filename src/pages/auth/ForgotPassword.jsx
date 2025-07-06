import { useState, useRef, useEffect } from 'react';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import authImgLower from '../../assets/authImgLower.png';
import authImgUpper from '../../assets/authImgUpper.png';
import velraSymbol from '../../assets/velraSymbol.png';
import { Typography } from '@mui/material';

const RESEND_TIME = 59; // seconds

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isTiming, setIsTiming] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (isTiming) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTiming(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTiming]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowResend(true);
    setTimer(RESEND_TIME);
    setIsTiming(true);
    // API call here
    console.log("Password reset link requested for:", email);
  };

  const formatTimer = (t) => `0:${t.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 flex overflow-y-hidden" style={{ flexDirection: 'row' }}>
      {/* Left: Form */}
      <div
        className="
          flex flex-col justify-center items-center
          bg-white p-4 sm:p-8
          w-full
          md:w-1/2
          transition-all
          duration-300
        "
        style={{
          minHeight: '100vh',
        }}
      >
        {/* VELRA logo & Title */}
        <div className='flex items-center gap-2 mb-16'>
          <img src={velraSymbol} className='h-20 sm:h-24' alt="velra-symbol" />
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              fontWeight: 'bold',
              color: '#56A9D9',
              mb: 1,
              textAlign: 'left',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
            }}
          >
            VELRA
          </Typography>
        </div>

        {/* Form */}
        <form className="w-full max-w-md px-4" onSubmit={handleFormSubmit}>
          <div className="mb-8">
            <label htmlFor="email" className="block text-[#1C1B1F]/[0.69] text-base font-semibold mb-1">Enter Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="abc9@gmail.com"
              className={`w-full px-2 py-2 border-0 border-b-2 border-black/[0.12] rounded-none placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-400 text-lg transition-colors
                ${isTiming ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-800'}
              `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isTiming}
            />
          </div>
          <p className="text-left font-medium text-base text-[#4487AE] mb-10">
            Enter your registered email address. We'll send you a link to reset your password.
          </p>

          {showResend && (
            <div className="flex items-center justify-between mt-16 mb-8">
              <span className="text-base font-medium text-gray-500">
                Didn't receive the email?{' '}Click Resend.
              </span>
              <span className="text-sm text-gray-700 font-semibold min-w-[40px] text-right">
                {isTiming ? formatTimer(timer) : '0:00'}
              </span>
            </div>
          )}

          <button
            type="submit"
            className={`w-full text-lg border-none font-bold py-2 rounded-md shadow-xl transition-colors
              ${(isTiming || email.trim() === '') ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#56A9D9] text-white hover:bg-blue-500 cursor-pointer'}
            `}
            disabled={isTiming || email.trim() === ''}
          >
            {showResend && !isTiming ? 'Resend Link' : 'Send Link'}
          </button>
        </form>
      </div>

      {/* Right: Image (hidden on screens smaller than md) */}
      <div
        className="
          relative
          hidden
          md:flex
          w-1/2
          h-full
          items-center
          justify-center
        "
      >
        <div
          className='absolute inset-0 flex items-center justify-center z-20'
          style={{ top: '30%', bottom: 'auto', height: 'auto' }}
        >
          <span className="font-medium text-5xl text-white/50 text-center">
            You bring the expertise.<br /> Velra brings the exposure.
          </span>
        </div>

        <img src={groupMenBlueUniforms} className="absolute inset-0 w-full h-full object-cover" alt="Group Men Blue Uniforms" />
        <img src={authImgUpper} className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="Auth Upper Overlay" />
        <img src={authImgLower} className='absolute -bottom-40 left-0 right-0 w-full' alt="Auth Lower Overlay" />
      </div>
    </div>
  );
};

export default ForgotPassword;