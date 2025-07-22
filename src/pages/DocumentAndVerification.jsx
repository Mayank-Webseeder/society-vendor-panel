import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, IconButton } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../UserContext';

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const DocumentAndVerification = ({ title = "Document and Verification", route }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const file = user.idProofFile;

  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const fileInputRef = useRef();

  const handleAddNew = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setUploadedDocuments(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: file.name,
        fileUrl,
        fileType: 'pdf',
      }
    ]);
  };

  const handleDeleteDocument = (docId) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const handleSave = () => {
    setTimeout(() => navigate('/my-profile'), 2000);
  };

  return (
    <Box className='p-5 sm:p-8 w-full h-full'>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #E0E0E0',
        pb: 2,
        mb: 4
      }}>
        <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 'semibold', color: '#4A5568' }}>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Document & Verification
          </Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            Docs & Verification
          </Box>
        </Typography>
      </Box>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key="document-verification-content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className='relative'
          style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)' }}
        >
          {/* Preview the onboarding document if present */}
          {file && file instanceof File && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box sx={{ mb: 3 }}></Box>
                <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 1 }}>
                  ID Proof Uploaded During Onboarding
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {file.name}
                  </Typography>
                  {file.type === "application/pdf" ? (
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: '150px',
                        height: '110px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#F5F5F5',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <embed
                        src={URL.createObjectURL(file)}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: '100%',
                        maxWidth: '150px',
                        height: 'auto',
                        borderRadius: '4px',
                        objectFit: 'contain',
                        border: '1px solid #E0E0E0'
                      }}
                    />
                  )}
                </Box>
              {/* </Box> */}
            </motion.div>
          )}

          {/* Add New Button */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button
              variant="outlined"
              onClick={handleAddNew}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',
                textTransform: 'none',
                borderColor: '#E0E0E0',
                color: '#424242',
                borderRadius: '8px',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.75, sm: 1 },
                mx: { xs: 1, sm: 3 },
                mb: { xs: 3, sm: 5 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                fontWeight: 'medium',
                '&:hover': {
                  borderColor: '#C5C5C5',
                  bgcolor: '#f5f5f5',
                },
              }}
              startIcon={<Plus size={18} />}
            >
              Add New
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </motion.div>

          {/* Your Uploaded Documents Section */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ flex: 1 }}
          >
            <Box sx={{ mx: { xs: 1, sm: 3 }, mt: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='button' sx={{ fontWeight: 'medium', color: '#424242', mb: 2 }}>
                Your Uploaded Documents
              </Typography>
              {uploadedDocuments.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No documents uploaded yet.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {uploadedDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: '8px',
                          p: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative',
                          width: { xs: '100%', sm: 'auto' },
                          minWidth: '150px',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteDocument(doc.id)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                            p: 0.5,
                          }}
                        >
                          <Trash2 size={16} color="#757575" />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1, textAlign: 'center' }}>
                          {doc.name}
                        </Typography>
                        {doc.fileType === 'pdf' ? (
                          <Box
                            sx={{
                              width: '100%',
                              maxWidth: '150px',
                              height: '110px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: '#F5F5F5',
                              borderRadius: '4px',
                              overflow: 'hidden',
                            }}
                          >
                            <embed
                              src={doc.fileUrl}
                              type="application/pdf"
                              width="100%"
                              height="100%"
                            />
                          </Box>
                        ) : (
                          <img
                            src={doc.fileUrl}
                            alt={doc.name}
                            style={{
                              width: '100%',
                              maxWidth: '150px',
                              height: 'auto',
                              borderRadius: '4px',
                              objectFit: 'contain',
                            }}
                          />
                        )}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>

          {/* Save Button at bottom-center */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            mt: 'auto',
            py: { xs: 2, sm: 3 },
          }}>
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  py: { xs: '6px', sm: '8px' },
                  px: { xs: '16px', sm: '24px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#2563EB',
                  },
                  width: { xs: 100, sm: 120 },
                }}
              >
                Save
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default DocumentAndVerification;