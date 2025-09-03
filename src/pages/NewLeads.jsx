import { useState, useEffect } from 'react';
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
// import { getNearbyJobs } from '../services/api/jobs'; // API call disabled for now
import AccessLockedModal from '../components/modals/AccessLockedModal';
import { useUser } from '../UserContext';


const MotionButton = motion(Button);
const ROWS_PER_PAGE = 10;


const NewLeads = () => {

  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

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
  

  // State for jobs
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // Fetch nearby jobs on component mount (using dummy data for now)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError('');

        // API call disabled; using dummy data with status === 'New'
        // const latitude = 28.7041; // Example latitude
        // const longitude = 77.1025; // Example longitude
        // const fetchedJobs = await getNearbyJobs(latitude, longitude);
        // setJobs(fetchedJobs);

        const newLeads = dummyData.filter(lead => lead.status === 'New');
        setJobs(newLeads);
      } catch (err) {
        // Even on error, fall back to dummy data
        console.error('Using dummy data for new leads:', err);
        setError('');
        setJobs(dummyData.filter(lead => lead.status === 'New'));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  // Filter leads with status "New"
  // const newLeadsAll = dummyData.filter(lead => lead.status === "New");
  const newLeadsAll = jobs.filter(lead => lead.status === "New");
  
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
    <div className="relative flex flex-col gap-8 px-2 pt-3 pb-5 w-full">

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
          className="relative border-solid flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl px-5 sm:px-7 py-5 border border-slate-200 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)] mb-1 overflow-hidden"
          variants={itemVariants}
        >
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 via-transparent to-amber-50/70" />
            <div className="absolute top-0 left-0 h-1 w-40 bg-gradient-to-r from-orange-500 via-amber-500 to-transparent rounded-br-full" />
          <div className="relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-tr from-orange-500 to-amber-400 shadow-inner shadow-amber-800/10 ring-1 ring-white/30">
                <FiberNewIcon sx={{ color: '#FFFFFF', fontSize: { xs: 26, sm: 30 } }} />
              </div>
              <div className="flex flex-col gap-1">
                <h1 style={{ fontFamily: 'Manrope' }} className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 tracking-tight">New Leads</h1>
                <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500 mt-0.5">View all newly available leads</p>
              </div>
            </div>
            {/* Reserved space for future actions */}
            {/* <div className="flex items-center gap-4 self-stretch sm:self-auto" /> */}
          </div>
        </motion.div>

        {/* New status card below header (match MyJobs styling) */}
        <motion.div className="w-full" variants={itemVariants} initial="hidden" animate="visible">
          <div className="mt-0 px-0 sm:px-0">
            <motion.div
              className="bg-white w-48 p-3 sm:p-4 border border-gray-100 rounded-xl sm:shadow-sm flex items-center gap-3 transition-transform duration-150 hover:scale-[1.02] cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex-shrink-0">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center bg-blue-50`}>
                  <FileText className={`w-5 h-5 text-blue-600`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p style={{ fontFamily: 'Lato' }} className="text-sm text-gray-700 font-semibold truncate">New</p>
                    <p style={{ fontFamily: 'Lato' }} className="text-xs text-gray-500 mt-0.5">Overview</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold text-blue-600`}>{totalResults}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>


      {/* Table - Desktop (sm+) */}
      <motion.div
       className="hidden sm:block border-solid border border-gray-300 rounded-xl mx-2"
        variants={itemVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Scroll container: table has a fixed min-width and will scroll horizontally when it exceeds container width */}
        <div className="w-full overflow-x-auto rounded-xl">
          <table className="min-w-[1000px] w-full bg-white shado table-fixed border-collapse" style={{minWidth: '900px'}}>
          <thead>
            {/* Search Row */}
            <tr>
              <th colSpan={4} className="hidden bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
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

              <th colSpan={5} className="bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
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
            <tr className="bg-[#F9FAFB] text-gray-600" style={{borderBottom: '1px solid #E5E7EB'}}>
              <th className="py-3 px-4 text-left text-sm font-bold w-36 sm:w-48 md:w-56 rounded-tl-xl">LEAD NAME</th>
              <th className="py-3 text-center text-sm font-bold w-32 sm:w-40 md:w-48">WORK</th>
              <th className="py-3 text-center text-sm font-bold w-28 sm:w-32 md:w-36">
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
              {/* <th className="hidden lg:table-cell py-4 text-center font-normal w-24 sm:w-28 md:w-32">POSTED AT</th> */}
              <th className="py-3 text-center text-sm font-bold w-24 sm:w-28 md:w-32">POSTED AT</th>
              <th className="py-3 text-center text-sm font-bold w-16 sm:w-20 md:w-24 rounded-tr-xl">ACTION</th>
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
                      className="odd:bg-white even:bg-slate-50/60 hover:bg-blue-50 transition"
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
                      {/* <td className="hidden lg:table-cell py-3 text-center">{lead.time}</td> */}
                      <td className="py-3 text-center">{lead.time}</td>
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
        </div>
      </motion.div>

      {/* Mobile list view for leads (<sm) - stacked cards */}
      <motion.div
        className="sm:hidden border-none bg-white rounded-xl mx-2"
        variants={itemVariants}
        initial='hidden'
        animate='visible'
      >
        <div className="flex flex-col gap-3">
          {/* Mobile search fields */}
          <div className="bg-white rounded-xl border border-gray-100 p-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 flex gap-2">
                <TextField
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Name"
                  size="small"
                  variant="outlined"
                  sx={{ flex: 1, minWidth: 0 }}
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
                            onClick={() => { setSearch(''); setPage(1); }}
                          />
                        </InputAdornment>
                      )
                    ),
                    style: { borderRadius: 8, background: 'white' }
                  }}
                />

                <TextField
                  value={searchWork}
                  onChange={e => { setSearchWork(e.target.value); setPage(1); }}
                  placeholder="Work"
                  size="small"
                  variant="outlined"
                  sx={{ flex: 1, minWidth: 0 }}
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
                            onClick={() => { setSearchWork(''); setPage(1); }}
                          />
                        </InputAdornment>
                      )
                    ),
                    style: { borderRadius: 8, background: 'white' }
                  }}
                />
              </div>

              <div className="flex-shrink-0">
                {/* <div className="text-xs text-gray-500 mb-1 text-right">Sort</div> */}
                <IconButton
                  size="small"
                  onClick={() => { handleSortToggle(); setPage(1); }}
                  sx={{ ml: 1, borderRadius: 1, bgcolor: 'transparent', border: '1px solid rgba(15,23,42,0.06)' }}
                  aria-label={`Sort by posted on ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </IconButton>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-5 px-3'>
            {paginatedLeads.length > 0 ? (
              paginatedLeads.map(lead => (
                <div key={lead.id} className="bg-white border-solid rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-3">
                    {/* Icon / avatar column */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-100">
                        <WrenchScrewdriverIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>

                    {/* Content column */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-800 truncate">{lead.name}</h3>
                            {lead.interested && (
                              <span className="text-xs font-semibold text-green-800 bg-green-50 px-2 py-0.5 rounded">Interested</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 truncate">{lead.work}</div>
                        </div>

                        <div className="text-right text-xs text-gray-400">
                          <div className="font-medium text-gray-500">{lead.postedOn}</div>
                          <div className="mt-1">{lead.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Divider */}
                      <div className="my-6 border-solid border border-t border-gray-100" />

                      {/* Action buttons */}
                      <div className="flex justify-center">
                        {lead.interested ? (
                          <Button
                            variant="outlined"
                            size="medium"
                            sx={{ display: 'block', mx: 'auto', textTransform: 'none', borderRadius: 2, fontWeight: 600, width: 'min(300px,62%)', color: 'green', borderColor: 'green', boxShadow: '0 2px 6px rgba(16,185,129,0.06)', '&:hover': { borderColor: 'darkgreen', background: '#F0FFF4' } }}
                            onClick={() => {
                              setModalLead(lead);
                              setModalOpen(true);
                              setProceed(true);
                            }}
                          >
                            Fill Quotation
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            size="medium"
                            sx={{ display: 'block', mx: 'auto', textTransform: 'none', borderRadius: 2, fontWeight: 800, color: '#1976D2', borderColor: '#1976D2', width: 'min(300px,62%)' }}
                            onClick={() => {
                              setModalLead(lead);
                              setModalOpen(true);
                              setProceed(false);
                            }}
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center text-center py-8 min-h-96 text-gray-400">No new leads found.</div>
            )}
          </div>
        </div>

        {/* Mobile pagination controls */}
        <div className="bg-[#F9FAFB] border-t rounded-bl-xl rounded-br-xl border-gray-200 mt-3">
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
              <span className="text-gray-700 text-sm font-medium">Page {page} of {totalPages || 1}</span>
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
        </div>
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