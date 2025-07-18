import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, IconButton } from '@mui/material';


const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};


const HelpAndSupport = () => {

  const navigate = useNavigate();

  const [issueDescription, setIssueDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!issueDescription.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your issue has been submitted successfully!');
      setIssueDescription('');
    }, 1500);
  };

  const services = [
    {
      title: 'Technical Support',
      description: 'Get help with technical issues and troubleshooting'
    },
    {
      title: 'Account Management',
      description: 'Assistance with account settings and profile management'
    },
    {
      title: 'Billing & Payments',
      description: 'Help with billing inquiries and payment issues'
    },
    {
      title: 'General Inquiries',
      description: 'Any other questions or concerns you may have'
    }
  ];

  return (
    <Box 
        sx={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            width: '100%',
            height: '100%',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 3 },
            mb: 1
        }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 3 } }}>
        <IconButton onClick={() => navigate('/my-profile/account-support')} sx={{ mr: 2, p: 0 }}>
            <ChevronLeft size={32} strokeWidth={3} color="rgba(0,0,0,0.65)" />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.65)' }}>
            Help & Support
        </Typography>
      </Box>

      <AnimatePresence mode='wait'>
        <motion.div
          key='help-support-content'
          variants={contentVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {/* Main Content */}
          <Box sx={{ px: { xs: 2, sm: 4 }}}>
            {/* Services Offered Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-gray-600 mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border-solid border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                  >
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Issue Description Section */}
            <motion.div 
              className="mb-8"
              variants={contentVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <h2 className="text-xl font-semibold text-gray-600 mb-4">What's the issue you're facing?</h2>
              <div className="bg-white rounded-lg border-solid border border-gray-200">
                <textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Describe your issue here..."
                  className="w-full bg-white rounded-lg h-96 p-6 border-0 resize-none focus:outline-none focus:ring-0 placeholder-gray-400"
                  rows={12}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="flex justify-center mb-12"
              variants={contentVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <button
                onClick={handleSubmit}
                disabled={!issueDescription.trim() || isSubmitting}
                className={`px-8 py-3 rounded-lg border-none font-semibold text-white transition-all ${
                  !issueDescription.trim() || isSubmitting
                    ? 'bg-gray-400'
                    : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer'
                }`}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SAVE'}
              </button>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center text-gray-600 mb-2">
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-medium">Call us</span>
                </div>
                <a 
                  href="tel:+919999999999" 
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors no-underline"
                >
                  +91 999 999 9999
                </a>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center text-gray-600 mb-2">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-medium">Email</span>
                </div>
                <a 
                  href="mailto:abc99@gmail.com" 
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors no-underline"
                >
                  abc99@gmail.com
                </a>
              </div>
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default HelpAndSupport;