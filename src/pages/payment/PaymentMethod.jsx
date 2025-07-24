import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';
import { Check, Lock, ChevronRight, Shield, CreditCard, Smartphone } from 'lucide-react';
import { IoClose } from "react-icons/io5";
import paymentpageRectangle from '../../assets/paymentpageRectangle.png';
import visa from '../../assets/logos/visa.svg';
import mastercard from '../../assets/logos/mastercard.svg';
import bhim from '../../assets/logos/bhim.svg';
import paytm from '../../assets/logos/paytm.svg';
import phonepe from '../../assets/logos/phonepe.svg';
import amazonpay from '../../assets/logos/amazonpay.svg';
import gpay from '../../assets/logos/gpay.svg';

const PaymentMethod = ({ onUpiClick }) => {
  const navigate = useNavigate();

  const planBenefits = [
    'Society job requests',
    'Priority listing in local societies',
    'Verified vendor status',
  ];

  const handlePaymentMethodClick = (method) => {
    if (method === 'UPI AutoPay' && onUpiClick) {
      onUpiClick();
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%', // Ensure it stretches to fill the parent container
        display: 'flex',
        flexDirection: 'column', // Allow content to stack vertically
        background: 'linear-gradient(135deg, #2C5F7F 0%, #387091 50%, #4A8BB0 100%)',
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box',
        p: { xs: 3, sm: 4, md: 5 },
        overflowY: 'auto',
        borderRadius: 5,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(86, 169, 217, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Close Button */}
      <button
        className='absolute right-4 top-4 h-fit bg-white/10 backdrop-blur-sm p-2 flex justify-center items-center border-none rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 cursor-pointer z-50'
        onClick={() => navigate('/dashboard')}
      >
        <IoClose color='white' size={24} />
      </button>

      {/* Background Decoration */}
      <img 
        src={paymentpageRectangle} 
        className='absolute right-0 bottom-0 h-80 w-80 opacity-20' 
        alt="decoration"
      />

      {/* Header Section */}
      <Box sx={{ mb: 4, zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #56A9D9 0%, #4A8BB0 100%)',
              mr: 3,
              boxShadow: '0 4px 20px rgba(86, 169, 217, 0.3)',
            }}
          >
            <Check size={24} color="white" strokeWidth={3} />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              Choose Payment Method
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Shield size={16} color="rgba(255, 255, 255, 0.8)" />
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                }}
              >
                Secure & encrypted payment
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Plan Benefits Section */}
      <Box 
        sx={{ 
          mb: 4, 
          zIndex: 10,
          bgcolor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          p: 3,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600,
            color: 'white',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Check size={20} color="#56A9D9" />
          What's included in your plan
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {planBenefits.map((benefit, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#56A9D9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <Check size={12} color="white" strokeWidth={3} />
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  fontWeight: 500,
                }}
              >
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Security Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, zIndex: 10 }}>
        <Lock size={16} color="rgba(255, 215, 0, 0.9)" />
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            ml: 1,
            fontWeight: 500,
          }}
        >
          End-to-end encrypted • 256-bit SSL protection
        </Typography>
      </Box>

      {/* Payment Methods */}
      <Box sx={{ flexGrow: 1, zIndex: 40, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Credit/Debit Card */}
        <Box
          onClick={() => handlePaymentMethodClick('Credit or Debit Card')}
          sx={{
            bgcolor: 'white',
            borderRadius: '16px',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
              border: '1px solid #56A9D9',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  bgcolor: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCard size={20} color="#6B7280" />
              </Box>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#1F2937', 
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    mb: 0.5,
                  }}
                >
                  Credit or Debit Card
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6B7280', 
                    fontSize: '0.875rem',
                  }}
                >
                  Visa, Mastercard & more
                </Typography>
              </Box>
            </Box>
            <ChevronRight size={24} color="#9CA3AF" />
          </Box>
          
          <Divider sx={{ mb: 2, opacity: 0.6 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <img src={visa} alt="Visa" className='h-9' />
            <img src={mastercard} alt="Mastercard" className='h-9' />
            <Typography variant="body2" sx={{ color: '#9CA3AF', ml: 1 }}>
              & more
            </Typography>
          </Box>
        </Box>

        {/* UPI AutoPay */}
        <Box
          onClick={() => handlePaymentMethodClick('UPI AutoPay')}
          sx={{
            bgcolor: 'white',
            borderRadius: '16px',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
              border: '1px solid #56A9D9',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  bgcolor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Smartphone size={20} color="#D97706" />
              </Box>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#1F2937', 
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    mb: 0.5,
                  }}
                >
                  UPI AutoPay
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6B7280', 
                    fontSize: '0.875rem',
                  }}
                >
                  Pay with any UPI app
                </Typography>
              </Box>
            </Box>
            <ChevronRight size={24} color="#9CA3AF" />
          </Box>
          
          <Divider sx={{ mb: 2, opacity: 0.6 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
            <img src={bhim} alt="BHIM" className='h-7 pt-2' />
            <img src={paytm} alt="Paytm" className='h-5' />
            <img src={phonepe} alt="PhonePe" className='h-7' />
            <img src={amazonpay} alt="Amazon Pay" className='h-6 pt-1' />
            <img src={gpay} alt="Google Pay" className='h-6' />
            <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
              +10 more
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Spacer Box */}
      <div className='flex-grow h-64 my-3'></div>

      {/* Footer Security Info */}
      <Box 
        sx={{ 
          mt: 3, 
          p: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 10,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.8rem',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          🔒 Your payment information is secure and encrypted. We never store your card details.
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentMethod;