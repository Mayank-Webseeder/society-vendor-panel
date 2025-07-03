import React from 'react';
import { Paper, Typography, Button, Box, IconButton } from '@mui/material';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react'; // Using Lucide icons for consistency

const DocumentAndVerification = ({ title = "Document and Verification", route }) => {
    // Dummy document data for demonstration
    const uploadedDocuments = [
        {
            id: 'aadhar',
            name: 'Aadhar Card',
            imageUrl: 'https://placehold.co/180x110/E0E0E0/FFFFFF?text=Aadhar+Card', // Placeholder image
        },
        // Add more dummy documents if needed
    ];

    const handleAddNew = () => {
        console.log("Add New Document clicked");
        // Implement logic to open file uploader or navigate
    };

    const handleDeleteDocument = (docId) => {
        console.log(`Delete document with ID: ${docId}`);
        // Implement logic to remove document
    };

    const handleSave = () => {
        console.log("Save button clicked");
        // Implement save logic
    };

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px', // Ensure rounded corners are applied
                width: '100%', // Responsive width
                maxWidth: { xs: '100%', sm: '500px', md: '600px' }, // Example max-width for larger screens
                p: { xs: 2, sm: 3 }, // Responsive padding
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 }, // Responsive spacing between sections
                // mx: 'auto', // Center the card
                ml: 4,
                mb: 5
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                <IconButton sx={{ mr: 1, p: 0 }}>
                    <ChevronLeft size={20} color="#424242" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#424242' }}>
                    {title}
                </Typography>
            </Box>

            {/* Add New Button */}
            <Button
                variant="outlined"
                onClick={handleAddNew}
                sx={{
                    alignSelf: 'flex-start', // Align to start
                    textTransform: 'none', // Prevent uppercase
                    borderColor: '#E0E0E0', // Border color
                    color: '#424242', // Text color
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    '&:hover': {
                        borderColor: '#C5C5C5', // Darker border on hover
                        bgcolor: '#f5f5f5', // Light background on hover
                    },
                }}
                startIcon={<Plus size={16} />}
            >
                Add New
            </Button>

            {/* Your Uploaded Documents Section */}
            <Box>
                <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 2 }}>
                    Your Uploaded Documents
                </Typography>
                {uploadedDocuments.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        No documents uploaded yet.
                    </Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {uploadedDocuments.map((doc) => (
                            <Box
                                key={doc.id}
                                sx={{
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '8px',
                                    p: 1.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                    width: { xs: '100%', sm: 'auto' }, // Full width on small screens, auto on larger
                                    minWidth: '150px', // Minimum width for the document card
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
                                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                                    {doc.name}
                                </Typography>
                                <img
                                    src={doc.imageUrl}
                                    alt={doc.name}
                                    style={{
                                        width: '100%', // Make image responsive within its container
                                        maxWidth: '150px', // Max width for the image
                                        height: 'auto',
                                        borderRadius: '4px',
                                        objectFit: 'contain',
                                    }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x100/E0E0E0/FFFFFF?text=Image+Error"; }} // Fallback
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            {/* Save Button */}
            <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                    mt: { xs: 2, sm: 3 }, // Responsive margin top
                    py: '10px',
                    bgcolor: '#1976D2', // Blue background
                    color: 'white',
                    fontWeight: 'semibold',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        bgcolor: '#1565C0', // Darker blue on hover
                    },
                    width: '120px', // Fixed width for the button
                    alignSelf: 'center', // Center the button
                }}
            >
                Save
            </Button>
        </Paper>
    );
};


export default DocumentAndVerification;