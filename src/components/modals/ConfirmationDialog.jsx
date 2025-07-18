import { Box, Typography, Button } from '@mui/material';


const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {

  if (!open) return null;



  return (
    <Box sx={{
      position: 'fixed', zIndex: 30, 
      top: 0, bottom: 0, left: {xs: '3rem', sm: '4rem', md: '5rem'}, right: 0,
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Box sx={{
        position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0
      }} />
      <Box sx={{
        position: 'relative', backgroundColor: 'white', border: '1px solid #6B7280', borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: '32px 24px', zIndex: 10, width: '100%', maxWidth: '23rem', overflowY: 'auto', maxHeight: '90vh'
      }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 800, fontSize: 22 }}>
          {title}
        </Typography>
        <Typography sx={{ mb: 3, textAlign: 'center' }}>{message}</Typography>
        <Box sx={{ display: 'flex', gap: 6, mt: 1, justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#56A9D9', '&:hover': { backgroundColor: 'primary.dark' } }}
            onClick={onConfirm}
          >Yes</Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: '#56A9D9', borderColor: '#56A9D9',
              '&:hover': { borderColor: '#1565c0', color: '#1565c0', backgroundColor: 'rgba(25, 118, 210, 0.04)' }
            }}
          >No</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationDialog;