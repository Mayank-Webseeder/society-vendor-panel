// import { useState, useEffect } from 'react';
// import { Button, IconButton, TextField, InputAdornment } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';
// import FiberNewIcon from '@mui/icons-material/FiberNew';
// import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, FileText } from 'lucide-react';
// import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
// import { motion } from 'framer-motion';
// import NewLeadModal from '../components/modals/NewLeadModal';
// import QuotationFormModal from '../components/modals/QuotationFormModal';
// import { getNearbyJobs } from '../services/api/jobs'; // Import the API

// const ROWS_PER_PAGE = 10;

// const NewLeads = () => {
//   // Manage modal states
//   const [modalLead, setModalLead] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [proceed, setProceed] = useState(false);
//   const [showQuotationForm, setShowQuotationForm] = useState(false);

//   // State for jobs
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Search state
//   const [search, setSearch] = useState('');
//   const [searchWork, setSearchWork] = useState('');

//   // Sorting state
//   const [sortOrder, setSortOrder] = useState('desc'); // Show latest by default

//   // Pagination state
//   const [page, setPage] = useState(1);

//   // Fetch nearby jobs on component mount
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         // Replace with actual latitude and longitude
//         const latitude = 28.7041; // Example latitude
//         const longitude = 77.1025; // Example longitude

//         const fetchedJobs = await getNearbyJobs(latitude, longitude);
//         setJobs(fetchedJobs);
//       } catch (err) {
//         console.error('Error fetching nearby jobs:', err);
//         setError('Failed to fetch jobs. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Filter jobs with status "New"
//   const newLeadsAll = jobs.filter((job) => job.status === 'New');

//   // Filter by search
//   const filteredLeads = newLeadsAll.filter(
//     (lead) =>
//       lead.name.toLowerCase().includes(search.toLowerCase()) &&
//       lead.work.toLowerCase().includes(searchWork.toLowerCase())
//   );

//   const parsePostedOn = (str) => {
//     // Example: "27th June, 25" => "27 June 2025"
//     if (!str) return new Date(0);
//     const [dayPart, monthPart, yearPart] = str.replace(/(st|nd|rd|th)/, '').replace(',', '').split(' ');
//     // Assume year is 20xx
//     const year = yearPart.length === 2 ? `20${yearPart}` : yearPart;
//     return new Date(`${monthPart} ${dayPart} ${year}`);
//   };

//   const sortedLeads = [...filteredLeads].sort((a, b) => {
//     const dateA = parsePostedOn(a.postedOn);
//     const dateB = parsePostedOn(b.postedOn);
//     if (sortOrder === 'asc') {
//       return dateA - dateB;
//     } else {
//       return dateB - dateA;
//     }
//   });

//   // Pagination logic
//   const totalResults = sortedLeads.length;
//   const totalPages = Math.ceil(totalResults / ROWS_PER_PAGE);
//   const startIdx = (page - 1) * ROWS_PER_PAGE;
//   const endIdx = Math.min(startIdx + ROWS_PER_PAGE, totalResults);
//   const paginatedLeads = sortedLeads.slice(startIdx, endIdx);

//   const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
//   const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

//   // Toggle sort order
//   const handleSortToggle = () => {
//     setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
//     setPage(1);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="relative flex flex-col gap-8 px-4 pt-3 pb-5 w-full">
//       {loading && <p>Loading jobs...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <motion.div
//         className="w-full px-2 flex flex-col gap-6 text-gray-800"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
      
//         {/* Header Section */}
//         <motion.div
//           className="flex flex-col shadow-md hover:shadow-lg border-solid border border-gray-400 w-full justify-start bg-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4"
//           variants={itemVariants}
//         >
//           <div className="flex gap-3 sm:gap-5">
//             <div className="flex justify-center items-center p-2 sm:p-3 rounded-xl bg-[#F86B0F] shadow-md">
//               <FiberNewIcon sx={{ color: "white", fontSize: { xs: 28, sm: 34 } }} />
//             </div>
//             <div className="flex flex-col gap-0.5">
//               <h2 style={{ fontFamily:'Manrope' }} className="text-xl sm:text-2xl font-normal text-black/75">New Leads</h2>
//               <p style={{ fontFamily:'Lato' }} className="text-xs sm:text-sm text-gray-700/60 mt-1">View all newly available leads</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Dynamic Lead Count Badge */}
//         <motion.div
//           className={`
//             bg-white rounded-xl w-40 sm:w-52 px-3 py-2 sm:p-3 shadow-sm border-solid border border-gray-300
//               flex flex-col items-start transition-all duration-200
//               transform hover:scale-[1.03] hover:shadow-lg cursor-pointer`
//             }
//           variants={itemVariants}
//           whileHover={{ y: -5 }}
//         >
//           <div className="flex items-center mb-1 sm:mb-2">
//             <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-1 sm:mr-2" />
//             <p style={{fontFamily:'Lato'}} className="text-sm sm:text-base font-bold text-gray-700">New</p>
//           </div>
//           <motion.p
//             key={totalResults}
//             style={{ fontFamily:'Lato' }}
//             className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ type: "spring", stiffness: 120, damping: 15 }}
//           >
//             {totalResults}
//           </motion.p>
//         </motion.div>

//       </motion.div>


//       {/* Table */}
//       <motion.div
//        className="border-solid border border-gray-300 rounded-xl mx-2 overflow-x-auto"
//         variants={itemVariants}
//         initial='hidden'
//         animate='visible'
//       >
//         <table className="w-full bg-white shadow rounded-xl table-fixed border-collapse">
//           <thead>
//             {/* Search Row */}
//             <tr>
//               <th colSpan={4} className="lg:hidden bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
//                 <div className="flex justify-start gap-8 px-4 py-3" style={{borderBottom: '1px solid #E5E7EB'}}>
//                   <TextField
//                     value={search}
//                     onChange={e => {
//                       setSearch(e.target.value);
//                       setPage(1);
//                     }}
//                     placeholder="Search by lead name"
//                     size="small"
//                     variant="outlined"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon color="action" />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         search && (
//                           <InputAdornment position="end">
//                             <CloseIcon
//                               fontSize="small"
//                               className="cursor-pointer text-gray-400 hover:text-gray-600"
//                               onClick={() => {
//                                 setSearch('');
//                                 setPage(1);
//                               }}
//                             />
//                           </InputAdornment>
//                         )
//                       ),
//                       style: { borderRadius: 8, background: "white" }
//                     }}
//                     sx={{ width: 220 }}
//                   />
//                   <TextField
//                     value={searchWork}
//                     onChange={e => {
//                       setSearchWork(e.target.value);
//                       setPage(1);
//                     }}
//                     placeholder="Search by work"
//                     size="small"
//                     variant="outlined"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon color="action" />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         searchWork && (
//                           <InputAdornment position="end">
//                             <CloseIcon
//                               fontSize="small"
//                               className="cursor-pointer text-gray-400 hover:text-gray-600"
//                               onClick={() => {
//                                 setSearchWork('');
//                                 setPage(1);
//                               }}
//                             />
//                           </InputAdornment>
//                         )
//                       ),
//                       style: { borderRadius: 8, background: "white" }
//                     }}
//                     sx={{ width: 220 }}
//                   />
//                 </div>
//               </th>

//               <th colSpan={5} className="hidden lg:table-cell bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
//                 <div className="flex justify-start gap-8 px-4 py-3" style={{borderBottom: '1px solid #E5E7EB'}}>
//                   <TextField
//                     value={search}
//                     onChange={e => {
//                       setSearch(e.target.value);
//                       setPage(1);
//                     }}
//                     placeholder="Search by lead name"
//                     size="small"
//                     variant="outlined"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon color="action" />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         search && (
//                           <InputAdornment position="end">
//                             <CloseIcon
//                               fontSize="small"
//                               className="cursor-pointer text-gray-400 hover:text-gray-600"
//                               onClick={() => {
//                                 setSearch('');
//                                 setPage(1);
//                               }}
//                             />
//                           </InputAdornment>
//                         )
//                       ),
//                       style: { borderRadius: 8, background: "white" }
//                     }}
//                     sx={{ width: 220 }}
//                   />
//                   <TextField
//                     value={searchWork}
//                     onChange={e => {
//                       setSearchWork(e.target.value);
//                       setPage(1);
//                     }}
//                     placeholder="Search by work"
//                     size="small"
//                     variant="outlined"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon color="action" />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         searchWork && (
//                           <InputAdornment position="end">
//                             <CloseIcon
//                               fontSize="small"
//                               className="cursor-pointer text-gray-400 hover:text-gray-600"
//                               onClick={() => {
//                                 setSearchWork('');
//                                 setPage(1);
//                               }}
//                             />
//                           </InputAdornment>
//                         )
//                       ),
//                       style: { borderRadius: 8, background: "white" }
//                     }}
//                     sx={{ width: 220 }}
//                   />
//                 </div>
//               </th>
//             </tr>
//             {/* Table Head Row */}
//             <tr className="bg-[#F9FAFB] text-gray-500">
//               <th className="py-4 px-4 text-left font-normal w-36 sm:w-48 md:w-56 rounded-tl-xl">LEAD NAME</th>
//               <th className="py-4 text-center font-normal w-32 sm:w-40 md:w-48">WORK</th>
//               <th className="py-4 text-center font-normal w-28 sm:w-32 md:w-36">
//                 <span className="gap-1 select-none">
//                   POSTED ON
//                   <IconButton
//                     size="small"
//                     onClick={handleSortToggle}
//                     sx={{ ml: 1, color: '#1976D2', p: 0.5 }}
//                     aria-label={`Sort by posted on ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
//                   >
//                     {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
//                   </IconButton>
//                 </span>
//               </th>
//               <th className="hidden lg:table-cell py-4 text-center font-normal w-24 sm:w-28 md:w-32">POSTED AT</th>
//               <th className="py-4 text-center font-normal w-16 sm:w-20 md:w-24 rounded-tr-xl">ACTION</th>
//             </tr>
//           </thead>

//           <tbody>
//             {
//             paginatedLeads.length > 0 ? (
//               <>
//                 {
//                   paginatedLeads.map(lead => (
//                     <tr
//                       key={lead.id}
//                       className="hover:bg-blue-50 transition"
//                       style={{ borderBottom: "1px solid #E5E7EB" }}
//                     >
//                       <td className="py-3 px-4">
//                         {lead.name}
//                         {lead.interested && (
//                           <span
//                             style={{
//                               marginLeft: '8px',
//                               color: 'green',
//                               fontWeight: 'bold',
//                               fontSize: '0.85rem',
//                             }}
//                           >
//                             Interested
//                           </span>
//                         )}
//                       </td>

//                       <td className="py-3 px-4 text-center">
//                         <span className="inline-grid border-solid place-items-center grid-cols-[auto_auto] gap-2 px-2 py-1 bg-gray-50 rounded-md border border-gray-200 w-fit mx-auto">
//                           <WrenchScrewdriverIcon className="w-4 h-4 text-gray-500" />
//                           <span className="text-sm text-gray-700">{lead.work}</span>
//                         </span>
//                       </td>

//                       <td className="py-3 text-center">{lead.postedOn}</td>
//                       <td className="hidden lg:table-cell py-3 text-center">{lead.time}</td>
//                       <td className="py-3 text-center">
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
//                           onClick={() => {    // Modal-handling
//                             setModalLead(lead);
//                             setModalOpen(true);
//                             setProceed(false);
//                             setShowQuotationForm(false);
//                           }}
//                         >
//                           Apply
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 }
                
//                 {/* Add empty rows if less than 10 entries on this page */}
//                 {Array.from({ length: ROWS_PER_PAGE - paginatedLeads.length }).map((_, idx) => (
//                   <tr key={`empty-${idx}`}>
//                     <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
//                     <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
//                     <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
//                     <td className="hidden lg:table-cell py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
//                     <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
//                   </tr>
//                 ))}
//               </>
//             ) : (
//               <tr>
//                 <td 
//                   colSpan={4} 
//                   className="lg:hidden text-center text-gray-400 bg-white rounded-b-xl" 
//                   style={{ 
//                     height: ROWS_PER_PAGE * 56,
//                     minHeight: 560,
//                     verticalAlign: 'middle'
//                   }}
//                 >
//                   No new leads found.
//                 </td>
//                 <td 
//                   colSpan={5} 
//                   className="hidden lg:table-cell text-center text-gray-400 bg-white rounded-b-xl" 
//                   style={{ 
//                     height: ROWS_PER_PAGE * 56,
//                     minHeight: 560,
//                     verticalAlign: 'middle'
//                   }}
//                 >
//                   No new leads found.
//                 </td>
//               </tr>
//             )}
//           </tbody>

//           {/* Pagination Row */}
//           <tfoot>
//             <tr>
//               <td colSpan={4} className="lg:hidden bg-[#F9FAFB] border-t rounded-bl-xl rounded-br-xl border-gray-200">
//                 <div className="flex items-center justify-between px-4 py-3">
//                   <span className="text-gray-600 text-sm">
//                     {totalResults === 0
//                       ? "Showing 0 results"
//                       : `Showing ${startIdx + 1} to ${endIdx} of ${totalResults} results`}
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={handlePrevPage}
//                       disabled={page === 1}
//                       sx={{
//                         minWidth: 0,
//                         borderRadius: 2,
//                         px: 1.5,
//                         fontWeight: 600,
//                         color: page === 1 ? '#bdbdbd' : '#1976D2',
//                         borderColor: page === 1 ? '#e0e0e0' : '#1976D2',
//                         '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
//                       }}
//                     >
//                       <ChevronLeft size={18} />
//                     </Button>
//                     <span className="text-gray-700 text-sm font-medium">
//                       Page {page} of {totalPages || 1}
//                     </span>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={handleNextPage}
//                       disabled={page === totalPages || totalResults === 0}
//                       sx={{
//                         minWidth: 0,
//                         borderRadius: 2,
//                         px: 1.5,
//                         fontWeight: 600,
//                         color: page === totalPages || totalResults === 0 ? '#bdbdbd' : '#1976D2',
//                         borderColor: page === totalPages || totalResults === 0 ? '#e0e0e0' : '#1976D2',
//                         '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
//                       }}
//                     >
//                       <ChevronRight size={18} />
//                     </Button>
//                   </div>
//                 </div>
//               </td>

//               <td colSpan={5} className="hidden lg:table-cell bg-[#F9FAFB] border-t rounded-bl-xl rounded-br-xl border-gray-200">
//                 <div className="flex items-center justify-between px-4 py-3">
//                   <span className="text-gray-600 text-sm">
//                     {totalResults === 0
//                       ? "Showing 0 results"
//                       : `Showing ${startIdx + 1} to ${endIdx} of ${totalResults} results`}
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={handlePrevPage}
//                       disabled={page === 1}
//                       sx={{
//                         minWidth: 0,
//                         borderRadius: 2,
//                         px: 1.5,
//                         fontWeight: 600,
//                         color: page === 1 ? '#bdbdbd' : '#1976D2',
//                         borderColor: page === 1 ? '#e0e0e0' : '#1976D2',
//                         '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
//                       }}
//                     >
//                       <ChevronLeft size={18} />
//                     </Button>
//                     <span className="text-gray-700 text-sm font-medium">
//                       Page {page} of {totalPages || 1}
//                     </span>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={handleNextPage}
//                       disabled={page === totalPages || totalResults === 0}
//                       sx={{
//                         minWidth: 0,
//                         borderRadius: 2,
//                         px: 1.5,
//                         fontWeight: 600,
//                         color: page === totalPages || totalResults === 0 ? '#bdbdbd' : '#1976D2',
//                         borderColor: page === totalPages || totalResults === 0 ? '#e0e0e0' : '#1976D2',
//                         '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
//                       }}
//                     >
//                       <ChevronRight size={18} />
//                     </Button>
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </motion.div>


//       {
//         modalLead  &&  modalOpen  &&  !showQuotationForm  &&
//           <NewLeadModal 
//             open={modalOpen}
//             onClose={() => setModalOpen(false)}
//             lead={modalLead}
//             proceed={proceed}
//             onApplyClick={() => setProceed(true)}
//             onFillQuotation={() => {
//               setShowQuotationForm(true);
//               setModalOpen(false);
//             }}
//           />
//       }

//       {
//         modalLead && showQuotationForm && (
//           <QuotationFormModal
//             open={showQuotationForm}
//             onClose={() => {
//               setShowQuotationForm(false);
//               setModalLead(null);
//               setProceed(false);
//             }}
//             onSubmit={() => {
//               setShowQuotationForm(false);
//               setModalLead(null);
//               setProceed(false);
//               // Optionally show a success message or refresh data here
//             }}
//            jobId={modalLead._id}
//           />
//       )}
//     </div>
//   );
// };

// export default NewLeads;






import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, FileText } from 'lucide-react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import NewLeadModal from '../components/modals/NewLeadModal';
import QuotationFormModal from '../components/modals/QuotationFormModal';
import dummyData from '../static/dummyData_Leads';
import AccessLockedModal from '../components/modals/AccessLockedModal';
import { useUser } from '../UserContext';


const MotionButton = motion(Button);
const ROWS_PER_PAGE = 10;


const NewLeads = () => {

  const { user } = useUser();
  const subscriptionActive = user.velra_subscription_active;

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive); // Open modal if no subscription
  
  // Redirect to dashboard when access locked modal closes
  const handleModalClose = () => {
    navigate('/dashboard');
    // setIsModalOpen(false);
  };

  // Manage modal states
  const [modalLead, setModalLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [showQuotationForm, setShowQuotationForm] = useState(false);
  

  // Filter leads with status "New"
  const newLeadsAll = dummyData.filter(lead => lead.status === "New");
  
  // Search state
  const [search, setSearch] = useState('');
  const [searchWork, setSearchWork] = useState('');

  // Sorting state
  const [sortOrder, setSortOrder] = useState('desc');    // Show latest by default

  // Pagination state
  const [page, setPage] = useState(1);

  // Filter by search
  const filteredLeads = newLeadsAll.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase())  &&
      lead.work.toLowerCase().includes(searchWork.toLowerCase())
  );


  const parsePostedOn = (str) => {
    // Example: "27th June, 25" => "27 June 2025"
    if (!str) return new Date(0);
    const [dayPart, monthPart, yearPart] = str.replace(/(st|nd|rd|th)/, '').replace(',', '').split(' ');
    // Assume year is 20xx
    const year = yearPart.length === 2 ? `20${yearPart}` : yearPart;
    return new Date(`${monthPart} ${dayPart} ${year}`);
  };

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const dateA = parsePostedOn(a.postedOn);
    const dateB = parsePostedOn(b.postedOn);
    if (sortOrder === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });


  // Pagination logic
  const totalResults = sortedLeads.length;
  const totalPages = Math.ceil(totalResults / ROWS_PER_PAGE);
  const startIdx = (page - 1) * ROWS_PER_PAGE;
  const endIdx = Math.min(startIdx + ROWS_PER_PAGE, totalResults);
  const paginatedLeads = sortedLeads.slice(startIdx, endIdx);

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));


  // Toggle sort order
  const handleSortToggle = () => {
    setSortOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };



  return (
    <div className="relative flex flex-col gap-8 px-4 pt-3 pb-5 w-full">

      {/* Render AccessLockedModal as an overlay if subscription is inactive */}
      {!subscriptionActive  && 
        <AccessLockedModal
          open={isModalOpen}
          onClose={handleModalClose}
          heading="Access Restricted"
          subheading="Subscribe to view new leads and unlock premium features."
        />
      }

      {/* Main content of NewLeads page */}
      <motion.div
        className="w-full px-2 flex flex-col gap-6 text-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      
        {/* Header Section */}
        <motion.div
          className="flex flex-col shadow-md hover:shadow-lg border-solid border border-gray-400 w-full justify-start bg-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4"
          variants={itemVariants}
        >
          <div className="flex gap-3 sm:gap-5">
            <div className="flex justify-center items-center p-2 sm:p-3 rounded-xl bg-[#F86B0F] shadow-md">
              <FiberNewIcon sx={{ color: "white", fontSize: { xs: 28, sm: 34 } }} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 style={{ fontFamily:'Manrope' }} className="text-xl sm:text-2xl font-normal text-black/75">New Leads</h2>
              <p style={{ fontFamily:'Lato' }} className="text-xs sm:text-sm text-gray-700/60 mt-1">View all newly available leads</p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Lead Count Badge */}
        <motion.div
          className={`
            bg-white rounded-xl w-40 sm:w-52 px-3 py-2 sm:p-3 shadow-sm border-solid border border-gray-300
              flex flex-col items-start transition-all duration-200
              transform hover:scale-[1.03] hover:shadow-lg cursor-pointer`
            }
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center mb-1 sm:mb-2">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-1 sm:mr-2" />
            <p style={{fontFamily:'Lato'}} className="text-sm sm:text-base font-bold text-gray-700">New</p>
          </div>
          <motion.p
            key={totalResults}
            style={{ fontFamily:'Lato' }}
            className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {totalResults}
          </motion.p>
        </motion.div>

      </motion.div>


      {/* Table */}
      <motion.div
       className="border-solid border border-gray-300 rounded-xl mx-2 overflow-x-auto"
        variants={itemVariants}
        initial='hidden'
        animate='visible'
      >
        <table className="w-full bg-white shadow rounded-xl table-fixed border-collapse">
          <thead>
            {/* Search Row */}
            <tr>
              <th colSpan={4} className="lg:hidden bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
                <div className="flex justify-start gap-8 px-4 py-3" style={{borderBottom: '1px solid #E5E7EB'}}>
                  <TextField
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by lead name"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        search && (
                          <InputAdornment position="end">
                            <CloseIcon
                              fontSize="small"
                              className="cursor-pointer text-gray-400 hover:text-gray-600"
                              onClick={() => {
                                setSearch('');
                                setPage(1);
                              }}
                            />
                          </InputAdornment>
                        )
                      ),
                      style: { borderRadius: 8, background: "white" }
                    }}
                    sx={{ width: 220 }}
                  />
                  <TextField
                    value={searchWork}
                    onChange={e => {
                      setSearchWork(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by work"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        searchWork && (
                          <InputAdornment position="end">
                            <CloseIcon
                              fontSize="small"
                              className="cursor-pointer text-gray-400 hover:text-gray-600"
                              onClick={() => {
                                setSearchWork('');
                                setPage(1);
                              }}
                            />
                          </InputAdornment>
                        )
                      ),
                      style: { borderRadius: 8, background: "white" }
                    }}
                    sx={{ width: 220 }}
                  />
                </div>
              </th>

              <th colSpan={5} className="hidden lg:table-cell bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
                <div className="flex justify-start gap-8 px-4 py-3" style={{borderBottom: '1px solid #E5E7EB'}}>
                  <TextField
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by lead name"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        search && (
                          <InputAdornment position="end">
                            <CloseIcon
                              fontSize="small"
                              className="cursor-pointer text-gray-400 hover:text-gray-600"
                              onClick={() => {
                                setSearch('');
                                setPage(1);
                              }}
                            />
                          </InputAdornment>
                        )
                      ),
                      style: { borderRadius: 8, background: "white" }
                    }}
                    sx={{ width: 220 }}
                  />
                  <TextField
                    value={searchWork}
                    onChange={e => {
                      setSearchWork(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by work"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        searchWork && (
                          <InputAdornment position="end">
                            <CloseIcon
                              fontSize="small"
                              className="cursor-pointer text-gray-400 hover:text-gray-600"
                              onClick={() => {
                                setSearchWork('');
                                setPage(1);
                              }}
                            />
                          </InputAdornment>
                        )
                      ),
                      style: { borderRadius: 8, background: "white" }
                    }}
                    sx={{ width: 220 }}
                  />
                </div>
              </th>
            </tr>
            {/* Table Head Row */}
            <tr className="bg-[#F9FAFB] text-gray-500">
              <th className="py-4 px-4 text-left font-normal w-36 sm:w-48 md:w-56 rounded-tl-xl">LEAD NAME</th>
              <th className="py-4 text-center font-normal w-32 sm:w-40 md:w-48">WORK</th>
              <th className="py-4 text-center font-normal w-28 sm:w-32 md:w-36">
                <span className="gap-1 select-none">
                  POSTED ON
                  <IconButton
                    size="small"
                    onClick={handleSortToggle}
                    sx={{ ml: 1, color: '#1976D2', p: 0.5 }}
                    aria-label={`Sort by posted on ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                  >
                    {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  </IconButton>
                </span>
              </th>
              <th className="hidden lg:table-cell py-4 text-center font-normal w-24 sm:w-28 md:w-32">POSTED AT</th>
              <th className="py-4 text-center font-normal w-16 sm:w-20 md:w-24 rounded-tr-xl">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {
            paginatedLeads.length > 0 ? (
              <>
                {
                  paginatedLeads.map(lead => (
                    <tr
                      key={lead.id}
                      className="hover:bg-blue-50 transition"
                      style={{ borderBottom: "1px solid #E5E7EB" }}
                    >
                      <td className="py-3 px-4">
                        {lead.name}
                        {lead.interested && (
                          <span
                            style={{
                              marginLeft: '8px',
                              color: '#16a34a',
                              fontWeight: '600',
                              fontSize: '0.8rem',
                              border: '1px solid #86efac',
                              borderRadius: '12px',
                              padding: '3px 8px',
                              backgroundColor: '#f0fdf4',
                              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s ease',
                              cursor: 'default',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#dcfce7';
                              e.target.style.borderColor = '#4ade80';
                              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#f0fdf4';
                              e.target.style.borderColor = '#86efac';
                              e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                            }}
                          >
                            <span style={{
                              width: '6px',
                              height: '6px',
                              backgroundColor: '#16a34a',
                              borderRadius: '50%',
                              display: 'inline-block',
                            }}></span>
                            Interested
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-grid border-solid place-items-center grid-cols-[auto_auto] gap-2 px-2 py-1 bg-gray-50 rounded-md border border-gray-200 w-fit mx-auto">
                          <WrenchScrewdriverIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{lead.work}</span>
                        </span>
                      </td>

                      <td className="py-3 text-center">{lead.postedOn}</td>
                      <td className="hidden lg:table-cell py-3 text-center">{lead.time}</td>
                      <td className="py-3 text-center">
                        {lead.interested ? (
                          <MotionButton
                            whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(16, 185, 129, 0.10)' }}
                            whileTap={{ y: 1 }}
                            transition={{ type: "tween" }}
                            variant="outlined"
                            size="small"
                            sx={{
                              minWidth: 100,
                              textTransform: 'none',
                              borderRadius: 2,
                              fontWeight: 600,
                              color: 'green',
                              borderColor: 'green',
                              '&:hover': { 
                                borderColor: 'darkgreen', 
                                background: '#F0FFF4',
                                // textDecoration:'underline',
                              },
                            }}
                            onClick={() => {
                              setModalLead(lead);
                              setModalOpen(true);
                              setProceed(true);
                            }}
                          >
                            Fill Quotation
                          </MotionButton>
                        ) : (
                          <MotionButton
                            whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(33, 150, 243, 0.10)' }}
                            whileTap={{ y: 1 }}
                            transition={{ type: 'tween' }}
                            variant="outlined"
                            size="small"
                            sx={{
                              minWidth: 100,
                              textTransform: 'none', 
                              borderRadius: 2, 
                              fontWeight: 800,
                              color: '#1976D2',
                              borderColor: '#1976D2',
                              '&:hover': {
                                borderColor: '#1565C0',
                                background: '#E3F2FD',
                                // textDecoration: 'underline',
                              }, 
                            }}
                            onClick={() => {
                              setModalLead(lead);
                              setModalOpen(true);
                              setProceed(false);
                            }}
                          >
                            Apply
                          </MotionButton>
                        )}
                      </td>
                    </tr>
                  ))
                }
                
                {/* Add empty rows if less than 10 entries on this page */}
                {Array.from({ length: ROWS_PER_PAGE - paginatedLeads.length }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
                    <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
                    <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
                    <td className="hidden lg:table-cell py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
                    <td className="py-3 px-4" style={{ background: "#fff", borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none", height: 56 }} />
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td 
                  colSpan={4} 
                  className="lg:hidden text-center text-gray-400 bg-white rounded-b-xl" 
                  style={{ 
                    height: ROWS_PER_PAGE * 56,
                    minHeight: 560,
                    verticalAlign: 'middle'
                  }}
                >
                  No new leads found.
                </td>
                <td 
                  colSpan={5} 
                  className="hidden lg:table-cell text-center text-gray-400 bg-white rounded-b-xl" 
                  style={{ 
                    height: ROWS_PER_PAGE * 56,
                    minHeight: 560,
                    verticalAlign: 'middle'
                  }}
                >
                  No new leads found.
                </td>
              </tr>
            )}
          </tbody>

          {/* Pagination Row */}
          <tfoot>
            <tr>
              <td colSpan={4} className="lg:hidden bg-[#F9FAFB] border-t rounded-bl-xl rounded-br-xl border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-600 text-sm">
                    {totalResults === 0
                      ? "Showing 0 results"
                      : `Showing ${startIdx + 1} to ${endIdx} of ${totalResults} results`}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      sx={{
                        minWidth: 0,
                        borderRadius: 2,
                        px: 1.5,
                        fontWeight: 600,
                        color: page === 1 ? '#bdbdbd' : '#1976D2',
                        borderColor: page === 1 ? '#e0e0e0' : '#1976D2',
                        '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
                      }}
                    >
                      <ChevronLeft size={18} />
                    </Button>
                    <span className="text-gray-700 text-sm font-medium">
                      Page {page} of {totalPages || 1}
                    </span>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleNextPage}
                      disabled={page === totalPages || totalResults === 0}
                      sx={{
                        minWidth: 0,
                        borderRadius: 2,
                        px: 1.5,
                        fontWeight: 600,
                        color: page === totalPages || totalResults === 0 ? '#bdbdbd' : '#1976D2',
                        borderColor: page === totalPages || totalResults === 0 ? '#e0e0e0' : '#1976D2',
                        '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
                      }}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              </td>

              <td colSpan={5} className="hidden lg:table-cell bg-[#F9FAFB] border-t rounded-bl-xl rounded-br-xl border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-600 text-sm">
                    {totalResults === 0
                      ? "Showing 0 results"
                      : `Showing ${startIdx + 1} to ${endIdx} of ${totalResults} results`}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      sx={{
                        minWidth: 0,
                        borderRadius: 2,
                        px: 1.5,
                        fontWeight: 600,
                        color: page === 1 ? '#bdbdbd' : '#1976D2',
                        borderColor: page === 1 ? '#e0e0e0' : '#1976D2',
                        '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
                      }}
                    >
                      <ChevronLeft size={18} />
                    </Button>
                    <span className="text-gray-700 text-sm font-medium">
                      Page {page} of {totalPages || 1}
                    </span>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleNextPage}
                      disabled={page === totalPages || totalResults === 0}
                      sx={{
                        minWidth: 0,
                        borderRadius: 2,
                        px: 1.5,
                        fontWeight: 600,
                        color: page === totalPages || totalResults === 0 ? '#bdbdbd' : '#1976D2',
                        borderColor: page === totalPages || totalResults === 0 ? '#e0e0e0' : '#1976D2',
                        '&:hover': { borderColor: '#1976D2', background: '#F3F4F6' },
                      }}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>


      {
        modalLead  &&  modalOpen  &&  !showQuotationForm  &&
          <NewLeadModal 
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            lead={modalLead}
            proceed={proceed}
            onApplyClick={() => setProceed(true)}
            onFillQuotation={() => {
              setShowQuotationForm(true);
              setModalOpen(false);
            }}
          />
      }

      {
        modalLead && showQuotationForm && (
          <QuotationFormModal
            open={showQuotationForm}
            onClose={() => {
              setShowQuotationForm(false);
              setModalLead(null);
              setProceed(false);
            }}
            onSubmit={() => {
              setShowQuotationForm(false);
              setModalLead(null);
              setProceed(false);
              // Optionally show a success message or refresh data here
            }}
          />
      )}
    </div>
  );
};


export default NewLeads;