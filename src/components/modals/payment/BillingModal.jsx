import { useState } from 'react';
import { Box, Typography, Divider, Button, Modal, IconButton } from '@mui/material';
import { Check, X, User, Mail, Hash, Calculator, Percent, CreditCard, Phone } from 'lucide-react';
import { useUser } from '../../../UserContext';


const BillingModal = ({ open, onClose, onProceedToPayment }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  // Calculate billing details
  const serviceBasePrice = user.serviceBasePrice;
  const servicesCount = user.servicesCount;
  const subtotal = user.totalCost;
  const gstRate = user.gstRate;
  
  // Calculate discount based on services count
  let discountPercentage = 0;
  let discountAmount = 0;
  
  if (servicesCount >= user.discountUpperLimit) {
    discountPercentage = 20; // 20% discount for 5+ services
    discountAmount = subtotal * 0.20;
  } else if (servicesCount >= user.discountLowerLimit) {
    discountPercentage = 10; // 10% discount for 3+ services
    discountAmount = subtotal * 0.10;
  }
  
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = discountedSubtotal * gstRate;
  const finalAmount = discountedSubtotal + gstAmount;

  const handleProceedToPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onProceedToPayment?.();
    }, 1500);
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          backdropFilter: 'blur(20px)',
          // Hide scrollbar like in onboarding pages
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 4,
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', sm: '2rem' },
                mb: 0.5,
              }}
            >
              Billing Summary
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                fontSize: '0.95rem',
              }}
            >
              Review your subscription details
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              '&:hover': {
                background: 'rgba(239, 68, 68, 0.2)',
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Customer Information */}
        <Box sx={{ p: 4, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1e293b',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <User size={20} color="#3b82f6" />
            Customer Information
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <User size={16} color="#3b82f6" />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Name
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {user.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Hash size={16} color="#3b82f6" />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  User ID
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {user.id}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Phone size={16} color="#3b82f6" />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Contact
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {user.phone}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Mail size={16} color="#3b82f6" />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Email
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mx: 4, opacity: 0.6 }} />

        {/* Service Details */}
        <Box sx={{ p: 4, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1e293b',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Calculator size={20} color="#10b981" />
            Service Details
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.1)',
              }}
            >
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Services Selected
              </Typography>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {servicesCount} services
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.1)',
              }}
            >
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Charge per Service
              </Typography>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                ₹{serviceBasePrice.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ pl: 2, pr: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: 500 }}>
                Selected Services:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {user.whatYouOffer.map((service, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Check size={14} color="#10b981" />
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.9rem' }}>
                      {service}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mx: 4, opacity: 0.6 }} />

        {/* Billing Breakdown */}
        <Box sx={{ p: 4 }}>
          {/* Heading */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1e293b',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CreditCard size={20} color="#f59e0b" />
            Billing Breakdown
          </Typography>

          {/* Charge Calculation */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.1)',
              }}
            >
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                Subtotal ({servicesCount} services × ₹{serviceBasePrice.toLocaleString()})
              </Typography>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                ₹{subtotal.toLocaleString()}
              </Typography>
            </Box>

            {/* Discount Section - Only show if discount applies */}
            {discountPercentage > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(34, 197, 94, 0.05)',
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Check size={14} color="#22c55e" />
                  <Typography variant="body2" sx={{ color: '#16a34a', fontWeight: 500 }}>
                    Discount ({discountPercentage}% off for {servicesCount >= user.discountUpperLimit ? '5+' : '3+'} services)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#16a34a', fontWeight: 600 }}>
                  - ₹{discountAmount.toLocaleString()}
                </Typography>
              </Box>
            )}

            {/* Show discounted subtotal if discount applies */}
            {discountPercentage > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.1)',
                }}
              >
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  After Discount
                </Typography>
                <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                  ₹{discountedSubtotal.toLocaleString()}
                </Typography>
              </Box>
            )}

            {/* GST Calculation */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Percent size={14} color="#f59e0b" />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  GST ({(gstRate * 100).toFixed(0)}%)
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                + ₹{gstAmount.toLocaleString()}
              </Typography>
            </Box>

            <Divider sx={{ my: 1, opacity: 0.6 }} />

            {/* Total Price */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                color: 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total Amount
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                ₹{finalAmount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: '#d1d5db',
                color: '#6b7280',
                '&:hover': {
                  borderColor: '#9ca3af',
                  background: 'rgba(156, 163, 175, 0.1)',
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              sx={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                color: 'white',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                },
                '&:disabled': {
                  background: '#9ca3af',
                },
              }}
            >
              {isProcessing ? 'Processing...' : `Proceed to Payment (₹${finalAmount.toLocaleString()})`}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BillingModal;