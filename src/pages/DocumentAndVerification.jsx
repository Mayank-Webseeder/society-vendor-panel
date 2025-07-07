import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, IconButton } from '@mui/material';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useUser } from '../UserContext';

const DocumentAndVerification = ({ title = "Document and Verification", route }) => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const file = user.idProofFile;

    const [uploadedDocuments, setUploadedDocuments] = useState([
        // Example initial document
        // {
        //     id: 'aadhar',
        //     name: 'Aadhar Card',
        //     fileUrl: 'https://placehold.co/180x110/E0E0E0/FFFFFF?text=Aadhar+Card',
        //     fileType: 'image',
        // }
    ]);
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
        // Optionally, upload to backend here
    };

    const handleDeleteDocument = (docId) => {
        setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
    };

    const handleSave = () => {
        // Implement save logic (e.g., send to backend)
        setTimeout(() => navigate('/my-profile'), 2000);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "white",
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                width: '80%',
                height: '80%',
                p: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
                ml: 4,
                mb: 5
            }}
        >

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                <IconButton onClick={() => navigate('/my-profile')} sx={{ mr: 1, p: 0 }}>
                    <ChevronLeft size={27} strokeWidth={3} color="rgba(0,0,0,0.59)" />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.59)' }}>
                    {title}
                </Typography>
            </Box>

            {/* Preview the onboarding document if present */}
{file && file instanceof File && (
    <Box sx={{ mb: 3 }}>
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
    </Box>
)}

            {/* Add New Button */}
            <Button
                variant="outlined"
                onClick={handleAddNew}
                sx={{
                    alignSelf: 'flex-start',
                    textTransform: 'none',
                    borderColor: '#E0E0E0',
                    color: '#424242',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    '&:hover': {
                        borderColor: '#C5C5C5',
                        bgcolor: '#f5f5f5',
                    },
                }}
                startIcon={<Plus size={16} />}
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
                        ))}
                    </Box>
                )}
            </Box>

            {/* Save Button at the bottom */}
            <Box sx={{ flexGrow: 1 }} />
            <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                    mt: { xs: 2, sm: 3 },
                    py: '10px',
                    bgcolor: '#56A9D9',
                    fontWeight: 'semibold',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        bgcolor: '#1565C0',
                    },
                    width: '120px',
                    alignSelf: 'center',
                }}
            >
                Save
            </Button>
        </Paper>
    );
};

export default DocumentAndVerification;



// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Paper, Typography, Button, Box, IconButton } from '@mui/material';
// import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
// import { useUser } from '../UserContext';


// const DocumentAndVerification = ({ title = "Document and Verification", route }) => {

//     const { user, setUser } = useUser();
//     const navigate = useNavigate();


//     const file = user.idProofFile;
//     console.log(user.idProofFile);




//     const [uploadedDocuments, setUploadedDocuments] = useState([
//         // Example initial document
//         // {
//         //     id: 'aadhar',
//         //     name: 'Aadhar Card',
//         //     fileUrl: 'https://placehold.co/180x110/E0E0E0/FFFFFF?text=Aadhar+Card',
//         //     fileType: 'image',
//         // }
//     ]);
//     const fileInputRef = useRef();

//     const handleAddNew = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         if (file.type !== "application/pdf") {
//             alert("Only PDF files are allowed.");
//             return;
//         }
//         const fileUrl = URL.createObjectURL(file);
//         setUploadedDocuments(prev => [
//             ...prev,
//             {
//                 id: Date.now().toString(),
//                 name: file.name,
//                 fileUrl,
//                 fileType: 'pdf',
//             }
//         ]);
//         // Optionally, upload to backend here
//     };

//     const handleDeleteDocument = (docId) => {
//         setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
//     };

//     const handleSave = () => {
//         // Implement save logic (e.g., send to backend)
//         // alert("Save button clicked");
//         setTimeout(() => navigate('/my-profile'), 2000);
//     };

//     return (
//         <Paper
//             elevation={3}
//             sx={{
//                 backgroundColor: "white",
//                 boxShadow: 3,
//                 border: '1px solid #E0E0E0',
//                 borderRadius: '12px',
//                 width: '80%',
//                 height: '80%',
//                 p: { xs: 2, sm: 3 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: { xs: 2, sm: 3 },
//                 ml: 4,
//                 mb: 5
//             }}
//         >

//             {/* Header */}
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
//                 <IconButton onClick={() => navigate('/my-profile')} sx={{ mr: 1, p: 0 }}>
//                     <ChevronLeft size={27} strokeWidth={3} color="rgba(0,0,0,0.59)" />
//                 </IconButton>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.59)' }}>
//                     {title}
//                 </Typography>
//             </Box>

//             {/* Add New Button */}
//             <Button
//                 variant="outlined"
//                 onClick={handleAddNew}
//                 sx={{
//                     alignSelf: 'flex-start',
//                     textTransform: 'none',
//                     borderColor: '#E0E0E0',
//                     color: '#424242',
//                     borderRadius: '8px',
//                     px: 2,
//                     py: 1,
//                     fontSize: '0.875rem',
//                     fontWeight: 'medium',
//                     '&:hover': {
//                         borderColor: '#C5C5C5',
//                         bgcolor: '#f5f5f5',
//                     },
//                 }}
//                 startIcon={<Plus size={16} />}
//             >
//                 Add New
//             </Button>
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 style={{ display: 'none' }}
//                 onChange={handleFileChange}
//             />

//             {/* Your Uploaded Documents Section */}
//             <Box>
//                 <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#424242', mb: 2 }}>
//                     Your Uploaded Documents
//                 </Typography>
//                 {uploadedDocuments.length === 0 ? (
//                     <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
//                         No documents uploaded yet.
//                     </Typography>
//                 ) : (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//                         {uploadedDocuments.map((doc) => (
//                             <Box
//                                 key={doc.id}
//                                 sx={{
//                                     border: '1px solid #E0E0E0',
//                                     borderRadius: '8px',
//                                     p: 1.5,
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     alignItems: 'center',
//                                     position: 'relative',
//                                     width: { xs: '100%', sm: 'auto' },
//                                     minWidth: '150px',
//                                 }}
//                             >
//                                 <IconButton
//                                     size="small"
//                                     onClick={() => handleDeleteDocument(doc.id)}
//                                     sx={{
//                                         position: 'absolute',
//                                         top: 4,
//                                         right: 4,
//                                         bgcolor: 'rgba(255, 255, 255, 0.8)',
//                                         '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
//                                         p: 0.5,
//                                     }}
//                                 >
//                                     <Trash2 size={16} color="#757575" />
//                                 </IconButton>
//                                 <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1, textAlign: 'center' }}>
//                                     {doc.name}
//                                 </Typography>
//                                 {doc.fileType === 'pdf' ? (
//                                     <Box
//                                         sx={{
//                                             width: '100%',
//                                             maxWidth: '150px',
//                                             height: '110px',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             bgcolor: '#F5F5F5',
//                                             borderRadius: '4px',
//                                             overflow: 'hidden',
//                                         }}
//                                     >
//                                         <embed
//                                             src={doc.fileUrl}
//                                             type="application/pdf"
//                                             width="100%"
//                                             height="100%"
//                                         />
//                                     </Box>
//                                 ) : (
//                                     <img
//                                         src={doc.fileUrl}
//                                         alt={doc.name}
//                                         style={{
//                                             width: '100%',
//                                             maxWidth: '150px',
//                                             height: 'auto',
//                                             borderRadius: '4px',
//                                             objectFit: 'contain',
//                                         }}
//                                     />
//                                 )}
//                             </Box>
//                         ))}
//                     </Box>
//                 )}
//             </Box>

//             {/* Save Button at the bottom */}
//             <Box sx={{ flexGrow: 1 }} />
//             <Button
//                 variant="contained"
//                 onClick={handleSave}
//                 sx={{
//                     mt: { xs: 2, sm: 3 },
//                     py: '10px',
//                     bgcolor: '#56A9D9',
//                     // color: 'white',
//                     fontWeight: 'semibold',
//                     borderRadius: '8px',
//                     boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
//                     '&:hover': {
//                         bgcolor: '#1565C0',
//                     },
//                     width: '120px',
//                     alignSelf: 'center',
//                 }}
//             >
//                 Save
//             </Button>
//         </Paper>
//     );
// };

// export default DocumentAndVerification;