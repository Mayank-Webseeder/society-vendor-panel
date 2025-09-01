import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import {
  Check,
  X,
  User,
  Mail,
  Hash,
  Calculator,
  Percent,
  CreditCard,
  Phone,
} from "lucide-react";
import { useUser } from "../../../UserContext";

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
    discountAmount = subtotal * 0.2;
  } else if (servicesCount >= user.discountLowerLimit) {
    discountPercentage = 10; // 10% discount for 3+ services
    discountAmount = subtotal * 0.1;
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: { xs: "16px", sm: "24px" },
          boxShadow: {
            xs: "0 16px 30px -12px rgba(0,0,0,0.2)",
            sm: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
          border: "1px solid rgba(226, 232, 240, 0.8)",
          maxWidth: { xs: "92vw", sm: "500px" },
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          backdropFilter: "blur(20px)",
          // Hide scrollbar like in onboarding pages
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            pb: { xs: 1, sm: 2 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
            position: { xs: "sticky", sm: "static" },
            top: 0,
            zIndex: 5,
            background: { xs: "rgba(255,255,255,0.85)", sm: "transparent" },
            backdropFilter: { xs: "blur(6px)", sm: "none" },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", sm: "2rem" },
                mb: 0.5,
              }}
            >
              Billing Summary
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontSize: { xs: "0.9rem", sm: "0.95rem" },
              }}
            >
              Review your subscription details
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              "&:hover": {
                background: "rgba(239, 68, 68, 0.2)",
              },
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
            aria-label="Close"
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Customer Information */}
        <Box sx={{ p: { xs: 3, sm: 4 }, pb: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <User size={20} color="#3b82f6" />
            Customer Information
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mb: { xs: 2, sm: 3 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <User size={16} color="#3b82f6" />
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontWeight: 500 }}
                >
                  Name
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                {user.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Hash size={16} color="#3b82f6" />
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontWeight: 500 }}
                >
                  User ID
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                {user.id}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Phone size={16} color="#3b82f6" />
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontWeight: 500 }}
                >
                  Contact
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                {user.phone}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Mail size={16} color="#3b82f6" />
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontWeight: 500 }}
                >
                  Email
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mx: { xs: 2, sm: 4 }, opacity: 0.6 }} />

        {/* Service Details */}
        <Box sx={{ p: { xs: 3, sm: 4 }, pb: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Calculator size={20} color="#10b981" />
            Service Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mb: { xs: 2, sm: 3 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.05)",
                border: "1px solid rgba(16, 185, 129, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Services Selected
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                {servicesCount} services
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.05)",
                border: "1px solid rgba(16, 185, 129, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Charge per Service
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                ₹{serviceBasePrice.toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{
                pl: { xs: 1.5, sm: 2 },
                pr: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#64748b", mb: 1, fontWeight: 500 }}
              >
                Selected Services:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                {user.whatYouOffer.map((service, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Check size={14} color="#10b981" />
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: "0.9rem" }}
                    >
                      {service}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mx: { xs: 2, sm: 4 }, opacity: 0.6 }} />

        {/* Billing Breakdown */}
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Heading */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CreditCard size={20} color="#f59e0b" />
            Billing Breakdown
          </Typography>

          {/* Charge Calculation */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mb: { xs: 3, sm: 4 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.05)",
                border: "1px solid rgba(245, 158, 11, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#64748b", fontWeight: 500 }}
              >
                Subtotal ({servicesCount} services × ₹
                {serviceBasePrice.toLocaleString()})
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                ₹{subtotal.toLocaleString()}
              </Typography>
            </Box>

            {/* Discount Section - Only show if discount applies */}
            {discountPercentage > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: "12px",
                  background: "rgba(34, 197, 94, 0.05)",
                  border: "1px solid rgba(34, 197, 94, 0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Check size={14} color="#22c55e" />
                  <Typography
                    variant="body2"
                    sx={{ color: "#16a34a", fontWeight: 500 }}
                  >
                    Discount ({discountPercentage}% off for{" "}
                    {servicesCount >= user.discountUpperLimit ? "5+" : "3+"}{" "}
                    services)
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#16a34a", fontWeight: 600 }}
                >
                  - ₹{discountAmount.toLocaleString()}
                </Typography>
              </Box>
            )}

            {/* Show discounted subtotal if discount applies */}
            {discountPercentage > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: "12px",
                  background: "rgba(245, 158, 11, 0.05)",
                  border: "1px solid rgba(245, 158, 11, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontWeight: 500 }}
                >
                  After Discount
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#1e293b", fontWeight: 600 }}
                >
                  ₹{discountedSubtotal.toLocaleString()}
                </Typography>
              </Box>
            )}

            {/* GST Calculation */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 1.5, sm: 2 },
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.05)",
                border: "1px solid rgba(245, 158, 11, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Percent size={14} color="#f59e0b" />
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontWeight: 500 }}
                >
                  GST ({(gstRate * 100).toFixed(0)}%)
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#1e293b", fontWeight: 600 }}
              >
                + ₹{gstAmount.toLocaleString()}
              </Typography>
            </Box>

            <Divider sx={{ my: { xs: 0.5, sm: 1 }, opacity: 0.6 }} />

            {/* Total Price */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 2, sm: 3 },
                borderRadius: { xs: "12px", sm: "16px" },
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Total Amount
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                ₹{finalAmount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, sm: 2 },
              justifyContent: { xs: "stretch", sm: "flex-end" },
              flexDirection: { xs: "column-reverse", sm: "row" },
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: "#d1d5db",
                color: "#6b7280",
                p: 1,
                borderRadius: '8px',
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  borderColor: "#9ca3af",
                  background: "rgba(156, 163, 175, 0.1)",
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
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                color: "white",
                fontWeight: 600,
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 1 },
                borderRadius: '8px',
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
                },
                "&:disabled": {
                  background: "#9ca3af",
                },
              }}
            >
              {isProcessing
                ? "Processing..."
                : `Proceed to Payment (₹${finalAmount.toLocaleString()})`}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BillingModal;