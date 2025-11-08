import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Mail, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, IconButton } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const HelpAndSupport = () => {
  const navigate = useNavigate();
  const [issueDescription, setIssueDescription] = useState('');
  const [helpImage, setHelpImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file select and convert to base64
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setHelpImage({
        name: file.name,
        imageBase64: reader.result.split(',')[1], // remove prefix
      });
    };
    reader.readAsDataURL(file);
  };

  // Submit API call
// ✅ FIXED: Send JSON instead of FormData
const handleSubmit = async () => {
  if (!issueDescription.trim()) {
    alert("Please describe your issue");
    return;
  }

  setIsSubmitting(true);

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Authentication token missing. Please login again.");
    setIsSubmitting(false);
    return;
  }

  const payload = {
    message: issueDescription,
    helpImage: helpImage
      ? {
          name: helpImage.name,
          imageBase64: helpImage.imageBase64,
        }
      : null,
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/vendor/support`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("✅ Your issue has been submitted successfully!");
      setIssueDescription("");
      setHelpImage(null);
    } else {
      alert(`⚠️ ${response.data.message || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error submitting support request:", error);
    console.error("Response data:", error.response?.data);
    alert(`❌ Failed: ${error.response?.data?.message || "Try again later"}`);
  } finally {
    setIsSubmitting(false);
  }
};


  const services = [
    { title: 'Technical Support', description: 'Get help with technical issues and troubleshooting' },
    { title: 'Account Management', description: 'Assistance with account settings and profile management' },
    { title: 'Billing & Payments', description: 'Help with billing inquiries and payment issues' },
    { title: 'General Inquiries', description: 'Any other questions or concerns you may have' },
  ];

  return (
    <Box className="p-3 sm:p-8 w-full h-full">
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pt: { xs: 1, sm: 0 }, mb: { xs: 3, sm: 4 } }}>
        <IconButton
          onClick={() => navigate('/my-profile/account-support')}
          sx={{
            mr: 1,
            p: 0,
            color: '#334155',
            '&:hover': { color: '#1D4ED8', backgroundColor: 'transparent' },
          }}
        >
          <ChevronLeft size={25} strokeWidth={3} />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#334155' }}>
          Help & Support
        </Typography>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div key="help-support-content" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
          <Box sx={{ mx: { xs: 2, sm: 3 } }}>
            {/* Services Offered */}
            <Box sx={{ mb: { xs: 6, sm: 8 } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: 'rgba(15,23,42,0.60)', mb: 2.2 }}
              >
                Services Offered
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, sm: 4 } }}>
                {services.map((service, index) => (
                  <motion.div key={index} variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                    <Box
                      sx={{
                        background: 'linear-gradient(140deg,rgba(255,255,255,0.85),rgba(255,255,255,0.70))',
                        borderRadius: '14px',
                        border: '1px solid rgba(148,163,184,0.30)',
                        p: { xs: 1.25, sm: 2.4 },
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#0f172a', mb: 0.75 }}>
                        {service.title}
                      </Typography>
                      <Typography sx={{ color: 'rgba(15,23,42,0.65)', fontSize: { xs: '.80rem', sm: '.875rem' } }}>
                        {service.description}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Issue Description */}
            <Box sx={{ mb: { xs: 4, sm: 6 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'rgba(15,23,42,0.70)', mb: 2 }}>
                What's the issue you're facing?
              </Typography>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe your issue here..."
                style={{
                  width: '100%',
                  height: '220px',
                  borderRadius: '14px',
                  border: '1px solid rgba(148,163,184,0.35)',
                  padding: '14px 16px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </Box>

            {/* Image Upload */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
              <label
                htmlFor="helpImage"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#2563EB',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <ImageIcon size={18} />
                {helpImage ? 'Change Image' : 'Attach Screenshot (Optional)'}
              </label>
              <input
                id="helpImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {helpImage && (
                <Typography variant="body2" sx={{ color: '#475569', mt: 1 }}>
                  📎 {helpImage.name}
                </Typography>
              )}
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 6, sm: 8 } }}>
              <button
                onClick={handleSubmit}
                disabled={!issueDescription.trim() || isSubmitting}
                style={{
                  padding: '12px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: 600,
                  color: 'white',
                  fontSize: '14px',
                  backgroundColor: !issueDescription.trim() || isSubmitting ? '#9CA3AF' : '#3B82F6',
                  cursor: !issueDescription.trim() || isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SAVE'}
              </button>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default HelpAndSupport;
