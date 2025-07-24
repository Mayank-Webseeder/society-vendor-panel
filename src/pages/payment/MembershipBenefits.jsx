import { Box, Typography, Button } from '@mui/material';
import { Check, Star, Shield, Zap, Users, Award } from 'lucide-react';

const MembershipBenefits = () => {
  const benefits = [
    {
      icon: <Users size={18} />,
      text: 'Access verified society job requests',
      highlight: 'verified'
    },
    {
      icon: <Star size={18} />,
      text: 'Priority visibility in nearby societies',
      highlight: 'Priority'
    },
    {
      icon: <Shield size={18} />,
      text: 'Build trust with a verified vendor',
      highlight: 'trust'
    },
    {
      icon: <Zap size={18} />,
      text: 'Direct leads from residential communities',
      highlight: 'Direct leads'
    },
    {
      icon: <Award size={18} />,
      text: 'Yearly membership at just ₹999',
      highlight: '₹999'
    },
  ];

  const handleSubscribe = () => {
    console.log("Subscribe Now clicked!");
  };

  return (
    <Box
      sx={{
        // border: '2px solid green',
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: 'Inter, sans-serif',
        p: { xs: 3, sm: 4, md: 5 },
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(86, 169, 217, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(86, 169, 217, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(86, 169, 217, 0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* VELRA Title Section */}
      <Box sx={{ mb: 4, zIndex: 10 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem' },
            fontWeight: 800,
            background: 'linear-gradient(135deg, #56A9D9 0%, #4A8BB0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            textAlign: 'left',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 8px rgba(86, 169, 217, 0.2)',
          }}
        >
          VELRA
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
            color: '#64748b',
            mb: 1,
            textAlign: 'left',
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          Just ₹999/year. One payment. Full access.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            color: '#94a3b8',
            textAlign: 'left',
            fontWeight: 400,
          }}
        >
          No hassle.
        </Typography>
      </Box>

      {/* Main Content Card */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          p: { xs: 3, sm: 4 },
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          mb: 3,
          zIndex: 10,
        }}
      >
        {/* Get Started Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1e293b',
              mb: 1,
              textAlign: 'left',
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              lineHeight: 1.2,
            }}
          >
            Get Started with
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #56A9D9 0%, #4A8BB0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Vendor Gold Membership
            </Box>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              mb: 3,
              textAlign: 'left',
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.1rem' },
            }}
          >
            One plan. All benefits.
          </Typography>
        </Box>

        {/* Why Join Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#1e293b',
              mb: 3,
              textAlign: 'left',
              fontSize: { xs: '1.25rem', sm: '1.4rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #56A9D9 0%, #4A8BB0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Star size={16} color="white" />
            </Box>
            Why Join?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {benefits.map((benefit, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(86, 169, 217, 0.02)',
                  border: '1px solid rgba(86, 169, 217, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(86, 169, 217, 0.05)',
                    border: '1px solid rgba(86, 169, 217, 0.2)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #56A9D9 0%, #4A8BB0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    flexShrink: 0,
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    color: '#334155',
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {benefit.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* No Hidden Charges */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 4,
            p: 2,
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          <Check size={16} color="#22c55e" />
          <Typography
            variant="body2"
            sx={{
              color: '#16a34a',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            No hidden charges • 100% transparent pricing
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        {/* Subscribe Button */}
        <Button
          variant="contained"
          onClick={handleSubscribe}
          sx={{
            py: { xs: 2, sm: 2.5 },
            px: { xs: 4, sm: 6 },
            background: 'linear-gradient(135deg, #56A9D9 0%, #4A8BB0 100%)',
            color: 'white',
            fontWeight: 600,
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(86, 169, 217, 0.3)',
            textTransform: 'none',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            position: 'relative',
            overflow: 'hidden',
            zIndex: 10,
            '&:hover': {
              background: 'linear-gradient(135deg, #4A8BB0 0%, #387091 100%)',
              boxShadow: '0 12px 40px rgba(86, 169, 217, 0.4)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0px)',
            },
            width: { xs: '100%', sm: 'auto' },
            maxWidth: '320px',
            alignSelf: 'flex-start',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Subscribe Now!
            <Zap size={20} />
          </Box>
        </Button>
      </Box>
      

      {/* Bottom decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(86, 169, 217, 0.1) 0%, rgba(86, 169, 217, 0.05) 100%)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          right: 100,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'rgba(86, 169, 217, 0.1)',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default MembershipBenefits;