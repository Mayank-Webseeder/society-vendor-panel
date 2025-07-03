import { Box, Typography } from '@mui/material';
import { Check, Lock, ChevronRight } from 'lucide-react'; // Using Lucide icons: Check for tick, Lock for lock
import paymentpageRectangle from '../../assets/paymentpageRectangle.png';
import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.png';
import bhimUpi from '../../assets/bhimUpi.png';
import paytm from '../../assets/paytm.png';
import phonepe from '../../assets/phonepe.png';
import amazonPay from '../../assets/amazonPay.png';
import googlePay from '../../assets/googlePay.png';



const PaymentMethod = ({ onUpiClick }) => {

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
        // border: '2px solid red',
        width: '100%', // Occupy full width of parent
        height: '100%', // Occupy full height of parent
        display: 'flex',
        flexDirection: 'column',
        // m:3,
        bgcolor: '#387091', // Dark bluish background from the image
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box', // Include padding in width/height
        p: { xs: 2, sm: 4 }, // Responsive padding
        overflowY: 'auto', // Enable scrolling if content exceeds height
        borderRadius: 5
      }}
    >

      <img src={paymentpageRectangle} className='absolute right-0  bottom-0 h-96 w-96' />


      {/* Top Section: Choose how to pay */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 3 } }}>
        {/* Header Checkmark: Check icon inside a colored circular box */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32, // Size of the circular background
            height: 32, // Size of the circular background
            borderRadius: '50%',
            bgcolor: '#56A9D9', // Changed background color to #56A9D9
            mr: '12px',
          }}
        >
          <Check size={21} color="white" strokeWidth={4} /> {/* Increased strokeWidth for thicker checkmark */}
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            Choose how to pay
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              color: 'rgba(255, 255, 255, 0.76)',
              opacity: 0.8,
            }}
          >
            Your payment is encrypted.
          </Typography>
        </Box>
      </Box>

      {/* Include in plan section */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem' },
          fontWeight: 'medium',
          color: 'white',
          mb: { xs: 1.5, sm: 1.5 },
          ml: { xs: 2, sm: 4 },
        }}
      >
        Include in plan
      </Typography>

      <Box sx={{ mb: { xs: 3, sm: 5 }, ml: { xs: 2, sm: 4 }, }}>
        {planBenefits.map((benefit, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {/* Benefits List Checkmarks: Simple Check icon with specified color */}
            <Check size={18} color="#56A9D9" strokeWidth={3} style={{ marginRight: '8px' }} /> {/* Increased strokeWidth */}
            <Typography variant="body1" sx={{ color: 'white', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {benefit}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* End-to-end encrypted label */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 1 } }}>
        <Typography
          variant="body2"
          sx={{
            color: 'white',
            opacity: 0.7,
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            mr: 1,
          }}
        >
          End-to-end encrypted
        </Typography>
        {/* Lock Icon: Changed color to yellow */}
        <Lock size={16} color="yellow" style={{ opacity: 0.7 }} /> {/* Color remains yellow */}
      </Box>

      {/* Payment Method Cards */}
      <Box sx={{ flexGrow: 1, zIndex:50, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
        {/* Credit or Debit Card */}
        <Box
          onClick={() => handlePaymentMethodClick('Credit or Debit Card')}
          sx={{
            bgcolor: 'white',
            borderRadius: '12px',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#212121', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              Credit or Debit Card
            </Typography>
            <ChevronRight size={24} color="#616161" />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Placeholder for Visa logo */}
            <img
              src={visa}
              alt="Visa"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=VISA"; }}
            />
            {/* Placeholder for Mastercard logo */}
            <img
              src={mastercard}
              alt="Mastercard"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=MC"; }}
            />
          </Box>
        </Box>

        {/* UPI AutoPay */}
        <Box
          onClick={() => handlePaymentMethodClick('UPI AutoPay')}
          sx={{
            bgcolor: 'white',
            borderRadius: '12px',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#212121', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              UPI AutoPay
            </Typography>
            <ChevronRight size={24} color="#616161" />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {/* Placeholders for UPI logos */}
            <img
              src={bhimUpi}
              alt="BHIM"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=BHIM"; }}
            />
            <img
              src={paytm}
              alt="Paytm"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=Paytm"; }}
            />
            <img
              src={phonepe}
              alt="PhonePe"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=PhonePe"; }}
            />
            <img
              src={amazonPay}
              alt="Amazon Pay"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=AmazonPay"; }}
            />
            <img
              src={googlePay}
              alt="Google Pay"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x30/E0E0E0/FFFFFF?text=GPay"; }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


export default PaymentMethod;