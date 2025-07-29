import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon, BusinessCenter as BusinessCenterIcon } from '@mui/icons-material';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { FileText, Hourglass, CheckSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import dummyData from "../static/dummyData_Leads";
import NewLeadModal from "../components/modals/NewLeadModal";
import QuotationFormModal from "../components/modals/QuotationFormModal";
import OngoingModal from "../components/modals/OngoingModal";
import CompletedModal from "../components/modals/CompletedModal";
import WithdrawApplicationModal from "../components/modals/WithdrawApplicationModal";
import CancelJobModal from '../components/modals/CancelJobModal';
import { useUser } from "../UserContext";
import AccessLockedModal from "../components/modals/AccessLockedModal";


const statusOptions = [
  { label: "All" },
  { label: "New" },
  { label: "Completed" },
  { label: "Ongoing" },
  { label: "Applied" },
];

const ROWS_PER_PAGE = 10;

const parsePostedOn = (str) => {
  // Example: "27th June, 25" => "27 June 2025"
  if (!str) return new Date(0);
  const [dayPart, monthPart, yearPart] = str.replace(/(st|nd|rd|th)/, '').replace(',', '').split(' ');
  const year = yearPart.length === 2 ? `20${yearPart}` : yearPart;
  return new Date(`${monthPart} ${dayPart} ${year}`);
};



const MyJobs = () => {

  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(!user.membershipActive); // Open modal if no membership

  // Redirect to dashboard when access locked modal closes
  const handleModalClose = () => {
    navigate('/dashboard');
  };

  // Manage modal states
  const [modalLead, setModalLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  // Set the initial filter based on navigation state or default to "All"
  const [selectedStatus, setSelectedStatus] = useState(location.state?.filter || "All");

  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchWork, setSearchWork] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const jobStatuses = [
    { name: "New", color: "text-blue-600", icon: FileText, count: dummyData.filter(lead => lead.status === "New").length },
    { name: "Ongoing", color: "text-yellow-600", icon: Hourglass, count: dummyData.filter(lead => lead.status === "Ongoing").length },
    { name: "Completed", color: "text-green-600", icon: CheckSquare, count: dummyData.filter(lead => lead.status === "Completed").length },
    { name: "Applied", color: "text-purple-600", icon: Send, count: dummyData.filter(lead => lead.status === "Applied").length },
  ];

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


  // Filtered leads (add search filter)
  const filteredLeads = (selectedStatus === "All"
    ? dummyData
    : dummyData.filter((lead) => lead.status === selectedStatus)
  ).filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase())  &&
    lead.work.toLowerCase().includes(searchWork.toLowerCase())
  );

  // Restrict table entries if membership is inactive
  const restrictedLeads = user.membershipActive
    ? filteredLeads
    : filteredLeads.filter((lead) => lead.status === "New" || lead.status === "Ongoing");


  const sortedLeads = [...restrictedLeads].sort((a, b) => {
    const dateA = parsePostedOn(a.postedOn);
    const dateB = parsePostedOn(b.postedOn);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });


  // Pagination logic
  const totalResults = sortedLeads.length;
  const totalPages = Math.ceil(totalResults / ROWS_PER_PAGE);
  const startIdx = (page - 1) * ROWS_PER_PAGE;
  const endIdx = Math.min(startIdx + ROWS_PER_PAGE, totalResults);
  const paginatedLeads = sortedLeads.slice(startIdx, endIdx);

  const handleSortToggle = () => {
    setSortOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  };

  // Modal logic
  const handleView = (lead) => {
    setModalLead(lead);
    setModalOpen(true);
    setProceed(false);
    setShowQuotationForm(false);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setModalLead(null);
    setModalOpen(false);
    setProceed(false);
    setShowQuotationForm(false);
  };

  // Dropdown logic for status in table header
  const handleStatusClick = (event) => setStatusAnchorEl(event.currentTarget);
  const handleStatusClose = () => setStatusAnchorEl(null);
  const handleStatusSelect = (label) => {
    setSelectedStatus(label);
    setStatusAnchorEl(null);
    setPage(1); // Reset to first page on filter change
  };

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));



  return (
    <div className="relative flex flex-col gap-8 px-4 pt-3 pb-5 w-full">

      {/* Render AccessLockedModal as an overlay if membership is inactive */}
      {!user.membershipActive  &&  
        <AccessLockedModal 
          open={isModalOpen}
          onClose={handleModalClose}
          heading="Access Restricted"
          subheading="Subscribe to view all job details and unlock premium features."
        />
      }

      {/* Main content of MyJobs page */}
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
            {/* Briefcase icon container with specified color and shadow */}
            <div className="flex justify-center items-center p-2 sm:p-3 rounded-xl bg-[#56A9D9] shadow-md">
              <BusinessCenterIcon sx={{ color: "white", fontSize: { xs: 28, sm: 34 } }} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 style={{fontFamily:'Manrope'}} className="text-xl sm:text-2xl font-normal text-black/75">My Jobs</h2>
              <p style={{fontFamily:'Lato'}} className="text-xs sm:text-sm text-gray-700/60 mt-1">View and manage all available leads</p>
            </div>
          </div>
        </motion.div>

        {/* Job Status Cards Section */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-12 sm:justify-start sm:items-center">
          {jobStatuses.map((status) => (
            <motion.div
              key={status.name}
              className={`
                bg-white rounded-xl w-full sm:w-52 p-3 sm:p-3 shadow-sm border-solid border border-gray-300
                flex flex-col items-start transition-all duration-200
                transform hover:scale-[1.03] hover:shadow-lg cursor-pointer
              `}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-1 sm:mb-2">
                <status.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${status.color} mr-1 sm:mr-2`} />
                <p style={{ fontFamily: 'Lato' }} className="text-sm sm:text-base font-bold text-gray-700">
                  {status.name}
                </p>
              </div>
              <div className="min-h-9 flex items-center">
                <p
                  style={{ fontFamily: 'Lato' }}
                  className={`text-2xl sm:text-3xl font-bold ${status.color} leading-none`}
                >
                  {status.count}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>
      </motion.div>


        {/* Table */}
        <motion.div
          className="border-solid border border-gray-300 rounded-xl mx-2 overflow-x-auto"
          variants={itemVariants}
          initial='hidden'
          animate='visible'
        >
          <table className="w-full bg-white shadow border rounded-xl table-fixed border-collapse">
            <thead>
              {/* Search Row */}
              <tr>
                <th colSpan={5} className="bg-[#F9FAFB] rounded-tl-xl rounded-tr-xl">
                  <div className="flex justify-start gap-8 px-4 py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
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
                <th className="py-4 text-center font-normal w-28 sm:w-32 md:w-44">
                  <span
                    className="cursor-pointer select-none text-center flex justify-center items-center gap-1"
                    onClick={handleStatusClick}
                  >
                    STATUS
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="#1976D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="ml-1 text-xs text-[#1976D2] font-medium">{selectedStatus}</span>
                  </span>
                  <Menu
                    anchorEl={statusAnchorEl}
                    open={Boolean(statusAnchorEl)}
                    onClose={handleStatusClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right', // Aligns the menu to the right of the button
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right', // Ensures the menu opens from the right
                    }}
                  >
                    {statusOptions.map(option => (
                      <MenuItem
                        key={option.label}
                        selected={selectedStatus === option.label}
                        onClick={() => handleStatusSelect(option.label)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </th>
                <th className="py-4 text-center font-normal w-28 sm:w-32 md:w-36">
                  <span className="gap-1 select-none">
                    POSTED ON
                    <Button
                      size="small"
                      onClick={handleSortToggle}
                      sx={{ minWidth: 0, ml: 1, color: '#1976D2', p: 0.5 }}
                      aria-label={`Sort by posted on ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                    >
                      {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    </Button>
                  </span>
                </th>
                <th className="py-4 text-center font-normal w-24 sm:w-28 md:w-32 rounded-tr-xl">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {paginatedLeads.length > 0 ? (
                <>
                  {paginatedLeads.map(lead => {
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-blue-50 transition"
                        style={{ borderBottom: "1px solid #E5E7EB" }}
                      >
                        <td className="py-3 px-4">{lead.name}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-grid border-solid place-items-center grid-cols-[auto_auto] gap-2 px-2 py-1 bg-gray-50 rounded-md border border-gray-200 w-fit mx-auto">
                            <WrenchScrewdriverIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{lead.work}</span>
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          {lead.status === "Applied" ? (
                            <span className={`px-4 py-2 w-fit rounded-full text-sm font-semibold
                              ${lead.pendingStatus === "Approval Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : lead.pendingStatus === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"}
                          `}>
                            {lead.pendingStatus === "Approved" && (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {lead.pendingStatus}
                          </span>
                        ) : (
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            lead.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : lead.status === "Ongoing"
                              ? "bg-yellow-100 text-yellow-700"
                              : lead.status === "New"
                              ? (user.membershipActive ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700")
                              : "bg-gray-50 text-gray-500"
                          }`}>
                            {lead.status} {lead.status === 'New' ? '!' : ''}
                          </span>
                        )}
                        </td>
                        <td className="py-3 text-center">{lead.postedOn}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
                            onClick={() => handleView(lead)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Add empty rows if less than 10 entries on this page */}
                  {Array.from({ length: ROWS_PER_PAGE - paginatedLeads.length }).map((_, idx) => (
                    <tr key={`empty-${idx}`}>
                      <td
                        colSpan={5}
                        className="py-3 px-4"
                        style={{
                          background: "#fff",
                          borderBottom: idx === (ROWS_PER_PAGE - paginatedLeads.length - 1) ? "1px solid #E5E7EB" : "none",
                          height: 56 // 56px matches the height of .py-3 (24px top + 24px bottom + 8px line height)
                        }}
                      />
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-400 bg-white rounded-b-xl"
                    style={{
                      height: ROWS_PER_PAGE * 56,
                      minHeight: 560,
                      verticalAlign: 'middle'
                    }}
                  >
                    No leads found for "{selectedStatus}".
                  </td>
                </tr>
              )}
            </tbody>

            {/* Pagination Row */}
            <tfoot>
              <tr className="">
                <td colSpan={5} className="bg-[#F9FAFB] border-t rounded-bl-xl rounded-xl rounded-br-xl border-gray-200">
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



        {/* Modals */}
        {modalLead && (() => {
          // Completed
          if (modalLead.status === "Completed") {
            return (
              <CompletedModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          // Ongoing
          if (modalLead.status === "Ongoing") {
            return (
              <OngoingModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          // Withdraw Application
          if (modalLead.status === "Applied" && modalLead.pendingStatus === "Approval Pending") {
            return (
              <WithdrawApplicationModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          // Cancel Job
          if (modalLead.status === "Applied" && modalLead.pendingStatus === "Approved") {
            return (
              <CancelJobModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          // New Lead: Modal flow (Apply → Fill Quotation and Apply → QuotationFormModal)
          if (modalLead.status === "New") {
            // Show QuotationFormModal if requested
            if (showQuotationForm) {
              return (
                <QuotationFormModal
                  open={showQuotationForm}
                  onClose={() => {
                    setShowQuotationForm(false);
                    setModalLead(null);
                    setProceed(false);
                    setModalOpen(false);
                  }}
                  onSubmit={() => {
                    setShowQuotationForm(false);
                    setModalLead(null);
                    setProceed(false);
                    setModalOpen(false);
                    // Optionally refresh data or show a message
                  }}
                />
              );
            }
            // Otherwise show NewLeadModal
            return (
              <NewLeadModal
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                  setModalLead(null);
                  setProceed(false);
                  setShowQuotationForm(false);
                }}
                lead={modalLead}
                proceed={proceed}
                onApplyClick={() => setProceed(true)}
                onFillQuotation={() => {
                  setShowQuotationForm(true);
                  setModalOpen(false);
                }}
              />
            );
          }
          // Default fallback (should not happen)
          return null;
        })()}
    </div>
  );
};

export default MyJobs;