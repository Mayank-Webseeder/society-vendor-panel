import { Box, Typography, Button } from "@mui/material";
import { IoClose, IoLockClosed } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AccessLockedModal = ({ open, onClose, heading, subheading }) => {
  const navigate = useNavigate();

  // Prevent background scroll while modal is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 50,
        top: 0,
        bottom: 0,
        left: { xs: "0rem", sm: "4rem", md: "5rem" },
        right: 0,
        width: "100%",
        height: { xs: "calc(100% - 3.48rem)", sm: "100%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1.5, sm: 0 },
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 0,
        }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          paddingX: { xs: "20px", md: "28px" },
          paddingY: { xs: "16px", md: "24px" },
          zIndex: 10,
          width: "100%",
          maxWidth: { xs: "100%", sm: "28rem" },
          overflowY: "auto",
          maxHeight: "90vh",
          // Centered fade/scale animation
          animation: "modalPop 200ms ease-out",
          "@keyframes modalPop": {
            "0%": { transform: "scale(0.98)", opacity: 0 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-locked-title"
      >
        {/* Close Icon */}
        {/* <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -40,
            zIndex: 20,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            backgroundColor: 'rgba(51, 109, 142, 0.5)',
            '&:hover': { backgroundColor: '#60A5FA' },
          }}
          onClick={onClose}
        >
          <IoClose size={25} color="#fff" />
        </Box> */}

        {/* Lock Icon and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            gap: 1.5,
          }}
        >
          <IoLockClosed size={28} color="#f59e0b" />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              color: "#111827",
              fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.75rem" },
            }}
            id="access-locked-title"
          >
            {heading}
          </Typography>
        </Box>

        {/* Modal Body */}
        <Typography
          variant="body1"
          sx={{
            marginBottom: { xs: "20px", md: "28px" },
            color: "#4b5563",
            lineHeight: 1.6,
            fontSize: { xs: "14px", md: "16px" },
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {subheading}
        </Typography>

        {/* What you'll get section */}
        <Box sx={{ marginBottom: { xs: "24px", md: "32px" } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              color: "#111827",
              marginBottom: { xs: "12px", md: "16px" },
              fontSize: { xs: "16px", md: "18px" },
            }}
          >
            What you'll get
          </Typography>
          <Box sx={{ paddingLeft: "8px" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                marginBottom: "8px",
                fontSize: { xs: "13px", md: "14px" },
                display: "flex",
                alignItems: "flex-start",
                "&:before": {
                  content: '"•"',
                  color: "#f59e0b",
                  marginRight: "8px",
                  lineHeight: "1.5",
                },
              }}
            >
              Access to all premium sections
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                marginBottom: "8px",
                fontSize: { xs: "13px", md: "14px" },
                display: "flex",
                alignItems: "flex-start",
                "&:before": {
                  content: '"•"',
                  color: "#f59e0b",
                  marginRight: "8px",
                  lineHeight: "1.5",
                },
              }}
            >
              Access verified society job requests
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: { xs: "13px", md: "14px" },
                display: "flex",
                alignItems: "flex-start",
                "&:before": {
                  content: '"•"',
                  color: "#f59e0b",
                  marginRight: "8px",
                  lineHeight: "1.5",
                },
              }}
            >
              Priority visibility in nearby societies
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "auto" },
              color: "#6b7280",
              borderRadius: "10px",
              borderColor: "#d1d5db",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "auto" },
              borderRadius: "10px",
              backgroundColor: "#3b82f6",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
            onClick={() => navigate("/payment")}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccessLockedModal;

// import { Box, Typography, Button } from '@mui/material';
// import { IoClose, IoLockClosed, IoSparkles } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';

// const AccessLockedModal = ({ open, onClose }) => {

//   const navigate = useNavigate();

//   if (!open) return null;

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         zIndex: 50,
//         top: 0,
//         bottom: 0,
//         left: { xs: '0rem', sm: '4rem', md: '5rem' },
//         right: 0,
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backdropFilter: 'blur(8px)',
//       }}
//     >
//       {/* Enhanced Overlay with gradient */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.8) 100%)',
//           zIndex: 0,
//         }}
//         onClick={onClose}
//       />

//       {/* Modal Content */}
//       <Box
//         sx={{
//           position: 'relative',
//           background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
//           borderRadius: '24px',
//           boxShadow: `
//             0 32px 64px -12px rgba(0, 0, 0, 0.25),
//             0 0 0 1px rgba(255, 255, 255, 0.05),
//             inset 0 1px 0 rgba(255, 255, 255, 0.1)
//           `,
//           padding: { xs: '32px 24px', md: '40px 32px' },
//           zIndex: 10,
//           width: '100%',
//           maxWidth: '420px',
//           overflowY: 'auto',
//           maxHeight: '90vh',
//           border: '1px solid rgba(226, 232, 240, 0.8)',
//           transform: 'translateY(0)',
//           animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
//           '@keyframes modalSlideIn': {
//             '0%': {
//               opacity: 0,
//               transform: 'translateY(-20px) scale(0.95)',
//             },
//             '100%': {
//               opacity: 1,
//               transform: 'translateY(0) scale(1)',
//             },
//           },
//         }}
//       >
//         {/* Close Button */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '16px',
//             right: '16px',
//             zIndex: 20,
//             borderRadius: '12px',
//             width: '36px',
//             height: '36px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             backgroundColor: 'rgba(148, 163, 184, 0.1)',
//             transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
//             '&:hover': {
//               backgroundColor: 'rgba(239, 68, 68, 0.1)',
//               transform: 'scale(1.05)',
//             },
//           }}
//           onClick={onClose}
//         >
//           <IoClose size={20} color="#64748b" />
//         </Box>

//         {/* Icon Section */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             marginBottom: '24px',
//           }}
//         >
//           <Box
//             sx={{
//               width: '80px',
//               height: '80px',
//               borderRadius: '24px',
//               background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               position: 'relative',
//               boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.4)',
//               '&::before': {
//                 content: '""',
//                 position: 'absolute',
//                 inset: '2px',
//                 borderRadius: '22px',
//                 background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
//                 zIndex: 1,
//               },
//             }}
//           >
//             <IoLockClosed size={36} color="#ffffff" style={{ zIndex: 2 }} />
//           </Box>
//         </Box>

//         {/* Header */}
//         <Typography
//           variant="h4"
//           sx={{
//             marginBottom: '12px',
//             fontWeight: '700',
//             fontSize: { xs: '24px', md: '28px' },
//             background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
//             backgroundClip: 'text',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             textAlign: 'center',
//             letterSpacing: '-0.025em',
//             lineHeight: 1.2,
//           }}
//         >
//           Premium Access Required
//         </Typography>

//         {/* Subtitle */}
//         <Typography
//           variant="body1"
//           sx={{
//             marginBottom: '32px',
//             color: '#64748b',
//             lineHeight: '1.6',
//             fontSize: '16px',
//             textAlign: 'center',
//             fontWeight: '400',
//           }}
//         >
//           Unlock premium features and exclusive content with a subscription
//         </Typography>

//         {/* Feature highlights */}
//         <Box
//           sx={{
//             marginBottom: '32px',
//             padding: '20px',
//             borderRadius: '16px',
//             background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
//             border: '1px solid rgba(59, 130, 246, 0.1)',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
//             <IoSparkles size={16} color="#3b82f6" />
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 fontWeight: '600',
//                 color: '#3b82f6',
//                 fontSize: '14px',
//               }}
//             >
//               What you'll get:
//             </Typography>
//           </Box>
//           <Typography
//             variant="body2"
//             sx={{
//               color: '#475569',
//               fontSize: '14px',
//               lineHeight: '1.5',
//             }}
//           >
//             • Access to all premium sections<br />
//             • Access verified society job requests<br />
//             • Priority visibility in nearby societies
//           </Typography>
//         </Box>

//         {/* Action Buttons */}
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//           <Button
//             variant="contained"
//             sx={{
//               background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
//               borderRadius: '12px',
//               padding: '14px 24px',
//               fontSize: '16px',
//               fontWeight: '600',
//               textTransform: 'none',
//               boxShadow: '0 8px 32px -8px rgba(59, 130, 246, 0.4)',
//               border: 'none',
//               transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 12px 40px -8px rgba(59, 130, 246, 0.5)',
//               },
//               '&:active': {
//                 transform: 'translateY(0)',
//               },
//             }}
//             onClick={() => navigate('/payment')}
//           >
//             Upgrade to Premium
//           </Button>

//           <Button
//             variant="text"
//             sx={{
//               borderRadius: '12px',
//               padding: '12px 24px',
//               fontSize: '14px',
//               fontWeight: '500',
//               textTransform: 'none',
//               color: '#64748b',
//               transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
//               '&:hover': {
//                 backgroundColor: 'rgba(148, 163, 184, 0.08)',
//                 color: '#475569',
//               },
//             }}
//             onClick={onClose}
//           >
//             Maybe later
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AccessLockedModal;

// import { Box, Typography, Button } from '@mui/material';
// import { IoClose } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';

// const AccessLockedModal = ({ open, onClose }) => {
//   const navigate = useNavigate();

//   if (!open) return null;

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         zIndex: 50,
//         top: 0,
//         bottom: 0,
//         left: { xs: '0rem', sm: '4rem', md: '5rem' },
//         right: 0,
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       {/* Overlay */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           zIndex: 0,
//         }}
//         onClick={onClose}
//       />

//       {/* Modal Content */}
//       <Box
//         sx={{
//           position: 'relative',
//           backgroundColor: 'white',
//           border: '1px solid #6B7280',
//           borderRadius: '8px',
//           boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
//           paddingX: { xs: '20px', md: '24px' },
//           paddingY: { xs: '16px', md: '20px' },
//           zIndex: 10,
//           width: '100%',
//           maxWidth: '32rem',
//           overflowY: 'auto',
//           maxHeight: '90vh',
//         }}
//       >
//         {/* Close Icon */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: -50,
//             right: -40,
//             zIndex: 20,
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//             backgroundColor: 'rgba(51, 109, 142, 0.5)',
//             '&:hover': { backgroundColor: '#60A5FA' },
//           }}
//           onClick={onClose}
//         >
//           <IoClose size={25} color="#fff" />
//         </Box>

//         {/* Modal Header */}
//         <Typography
//           variant="h5"
//           sx={{
//             marginBottom: '20px',
//             fontWeight: '500',
//             color: '#1a202c',
//             textAlign: 'center',
//           }}
//         >
//           Access Locked
//         </Typography>

//         {/* Modal Body */}
//         <Typography
//           variant="body1"
//           sx={{
//             marginBottom: '24px',
//             color: '#6B7280',
//             lineHeight: '1.625',
//             fontSize: '14px',
//             textAlign: 'center',
//           }}
//         >
//           Subscribe to unlock all premium features and gain access to this section.
//         </Typography>

//         {/* Action Buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
//           <Button
//             variant="outlined"
//             color="error"
//             sx={{ flex: 1 }}
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ flex: 1 }}
//             onClick={() => navigate('/payment')}
//           >
//             Subscribe
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AccessLockedModal;
