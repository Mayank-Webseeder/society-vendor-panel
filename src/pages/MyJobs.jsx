import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Briefcase,
  Clock,
  CheckCircle,
  FileText,
  XCircle,
  Eye,
  X,
  Send,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import dummyData from '../static/dummyData_Leads';
import { useUser } from '../UserContext';
import AccessLockedModal from '../components/modals/AccessLockedModal';
import NewLeadModal from '../components/modals/NewLeadModal';
import QuotationFormModal from '../components/modals/QuotationFormModal';
import OngoingModal from '../components/modals/OngoingModal';
import CompletedModal from '../components/modals/CompletedModal';
import WithdrawApplicationModal from '../components/modals/WithdrawApplicationModal';
import CancelJobModal from '../components/modals/CancelJobModal';

const MyJobs = () => {
  const { user } = useUser();
  const subscriptionActive = user?.subscription_active;
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive);

  const handleModalClose = () => {
    navigate('/dashboard');
  };

  // State management
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(location.state?.filter || '');
  const [selectedService, setSelectedService] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [quotationFilter, setQuotationFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Modal states
  const [modalLead, setModalLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  const ITEMS_PER_PAGE = 10;

  // Filter out 'New' jobs since they have their own page
  const myJobs = dummyData.filter(job => job.status !== 'New');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setJobs(myJobs);
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(myJobs);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Calculate statistics
  const stats = {
    totalApplications: jobs.filter(job => ['Applied', 'Ongoing', 'Completed'].includes(job.status)).length,
    pending: jobs.filter(job => job.status === 'Applied' && job.pendingStatus === 'Approval Pending').length,
    ongoing: jobs.filter(job => job.status === 'Ongoing').length,
    completed: jobs.filter(job => job.status === 'Completed').length
  };

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.work.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || job.status === selectedStatus;
    const matchesService = !selectedService || job.work.toLowerCase().includes(selectedService.toLowerCase());
    const matchesPriority = !selectedPriority ||
      (selectedPriority === 'High' && job.urgent) ||
      (selectedPriority === 'Normal' && !job.urgent);
    const matchesQuotation = !quotationFilter ||
      (quotationFilter === 'Required' && job.quotationRequired) ||
      (quotationFilter === 'Not Required' && !job.quotationRequired);

    return matchesSearch && matchesStatus && matchesService && matchesPriority && matchesQuotation;
  });

  const parsePostedOn = (str) => {
    if (!str) return new Date(0);
    const [dayPart, monthPart, yearPart] = str.replace(/(st|nd|rd|th)/, '').replace(',', '').split(' ');
    const year = yearPart.length === 2 ? `20${yearPart}` : yearPart;
    return new Date(`${monthPart} ${dayPart} ${year}`);
  };

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = parsePostedOn(a.postedOn);
    const dateB = parsePostedOn(b.postedOn);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = sortedJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusBadge = (job) => {
    const statusConfig = {
      'Applied': {
        color: job.pendingStatus === 'Approved' ? 'bg-green-100 text-green-700' :
          job.pendingStatus === 'Approval Pending' ? 'bg-orange-100 text-orange-700' :
            'bg-blue-100 text-blue-700',
        text: job.pendingStatus || 'Applied'
      },
      'Ongoing': { color: 'bg-amber-100 text-amber-700', text: 'In Progress' },
      'Completed': { color: 'bg-green-100 text-green-700', text: 'Completed' }
    };

    const config = statusConfig[job.status] || { color: 'bg-gray-100 text-gray-700', text: job.status };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getActionButton = (job) => {
    const handleView = async (lead) => {
      setModalLead(lead);
      setModalOpen(true);
      setProceed(false);
      setShowQuotationForm(false);
    };

    const handleCancel = (lead) => {
      setModalLead(lead);
      setModalOpen(true);
      setProceed(false);
    };

    const handleWithdraw = (lead) => {
      setModalLead(lead);
      setModalOpen(true);
      setProceed(true);
    };

    switch (job.status) {
      case 'Applied':
        if (job.pendingStatus === 'Approval Pending') {
          return (
            <button
              onClick={() => handleWithdraw(job)}
              className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
            >
              Withdraw
            </button>
          );
        } else if (job.pendingStatus === 'Approved') {
          return (
            <button
              onClick={() => handleCancel(job)}
              className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          );
        }
        return (
          <button
            onClick={() => handleView(job)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
        );
      case 'Ongoing':
        return (
          <button
            onClick={() => handleView(job)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        );
      case 'Completed':
        return (
          <button
            onClick={() => handleView(job)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            View Rating
          </button>
        );
      default:
        return (
          <button
            onClick={() => handleView(job)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
        );
    }
  };

  const clearFilters = () => {
    setSelectedStatus('');
    setSelectedService('');
    setSelectedPriority('');
    setQuotationFilter('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFiltersCount = [selectedStatus, selectedService, selectedPriority, quotationFilter, searchQuery].filter(Boolean).length;

  // Close modal handler
  const handleCloseModal = () => {
    setModalLead(null);
    setModalOpen(false);
    setProceed(false);
    setShowQuotationForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {!subscriptionActive && (
        <AccessLockedModal
          open={isModalOpen}
          onClose={handleModalClose}
          heading="Access Restricted"
          subheading="Subscribe to view all job details and unlock premium features."
        />
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Jobs</h1>
          <p className="text-gray-600 text-sm">Manage your job applications and track progress</p>
        </div>

        {/* Stats Cards - Same style as dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <Send className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Review</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Ongoing Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.ongoing}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by name or service..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${showFilters || activeFiltersCount > 0
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5" />
              <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Status</option>
                      <option value="Applied">Applied</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Service Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                  <div className="relative">
                    <select
                      value={selectedService}
                      onChange={(e) => {
                        setSelectedService(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Services</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Security">Security</option>
                      <option value="Gardening">Gardening</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <div className="relative">
                    <select
                      value={selectedPriority}
                      onChange={(e) => {
                        setSelectedPriority(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Normal">Normal Priority</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Quotation Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quotation</label>
                  <div className="relative">
                    <select
                      value={quotationFilter}
                      onChange={(e) => {
                        setQuotationFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Jobs</option>
                      <option value="Required">Quotation Required</option>
                      <option value="Not Required">No Quotation</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
            <span>{filteredJobs.length} jobs found</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4 mb-8">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.work}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Posted {job.postedOn}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(job)}
                          {job.interested && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Interested
                            </span>
                          )}
                          {job.urgent && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="lg:w-40">
                    {getActionButton(job)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>

        {/* Pagination - Same style as dashboard */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg font-medium ${currentPage === page
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalLead &&
        (() => {
          if (modalLead.status === 'Completed') {
            return (
              <CompletedModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          if (modalLead.status === 'Ongoing') {
            return (
              <OngoingModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          if (modalLead.status === 'Applied' && modalLead.pendingStatus === 'Approval Pending') {
            return (
              <WithdrawApplicationModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          if (modalLead.status === 'Applied' && modalLead.pendingStatus === 'Approved') {
            return (
              <CancelJobModal
                open={true}
                onClose={handleCloseModal}
                lead={modalLead}
              />
            );
          }
          return null;
        })()}
    </div>
  );
};

export default MyJobs;
