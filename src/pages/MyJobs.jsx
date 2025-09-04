import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  RefreshCw,
} from "lucide-react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { FileText, Hourglass, CheckSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import dummyData from "../static/dummyData_Leads";
import NewLeadModal from "../components/modals/NewLeadModal";
import QuotationFormModal from "../components/modals/QuotationFormModal";
import OngoingModal from "../components/modals/OngoingModal";
import CompletedModal from "../components/modals/CompletedModal";
import WithdrawApplicationModal from "../components/modals/WithdrawApplicationModal";
import CancelJobModal from "../components/modals/CancelJobModal";
import { useUser } from "../UserContext";
import AccessLockedModal from "../components/modals/AccessLockedModal";
import { getMyAppliedJobs } from "../services/api/jobs";
import { getJobDetailsById } from "../services/api/jobs";

const MotionButton = motion(Button);

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
  const [dayPart, monthPart, yearPart] = str
    .replace(/(st|nd|rd|th)/, "")
    .replace(",", "")
    .split(" ");
  const year = yearPart.length === 2 ? `20${yearPart}` : yearPart;
  return new Date(`${monthPart} ${dayPart} ${year}`);
};

const MyJobs = () => {
  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive); // Open modal if no subscription

  // Redirect to dashboard when access locked modal closes
  const handleModalClose = () => {
    navigate("/dashboard");
  };

  // Manage modal states
  const [modalLead, setModalLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  // Set the initial filter based on navigation state or default to "All"
  const [selectedStatus, setSelectedStatus] = useState(
    location.state?.filter || "All"
  );

  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchWork, setSearchWork] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobStatuses = [
    {
      name: "New",
      color: "text-blue-600",
      icon: FileText,
      count: dummyData.filter((lead) => lead.status === "New").length,
    },
    {
      name: "Ongoing",
      color: "text-yellow-600",
      icon: Hourglass,
      count: dummyData.filter((lead) => lead.status === "Ongoing").length,
    },
    {
      name: "Completed",
      color: "text-green-600",
      icon: CheckSquare,
      count: dummyData.filter((lead) => lead.status === "Completed").length,
    },
    {
      name: "Applied",
      color: "text-purple-600",
      icon: Send,
      count: dummyData.filter((lead) => lead.status === "Applied").length,
    },
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

  useEffect(() => {
    setJobs(dummyData); // Use dummyData directly
  }, []);

  // Filtered leads (add search filter)
  const filteredLeads = (
    selectedStatus === "All"
      ? jobs
      : jobs.filter((lead) => lead.status === selectedStatus)
  ).filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) &&
      lead.work.toLowerCase().includes(searchWork.toLowerCase())
  );

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const dateA = parsePostedOn(a.postedOn);
    const dateB = parsePostedOn(b.postedOn);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Pagination logic
  const totalResults = sortedLeads.length;
  const totalPages = Math.ceil(totalResults / ROWS_PER_PAGE);
  const startIdx = (page - 1) * ROWS_PER_PAGE;
  const endIdx = Math.min(startIdx + ROWS_PER_PAGE, totalResults);
  const paginatedLeads = sortedLeads.slice(startIdx, endIdx);

  const handleSortToggle = () => {
    setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  // Modal logic
  // const handleView = (lead) => {
  //   setModalLead(lead);
  //   setModalOpen(true);
  //   setProceed(false);
  //   setShowQuotationForm(false);
  // };

  const handleView = async (lead) => {
    // Temporarily using local/dummy lead data instead of API response
    // const jobDetails = await getJobDetailsById(lead.id);
    // console.log('Job Details:', jobDetails);
    setModalLead(lead); // use the passed-in lead directly
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

  const handleCancel = (lead) => {
    setModalLead(lead);
    setModalOpen(true);
    setProceed(false); // Ensure modal opens in cancel mode
  };

  const handleWithdraw = (lead) => {
    setModalLead(lead);
    setModalOpen(true);
    setProceed(true); // Ensure modal opens in withdraw mode
  };

  return (
    <div className="relative flex flex-col gap-8 px-2 pt-3 pb-5 w-full">
      {/* Render AccessLockedModal as an overlay if subscription is inactive */}
      {!subscriptionActive && (
        <AccessLockedModal
          open={isModalOpen}
          onClose={handleModalClose}
          heading="Access Restricted"
          subheading="Subscribe to view all job details and unlock premium features."
        />
      )}

      {/* Main content of MyJobs page */}
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
          {/* Overlay gradients & accent bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 via-transparent to-indigo-50/60" />
          <div className="absolute top-0 left-0 h-1 w-40 bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent rounded-br-full" />
          <div className="relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-inner shadow-blue-800/10 ring-1 ring-white/30">
                <BusinessCenterIcon
                  sx={{ color: "#FFFFFF", fontSize: { xs: 26, sm: 30 } }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1
                  style={{ fontFamily: "Manrope" }}
                  className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 tracking-tight"
                >
                  My Jobs
                </h1>
                <p
                  style={{ fontFamily: "Lato" }}
                  className="text-xs sm:text-sm text-slate-500 mt-0.5"
                >
                  Manage leads, applications and job progress
                </p>
              </div>
            </div>
            {/* Reserved space for future actions / filters */}
            {/* <div className="flex items-center gap-4 self-stretch sm:self-auto" /> */}
          </div>
        </motion.div>

        {/* Job Status Cards Section (corporate look on desktop) */}
        <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6 sm:justify-start sm:items-center">
          {jobStatuses.map((status) => (
            <motion.div
              key={status.name}
              className="bg-white w-full sm:w-52 p-3 sm:p-4 border border-gray-100 rounded-xl sm:shadow-sm flex items-center gap-3 transition-transform duration-150 hover:scale-[1.02] cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    status.name === "New"
                      ? "bg-blue-50"
                      : status.name === "Ongoing"
                      ? "bg-yellow-50"
                      : status.name === "Completed"
                      ? "bg-green-50"
                      : "bg-purple-50"
                  }`}
                >
                  <status.icon className={`w-5 h-5 ${status.color}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p
                      style={{ fontFamily: "Lato" }}
                      className="text-sm text-gray-700 font-semibold truncate"
                    >
                      {status.name}
                    </p>
                    <p
                      style={{ fontFamily: "Lato" }}
                      className="text-xs text-gray-500 mt-0.5"
                    >
                      Overview
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${status.color}`}>
                      {status.count}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Table - Desktop (sm+) */}
      <motion.div
        className="hidden sm:block border-solid border border-gray-300 rounded-xl mx-2"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full overflow-x-auto rounded-xl">
          <table
            className="min-w-[1000px] w-full bg-white shadow border rounded-xl table-fixed border-collapse"
            style={{ minWidth: "900px" }}
          >
            <thead>
              {/* Search Row */}
              <tr>
                <th
                  colSpan={5}
                  className="bg-slate-100/80 rounded-tl-xl rounded-tr-xl"
                >
                  <div
                    className="flex flex-col gap-3 px-4 py-3"
                    style={{ borderBottom: "1px solid #d1d5db" }}
                  >
                    <div className="flex justify-between flex-wrap gap-6">
                      <div className="flex gap-6">
                        <TextField
                          value={search}
                          onChange={(e) => {
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
                            endAdornment: search && (
                              <InputAdornment position="end">
                                <CloseIcon
                                  fontSize="small"
                                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                                  onClick={() => {
                                    setSearch("");
                                    setPage(1);
                                  }}
                                />
                              </InputAdornment>
                            ),
                            style: { borderRadius: 8, background: "white" },
                          }}
                          sx={{ width: 220 }}
                        />
                        <TextField
                          value={searchWork}
                          onChange={(e) => {
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
                            endAdornment: searchWork && (
                              <InputAdornment position="end">
                                <CloseIcon
                                  fontSize="small"
                                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                                  onClick={() => {
                                    setSearchWork("");
                                    setPage(1);
                                  }}
                                />
                              </InputAdornment>
                            ),
                            style: { borderRadius: 8, background: "white" },
                          }}
                          sx={{ width: 220 }}
                        />
                      </div>

                      <div className="hidden mr-4 sm:flex items-center gap-4 flex-wrap">
                        <Button
                          size="medium"
                          variant="outlined"
                          onClick={handleStatusClick}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            color: "#0f172a",
                            borderColor: "rgba(15,23,42,0.15)",
                            background: "#FFFFFF",
                            "&:hover": {
                              borderColor: "#1976D2",
                              background: "#F1F5F9",
                            },
                          }}
                        >
                          Status: {selectedStatus}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="ml-1"
                            aria-hidden
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="#475569"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>

                        <Button
                          size="medium"
                          variant="outlined"
                          onClick={handleSortToggle}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            color: "#1976D2",
                            borderColor: "#1976D2",
                            "&:hover": {
                              background: "#EFF6FF",
                              borderColor: "#1976D2",
                            },
                          }}
                          aria-label={`Sort by posted date ${
                            sortOrder === "asc" ? "descending" : "ascending"
                          }`}
                        >
                          Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
                          {sortOrder === "asc" ? (
                            <ArrowUp size={16} className="ml-1" />
                          ) : (
                            <ArrowDown size={16} className="ml-1" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* New filter & sort row for mobile */}
                    <div className="flex sm:hidden items-center gap-4 flex-wrap">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleStatusClick}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 600,
                          color: "#0f172a",
                          borderColor: "rgba(15,23,42,0.15)",
                          background: "#FFFFFF",
                          "&:hover": {
                            borderColor: "#1976D2",
                            background: "#F1F5F9",
                          },
                        }}
                      >
                        Status: {selectedStatus}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="ml-1"
                          aria-hidden
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="#475569"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleSortToggle}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 600,
                          color: "#1976D2",
                          borderColor: "#1976D2",
                          "&:hover": {
                            background: "#EFF6FF",
                            borderColor: "#1976D2",
                          },
                        }}
                        aria-label={`Sort by posted date ${
                          sortOrder === "asc" ? "descending" : "ascending"
                        }`}
                      >
                        Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
                        {sortOrder === "asc" ? (
                          <ArrowUp size={16} className="ml-1" />
                        ) : (
                          <ArrowDown size={16} className="ml-1" />
                        )}
                      </Button>
                    </div>
                  </div>
                </th>
                {/* Status options menu (opens when statusAnchorEl is set) */}
                <Menu
                  anchorEl={statusAnchorEl}
                  open={Boolean(statusAnchorEl)}
                  onClose={handleStatusClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.label}
                      selected={selectedStatus === option.label}
                      onClick={() => handleStatusSelect(option.label)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </tr>
              {/* Table Head Row */}
              <tr
                className="bg-slate-100/70 text-slate-700"
                style={{ borderBottom: "1px solid #d1d5db" }}
              >
                <th className="py-4 px-4 text-left text-sm font-bold w-36 sm:w-48 md:w-56">
                  LEAD NAME
                </th>
                <th className="py-4 text-center text-sm font-bold w-32 sm:w-40 md:w-48">
                  WORK
                </th>
                <th className="py-4 text-center text-sm font-bold w-28 sm:w-32 md:w-44">
                  STATUS
                </th>
                <th className="py-4 text-center text-sm font-bold w-28 sm:w-32 md:w-36">
                  POSTED ON
                </th>
                <th className="py-4 text-center text-sm font-bold w-24 sm:w-28 md:w-32">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedLeads.length > 0 ? (
                <>
                  {paginatedLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="odd:bg-white even:bg-slate-50/60 hover:bg-blue-50 transition"
                      style={{ borderBottom: "1px solid #E5E7EB" }}
                    >
                      <td className="py-3 px-4">
                        {lead.name}
                        {lead.interested && (
                          <span
                            className="ml-2 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-md text-green-800 bg-green-50"
                            style={{ border: "1px solid #86efac" }}
                          >
                            Interested
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-grid border-solid place-items-center grid-cols-[auto_auto] gap-2 px-2 py-1 bg-gray-50 rounded-md border border-gray-200 w-fit mx-auto">
                          <WrenchScrewdriverIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {lead.work}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        {lead.status === "Applied" ? (
                          <span
                            className={`px-4 py-2 w-fit rounded-full text-sm font-semibold
                              ${
                                lead.pendingStatus === "Approval Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : lead.pendingStatus === "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                            `}
                          >
                            {lead.pendingStatus}
                          </span>
                        ) : (
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              lead.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : lead.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-700"
                                : lead.status === "New"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            {lead.status} {lead.status === "New" ? "!" : ""}
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-center">
                        <div>{lead.postedOn}</div>
                        <div className="text-xs text-gray-500">{lead.time}</div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {lead.status === "New" ? (
                          lead.interested ? (
                            <MotionButton
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 4px 16px rgba(16, 185, 129, 0.10)",
                              }}
                              whileTap={{ y: 1 }}
                              transition={{ type: "tween" }}
                              variant="outlined"
                              size="small"
                              sx={{
                                minWidth: 100,
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 600,
                                color: "green",
                                borderColor: "green",
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
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 4px 16px rgba(33, 150, 243, 0.10)",
                              }}
                              whileTap={{ y: 1 }}
                              transition={{ type: "tween" }}
                              variant="outlined"
                              size="small"
                              sx={{
                                minWidth: 100,
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 800,
                                color: "#1976D2",
                                borderColor: "#1976D2",
                              }}
                              onClick={() => {
                                setModalLead(lead);
                                setModalOpen(true);
                                setProceed(false);
                              }}
                            >
                              Apply
                            </MotionButton>
                          )
                        ) : lead.status === "Applied" ? (
                          lead.pendingStatus === "Approval Pending" ? (
                            <MotionButton
                              whileHover={{
                                y: -2,
                                boxShadow: "0 4px 16px rgba(255, 152, 0, 0.10)",
                              }}
                              whileTap={{ y: 1 }}
                              transition={{ type: "tween" }}
                              variant="outlined"
                              size="small"
                              sx={{
                                minWidth: 100,
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 600,
                                color: "#ff9800",
                                borderColor: "#ff9800",
                              }}
                              onClick={() => handleWithdraw(lead)}
                            >
                              Withdraw
                            </MotionButton>
                          ) : lead.pendingStatus === "Approved" ? (
                            <MotionButton
                              whileHover={{
                                y: -2,
                                boxShadow: "0 4px 16px rgba(229, 57, 53, 0.10)",
                              }}
                              whileTap={{ y: 1 }}
                              transition={{ type: "tween" }}
                              variant="outlined"
                              size="small"
                              sx={{
                                minWidth: 100,
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 600,
                                color: "#e53935",
                                borderColor: "#e53935",
                              }}
                              onClick={() => handleCancel(lead)}
                            >
                              Cancel
                            </MotionButton>
                          ) : (
                            <MotionButton
                              whileHover={{
                                y: -2,
                                boxShadow: "0 4px 16px rgba(255, 179, 0, 0.10)",
                              }}
                              whileTap={{ y: 1 }}
                              transition={{ type: "tween" }}
                              variant="outlined"
                              size="small"
                              sx={{
                                minWidth: 100,
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 600,
                                color: "#FFB300",
                                borderColor: "#FFB300",
                                background: "#FFF8E1",
                              }}
                              onClick={() => handleView(lead)}
                            >
                              View
                            </MotionButton>
                          )
                        ) : lead.status === "Completed" ? (
                          <MotionButton
                            whileHover={{
                              y: -2,
                              boxShadow: "0 4px 16px rgba(33, 150, 243, 0.10)",
                            }}
                            whileTap={{ y: 1 }}
                            transition={{ type: "tween" }}
                            variant="outlined"
                            size="small"
                            sx={{
                              minWidth: 100,
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 500,
                              color: "green",
                              borderColor: "green",
                            }}
                            onClick={() => handleView(lead)}
                          >
                            Ratings
                          </MotionButton>
                        ) : (
                          <MotionButton
                            whileHover={{
                              y: -2,
                              boxShadow: "0 4px 16px rgba(255, 179, 0, 0.10)",
                            }}
                            whileTap={{ y: 1 }}
                            transition={{ type: "tween" }}
                            variant="outlined"
                            size="small"
                            sx={{
                              minWidth: 100,
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 600,
                              color: "#FFB300",
                              borderColor: "#FFB300",
                            }}
                            onClick={() => handleView(lead)}
                          >
                            View
                          </MotionButton>
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* Add empty rows if less than 10 entries on this page */}
                  {Array.from({
                    length: ROWS_PER_PAGE - paginatedLeads.length,
                  }).map((_, idx) => (
                    <tr key={`empty-${idx}`}>
                      <td
                        colSpan={5}
                        className="py-3 px-4"
                        style={{
                          background: "#fff",
                          borderBottom:
                            idx === ROWS_PER_PAGE - paginatedLeads.length - 1
                              ? "1px solid #E5E7EB"
                              : "none",
                          height: 56,
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
                      verticalAlign: "middle",
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
                <td
                  colSpan={5}
                  className="bg-[#F9FAFB] border-t rounded-bl-xl rounded-xl rounded-br-xl border-gray-200"
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-gray-600 text-sm">
                      {totalResults === 0
                        ? "Showing 0 results"
                        : `Showing ${
                            startIdx + 1
                          } to ${endIdx} of ${totalResults} results`}
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
                          color: page === 1 ? "#bdbdbd" : "#1976D2",
                          borderColor: page === 1 ? "#e0e0e0" : "#1976D2",
                          "&:hover": {
                            borderColor: "#1976D2",
                            background: "#F3F4F6",
                          },
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
                          color:
                            page === totalPages || totalResults === 0
                              ? "#bdbdbd"
                              : "#1976D2",
                          borderColor:
                            page === totalPages || totalResults === 0
                              ? "#e0e0e0"
                              : "#1976D2",
                          "&:hover": {
                            borderColor: "#1976D2",
                            background: "#F3F4F6",
                          },
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

      {/* Mobile list view for jobs (<sm) - stacked cards */}
      <motion.div
        className="sm:hidden border-solid border border-gray-300 bg-slate-100 rounded-xl mx-2"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-3 rounded-xl">
          {/* Mobile search card */}
          <div className="bg-slate-100 p-3 mb-2" style={{ borderTopRightRadius: '12px', borderTopLeftRadius: '12px', borderBottom: '1px solid #9ca3af' }}>
            <div className="flex flex-col gap-3">
              <div className="flex-1 min-w-0 flex gap-4">
                <TextField
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
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
                    endAdornment: search && (
                      <InputAdornment position="end">
                        <CloseIcon
                          fontSize="small"
                          className="cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            setSearch("");
                            setPage(1);
                          }}
                        />
                      </InputAdornment>
                    ),
                    style: { borderRadius: 8, background: "white" },
                  }}
                />
                <TextField
                  value={searchWork}
                  onChange={(e) => {
                    setSearchWork(e.target.value);
                    setPage(1);
                  }}
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
                    endAdornment: searchWork && (
                      <InputAdornment position="end">
                        <CloseIcon
                          fontSize="small"
                          className="cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            setSearchWork("");
                            setPage(1);
                          }}
                        />
                      </InputAdornment>
                    ),
                    style: { borderRadius: 8, background: "white" },
                  }}
                />
              </div>
              {/* New filter & sort row (mobile) */}
              <div className="flex items-center gap-4">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleStatusClick}
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    color: "#0f172a",
                    borderColor: "rgba(15,23,42,0.15)",
                    background: "#FFFFFF",
                    "&:hover": {
                      borderColor: "#1976D2",
                      background: "#F1F5F9",
                    },
                  }}
                >
                  Status: {selectedStatus}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-1"
                    aria-hidden
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleSortToggle}
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    color: "#1976D2",
                    borderColor: "#1976D2",
                    "&:hover": {
                      background: "#EFF6FF",
                      borderColor: "#1976D2",
                    },
                  }}
                  aria-label={`Sort by posted date ${
                    sortOrder === "asc" ? "descending" : "ascending"
                  }`}
                >
                  Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}{" "}
                  {sortOrder === "asc" ? (
                    <ArrowUp size={16} className="ml-1" />
                  ) : (
                    <ArrowDown size={16} className="ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 px-3">
            {paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-xl shadow-md border-solid border border-gray-100 p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-100">
                        <WrenchScrewdriverIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-800 truncate">
                              {lead.name}
                            </h3>
                            {lead.interested && (
                              <span className="text-xs font-semibold text-green-800 bg-green-50 px-2 py-0.5 rounded">
                                Interested
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 truncate">
                            {lead.work}
                          </div>
                        </div>

                        <div className="text-right text-xs text-gray-400">
                          <div className="font-medium text-gray-500">
                            {lead.postedOn}
                          </div>
                          <div className="mt-1">{lead.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-6 border-solid border border-t border-gray-100" />
                  <div className="flex mt-1 justify-center">
                    {/* Mobile action buttons centered & responsive */}
                    {lead.status === "New" ? (
                      lead.interested ? (
                        <Button
                          variant="outlined"
                          size="medium"
                          sx={{
                            display: "block",
                            mx: "auto",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            width: "min(350px,62%)",
                            color: "green",
                            borderColor: "green",
                            boxShadow: "0 2px 6px rgba(16,185,129,0.06)",
                            "&:hover": {
                              borderColor: "darkgreen",
                              background: "#F0FFF4",
                            },
                          }}
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
                          sx={{
                            display: "block",
                            mx: "auto",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 800,
                            width: "min(350px,62%)",
                            color: "#1976D2",
                            borderColor: "#1976D2",
                          }}
                          onClick={() => {
                            setModalLead(lead);
                            setModalOpen(true);
                            setProceed(false);
                          }}
                        >
                          Apply
                        </Button>
                      )
                    ) : lead.status === "Applied" ? (
                      lead.pendingStatus === "Approval Pending" ? (
                        <Button
                          variant="outlined"
                          size="medium"
                          sx={{
                            display: "block",
                            mx: "auto",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            width: "min(350px,62%)",
                            color: "#ff9800",
                            borderColor: "#ff9800",
                          }}
                          onClick={() => handleWithdraw(lead)}
                        >
                          Withdraw
                        </Button>
                      ) : lead.pendingStatus === "Approved" ? (
                        <Button
                          variant="outlined"
                          size="medium"
                          sx={{
                            display: "block",
                            mx: "auto",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            width: "min(350px,62%)",
                            color: "#e53935",
                            borderColor: "#e53935",
                          }}
                          onClick={() => handleCancel(lead)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="medium"
                          sx={{
                            display: "block",
                            mx: "auto",
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            width: "min(350px,62%)",
                            color: "#FFB300",
                            borderColor: "#FFB300",
                            background: "#FFF8E1",
                          }}
                          onClick={() => handleView(lead)}
                        >
                          View
                        </Button>
                      )
                    ) : lead.status === "Completed" ? (
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          display: "block",
                          mx: "auto",
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 500,
                          width: "min(350px,62%)",
                          color: "green",
                          borderColor: "green",
                        }}
                        onClick={() => handleView(lead)}
                      >
                        Ratings
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          display: "block",
                          mx: "auto",
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 600,
                          width: "min(350px,62%)",
                          color: "#FFB300",
                          borderColor: "#FFB300",
                        }}
                        onClick={() => handleView(lead)}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center text-center py-8 min-h-96 text-gray-400">
                No jobs found.
              </div>
            )}
          </div>
        </div>

        {/* Mobile pagination controls */}
        <div className="bg-[#F9FAFB] rounded-bl-xl rounded-br-xl mt-3" style={{ borderTop: "1px solid #d1d5db"}}>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-gray-600 text-sm">
              {totalResults === 0
                ? "Showing 0 results"
                : `Showing ${
                    startIdx + 1
                  } to ${endIdx} of ${totalResults} results`}
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
                  px: 0.5,
                  fontWeight: 600,
                  color: page === 1 ? "#bdbdbd" : "#1976D2",
                  borderColor: page === 1 ? "#e0e0e0" : "#1976D2",
                  "&:hover": { borderColor: "#1976D2", background: "#F3F4F6" },
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
                  px: 0.5,
                  fontWeight: 600,
                  color:
                    page === totalPages || totalResults === 0
                      ? "#bdbdbd"
                      : "#1976D2",
                  borderColor:
                    page === totalPages || totalResults === 0
                      ? "#e0e0e0"
                      : "#1976D2",
                  "&:hover": { borderColor: "#1976D2", background: "#F3F4F6" },
                }}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {modalLead &&
        (() => {
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
          if (
            modalLead.status === "Applied" &&
            modalLead.pendingStatus === "Approval Pending"
          ) {
            return (
              <WithdrawApplicationModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          // Cancel Job
          if (
            modalLead.status === "Applied" &&
            modalLead.pendingStatus === "Approved"
          ) {
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
