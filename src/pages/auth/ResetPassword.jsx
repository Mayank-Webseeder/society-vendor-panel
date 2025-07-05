import { useState } from 'react';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import authImgLower from '../../assets/authImgLower.png';
import authImgUpper from '../../assets/authImgUpper.png';
import velraSymbol from '../../assets/velraSymbol.png';
import { Typography } from '@mui/material';

const ResetPassword = () => {
  // In a real app, email would come from context or params
  const [email] = useState('abc9@gmail.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    // Redirect to dashboard or login as needed
  };

  return (
    <div className="fixed inset-0 flex overflow-y-hidden">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white p-4 sm:p-8">
        {/* VELRA logo & Title */}
        <div className='flex gap-2 mb-16'>
          <img src={velraSymbol} alt="velra-symbol" />
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

        <form className="w-full max-w-md px-4" onSubmit={handleSubmit}>
          {/* Email Field (grayed out) */}
          <div className="mb-8">
            <label htmlFor="email" className="block text-[#1C1B1F]/[0.69] text-base font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-2 py-2 border-0 border-b-2 border-black/[0.12] rounded-none bg-gray-100 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-400 text-lg transition-colors"
            />
          </div>
          {/* New Password Field */}
          <div className="mb-8">
            <label htmlFor="password" className="block text-[#1C1B1F]/[0.69] text-base font-semibold mb-1">Create New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="w-full px-2 py-2 border-0 border-b-2 border-black/[0.12] rounded-none placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-400 text-gray-800 text-lg transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Info Text */}
          <p className="text-left font-medium text-sm text-[#4487AE] mb-8">
            Your new password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (e.g., @, #, $).
          </p>
          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className={`ml-2 text-sm ${rememberMe ? 'text-gray-700' : 'text-black/50'} cursor-pointer`}>
              Remember Me
            </label>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#56A9D9] text-lg text-white border-none font-bold py-2 rounded-md shadow-xl hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Log in
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className="relative w-1/2 h-full flex items-center justify-center">
        <div 
          className='absolute inset-0 flex items-center justify-center z-20' 
          style={{ top: '30%', bottom: 'auto', height: 'auto' }}
        >
          <span className="font-medium text-5xl text-white/50 text-center">
            You bring the expertise.<br/> Velra brings the exposure.
          </span>
        </div>

        <img src={groupMenBlueUniforms} className="absolute inset-0 w-full h-full object-cover" alt="Group Men Blue Uniforms" />
        <img src={authImgUpper} className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="Auth Upper Overlay" />
        <img src={authImgLower} className='absolute -bottom-40 left-0 right-0 w-full' alt="Auth Lower Overlay" />
      </div>
    </div>
  );
};

export default ResetPassword;