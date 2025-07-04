import { useState } from 'react';
import groupMenBlueUniforms from '../../assets/groupMenBlueUniforms.png';
import authImgLower from '../../assets/authImgLower.png';
import authImgUpper from '../../assets/authImgUpper.png';
import velraSymbol from '../../assets/velraSymbol.png';
import { Typography } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 flex">
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

        {/* Login / SignUp */}
        <div className="w-full max-w-md px-4">
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <SignUp onSwitch={() => setIsLogin(true)} />
          )}
        </div>
      </div>



      {/* Right: Image */}
      <div className="relative w-1/2 h-full">
        <img src={groupMenBlueUniforms} className="absolute inset-0 w-full h-full object-cover" alt="Group Men Blue Uniforms" />
        <img src={authImgUpper} className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="Auth Upper Overlay" />
        <img src={authImgLower} className='absolute -bottom-40 left-0 right-0 w-full' alt="Auth Lower Overlay" />
      </div>
    </div>
  );
};


export default AuthPage;