import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, IconButton } from '@mui/material';
import { Plus, Trash2, FileText, UploadCloud, ShieldCheck } from 'lucide-react';
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
    <div className='relative w-full h-full px-4 sm:px-8 pt-4 sm:pt-6 pb-12'>
      {/* Heading */}
      <div className="flex flex-col gap-1 mb-8">
        <h2 style={{ fontFamily: 'Manrope' }} className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Document & Verification</h2>
        <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500">Manage identity proofs & supporting documents</p>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key='document-verification-content'
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='flex flex-col gap-10 max-w-5xl'
        >
          {/* Onboarding Doc Card */}
          {file && file instanceof File && (
            <motion.div
              key='onboarding-doc'
              variants={contentVariants}
              className='relative bg-white/75 backdrop-blur-lg rounded-2xl border border-slate-200 px-5 sm:px-7 pt-6 pb-6 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden'
            >
              <div className='absolute -top-16 -right-10 w-64 h-64 bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none' />
              <div className='absolute top-0 left-0 h-1.5 w-44 bg-gradient-to-r from-indigo-500 via-blue-500 to-transparent rounded-br-full' />
              <div className='flex items-start gap-4 mb-5'>
                <div className='p-3 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-inner ring-1 ring-white/30'>
                  <ShieldCheck size={22} />
                </div>
                <div className='flex flex-col'>
                  <h3 className='text-lg sm:text-xl font-semibold tracking-tight text-slate-800'>Onboarding ID Proof</h3>
                  <p className='text-xs sm:text-sm text-slate-500 mt-1'>Stored during initial verification</p>
                </div>
              </div>
              <div className='flex items-start gap-5 flex-wrap'>
                <div className='flex flex-col gap-2'>
                  <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Filename</span>
                  <span className='text-xs sm:text-sm font-medium text-slate-700 break-all'>{file.name}</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Preview</span>
                  {file.type === 'application/pdf' ? (
                    <div className='w-[140px] h-[110px] bg-slate-50/80 border border-slate-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center'>
                      <embed src={URL.createObjectURL(file)} type='application/pdf' width='100%' height='100%' />
                    </div>
                  ) : (
                    <img src={URL.createObjectURL(file)} alt={file.name} className='w-[140px] h-[110px] object-contain bg-slate-50/80 border border-slate-200 rounded-lg shadow-inner' />
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Type</span>
                  <span className='px-2 py-1 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200 w-fit'>{file.type === 'application/pdf' ? 'PDF' : 'Image'}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upload & Documents Card */}
          <motion.div
            key='upload-card'
            variants={contentVariants}
            className='relative bg-white/75 backdrop-blur-lg rounded-2xl border border-slate-200 px-5 sm:px-7 pt-6 pb-8 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden'
          >
            <div className='absolute -top-20 -left-16 w-72 h-72 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 rounded-full blur-3xl opacity-60 pointer-events-none' />
            <div className='absolute top-0 left-0 h-1.5 w-40 bg-gradient-to-r from-blue-600 via-indigo-500 to-transparent rounded-br-full' />
            <div className='flex items-start justify-between gap-4 mb-6 flex-wrap'>
              <div className='flex items-start gap-4'>
                <div className='p-3 z-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-inner ring-1 ring-white/30'>
                  <UploadCloud size={22} />
                </div>
                <div className='flex flex-col'>
                  <h3 className='text-lg z-10 sm:text-xl font-semibold tracking-tight text-slate-800'>Upload Additional Documents</h3>
                  <p className='text-xs z-10 sm:text-sm text-slate-500 mt-1'>Accepted format: PDF (max 10MB)</p>
                </div>
              </div>
              <div className='flex'>
                <Button
                  onClick={handleAddNew}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 2.6,
                    py: 1.1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    letterSpacing: 0.4,
                    background: 'linear-gradient(90deg,#4F46E5,#2563EB)',
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px -6px rgba(59,130,246,0.5),0 2px 6px rgba(0,0,0,0.08)',
                    '&:hover': { filter: 'brightness(1.07)', boxShadow: '0 10px 24px -6px rgba(59,130,246,0.6),0 3px 8px rgba(0,0,0,0.10)' }
                  }}
                  startIcon={<Plus size={16} />}
                >
                  Add PDF
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='application/pdf'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Dropzone (basic) */}
            <div
              onClick={handleAddNew}
              className='group relative border-2 border-dashed border-slate-300/70 hover:border-indigo-400 rounded-2xl px-6 py-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer bg-gradient-to-br from-white/60 to-white/40 backdrop-blur'
            >
              <div className='flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-inner ring-1 ring-white/30 mb-4'>
                <FileText size={28} />
              </div>
              <p className='text-sm font-semibold text-slate-700 mb-1'>Click to upload a PDF</p>
              <p className='text-xs text-slate-500'>We currently support PDF documents up to 10MB.</p>
              <span className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-50/70 via-blue-50/60 to-cyan-50/60 pointer-events-none' />
            </div>

            {/* Uploaded Docs Grid */}
            <div className='mt-8'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='inline-block w-1.5 h-1.5 rounded-full bg-indigo-500' />
                <p className='text-[11px] sm:text-xs font-semibold tracking-wide text-slate-600 uppercase'>Your Uploaded Documents ({uploadedDocuments.length})</p>
              </div>
              {uploadedDocuments.length === 0 ? (
                <p className='text-xs text-slate-500 italic'>No documents uploaded yet.</p>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                  {uploadedDocuments.map(doc => (
                    <motion.div
                      key={doc.id}
                      variants={contentVariants}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      className='group relative rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition overflow-hidden'
                    >
                      <span className='absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-50/80 via-blue-50/70 to-sky-50/70 pointer-events-none' />
                      <IconButton
                        size='small'
                        onClick={() => handleDeleteDocument(doc.id)}
                        sx={{ position: 'absolute', top: 6, right: 6, zIndex: 10, background: 'rgba(255,255,255,0.85)', '&:hover': { background: 'rgba(255,255,255,1)' } }}
                      >
                        <Trash2 size={15} className='text-slate-500' />
                      </IconButton>
                      <div className='relative flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                          <div className='w-8 h-8 rounded-md flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-inner ring-1 ring-white/30'>
                            <FileText size={16} />
                          </div>
                          <span className='text-[11px] font-medium text-slate-700 line-clamp-2 break-all'>{doc.name}</span>
                        </div>
                        <div className='w-full h-[110px] bg-slate-50/80 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center'>
                          <embed src={doc.fileUrl} type='application/pdf' width='100%' height='100%' />
                        </div>
                        <div className='flex items-center justify-between mt-1'>
                          <span className='px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-[10px] font-semibold'>PDF</span>
                          <span className='text-[10px] text-slate-400 font-medium tracking-wide'>Secure</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className='flex justify-end mt-10'>
              <Button
                onClick={handleSave}
                sx={{
                  px: 4,
                  py: 1.2,
                  background: 'linear-gradient(90deg,#059669,#10B981)',
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  borderRadius: '12px',
                  boxShadow: '0 8px 22px -8px rgba(16,185,129,0.5),0 2px 6px rgba(0,0,0,0.06)',
                  '&:hover': { filter: 'brightness(1.07)', boxShadow: '0 12px 28px -10px rgba(16,185,129,0.55),0 3px 8px rgba(0,0,0,0.10)' }
                }}
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DocumentAndVerification;