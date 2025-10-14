import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  Briefcase,
  Building2,
  FileText,
  ChevronDown,
  X,
  Eye,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import dummyData from '../static/dummyData_Leads';
import AccessLockedModal from '../components/modals/AccessLockedModal';
import { useUser } from '../UserContext';

const NewLeads = () => {
  const { user } = useUser();
  const subscriptionActive = user?.subscription_active;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive);

  const handleModalClose = () => {
    navigate('/dashboard');
  };

  // Jobs state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [quotationOnly, setQuotationOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Mock enhanced job data
  const enhancedJobs = [
    {
      id: 1,
      title: 'Plumbing System Installation',
      society: 'Green Valley Residency',
      location: 'Sector 12, Noida',
      service: 'Plumbing',
      description: 'Complete plumbing system installation for a 3BHK apartment including kitchen and bathroom fixtures, water supply lines, and drainage systems.',
      requirements: ['5+ years experience', 'Licensed plumber', 'Own tools preferred'],
      urgency: 'High',
      quotationRequired: true,
      postedDate: '2024-10-14',
      applicationDeadline: '2024-10-20',
      estimatedDuration: '3-5 days',
      contactPerson: 'Rajesh Kumar',
      status: 'New'
    },
    {
      id: 2,
      title: 'Electrical Panel Maintenance',
      society: 'Sunrise Apartments',
      location: 'Gurgaon, Haryana',
      service: 'Electrical',
      description: 'Regular maintenance and safety inspection of electrical panels in residential complex. Includes testing, cleaning, and minor repairs.',
      requirements: ['Electrical license required', '3+ years experience', 'Safety certification'],
      urgency: 'Medium',
      quotationRequired: false,
      postedDate: '2024-10-13',
      applicationDeadline: '2024-10-18',
      estimatedDuration: '1-2 days',
      contactPerson: 'Priya Sharma',
      status: 'New'
    },
    {
      id: 3,
      title: 'HVAC System Installation',
      society: 'Royal Gardens',
      location: 'Delhi, NCR',
      service: 'HVAC',
      description: 'Installation of central air conditioning system for common areas including lobby, gym, and community hall.',
      requirements: ['HVAC certification', '7+ years experience', 'Team of 3-4 members'],
      urgency: 'Low',
      quotationRequired: true,
      postedDate: '2024-10-12',
      applicationDeadline: '2024-10-25',
      estimatedDuration: '7-10 days',
      contactPerson: 'Amit Singh',
      status: 'New'
    },
    {
      id: 4,
      title: 'Cleaning Services Contract',
      society: 'Metro Heights',
      location: 'Pune, Maharashtra',
      service: 'Cleaning',
      description: 'Monthly cleaning contract for residential society including common areas, stairs, lifts, and parking areas.',
      requirements: ['Cleaning equipment', 'Insurance coverage', 'Previous society experience'],
      urgency: 'Medium',
      quotationRequired: true,
      postedDate: '2024-10-11',
      applicationDeadline: '2024-10-22',
      estimatedDuration: 'Ongoing',
      contactPerson: 'Sunita Verma',
      status: 'New'
    },
    {
      id: 5,
      title: 'Security System Upgrade',
      society: 'City Center Complex',
      location: 'Mumbai, Maharashtra',
      service: 'Security',
      description: 'Upgrade existing security system with modern CCTV cameras, access control systems, and alarm systems.',
      requirements: ['Security system certification', '5+ years experience', 'Technical support team'],
      urgency: 'High',
      quotationRequired: true,
      postedDate: '2024-10-10',
      applicationDeadline: '2024-10-17',
      estimatedDuration: '5-7 days',
      contactPerson: 'Rohit Gupta',
      status: 'New'
    },
    {
      id: 6,
      title: 'Garden Landscaping Project',
      society: 'Park View Society',
      location: 'Bangalore, Karnataka',
      service: 'Gardening',
      description: 'Complete landscaping of society garden including new plants, irrigation system, and decorative elements.',
      requirements: ['Landscaping experience', 'Plant knowledge', 'Design portfolio'],
      urgency: 'Low',
      quotationRequired: false,
      postedDate: '2024-10-09',
      applicationDeadline: '2024-10-30',
      estimatedDuration: '10-15 days',
      contactPerson: 'Kavita Reddy',
      status: 'New'
    },
    {
      id: 7,
      title: 'Elevator Maintenance Contract',
      society: 'Skyline Towers',
      location: 'Hyderabad, Telangana',
      service: 'Maintenance',
      description: 'Annual maintenance contract for 4 elevators including regular service, emergency repairs, and compliance checks.',
      requirements: ['Elevator technician license', '10+ years experience', '24/7 availability'],
      urgency: 'High',
      quotationRequired: true,
      postedDate: '2024-10-08',
      applicationDeadline: '2024-10-15',
      estimatedDuration: 'Annual contract',
      contactPerson: 'Deepak Kumar',
      status: 'New'
    },
    {
      id: 8,
      title: 'Painting and Wall Repair',
      society: 'Golden Heights',
      location: 'Chennai, Tamil Nadu',
      service: 'Painting',
      description: 'Interior and exterior painting of residential complex including wall repairs, primer application, and finish coating.',
      requirements: ['5+ years painting experience', 'Quality materials', 'Insurance coverage'],
      urgency: 'Medium',
      quotationRequired: false,
      postedDate: '2024-10-07',
      applicationDeadline: '2024-10-21',
      estimatedDuration: '15-20 days',
      contactPerson: 'Tamil Selvan',
      status: 'New'
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setJobs(enhancedJobs);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(enhancedJobs);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.society.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = !selectedService || job.service === selectedService;
    const matchesLocation = !selectedLocation || job.location.includes(selectedLocation);
    const matchesUrgency = !selectedUrgency || job.urgency === selectedUrgency;
    const matchesQuotation = !quotationOnly || job.quotationRequired;

    return matchesSearch && matchesService && matchesLocation && matchesUrgency && matchesQuotation;
  });

  // Calculate statistics
  const stats = {
    total: jobs.length,
    highPriority: jobs.filter(job => job.urgency === 'High').length,
    quotationRequired: jobs.filter(job => job.quotationRequired).length,
    newToday: jobs.filter(job => {
      const today = new Date().toISOString().split('T')[0];
      return job.postedDate === today;
    }).length
  };

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Pagination helpers
  const getVisiblePages = () => {
    const delta = 1;
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 1) {
      range.unshift('...');
      range.unshift(1);
    }

    if (currentPage + delta < totalPages) {
      range.push('...');
      range.push(totalPages);
    }

    return range;
  };

  const services = ['Plumbing', 'Electrical', 'HVAC', 'Cleaning', 'Security', 'Gardening', 'Maintenance', 'Painting'];
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Pune', 'Gurgaon', 'Noida', 'Hyderabad'];
  const urgencyLevels = ['High', 'Medium', 'Low'];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-amber-100 text-amber-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const clearFilters = () => {
    setSelectedService('');
    setSelectedLocation('');
    setSelectedUrgency('');
    setQuotationOnly(false);
    setCurrentPage(1);
  };

  const activeFiltersCount = [selectedService, selectedLocation, selectedUrgency, quotationOnly].filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading available jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {!subscriptionActive && <SubscribeStrip />}

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Available Jobs</h1>
          <p className="text-gray-600 text-sm">Discover new opportunities posted by societies</p>
        </div>

        {/* Stats Cards - EXACTLY like dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Available Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <Briefcase className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.highPriority}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Quotation Required</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.quotationRequired}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">New Today</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.newToday}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, societies, or descriptions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Service Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
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
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={(e) => {
                        setSelectedLocation(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Urgency Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                  <div className="relative">
                    <select
                      value={selectedUrgency}
                      onChange={(e) => {
                        setSelectedUrgency(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">All Urgency</option>
                      {urgencyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Quotation Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quotationOnly}
                      onChange={(e) => {
                        setQuotationOnly(e.target.checked);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Quotation Required</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
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

          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
            <span>{filteredJobs.length} jobs found</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>{job.society}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.estimatedDuration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                            {job.service}
                          </span>
                          <span className={`px-3 py-1 text-sm rounded-full ${getUrgencyColor(job.urgency)}`}>
                            {job.urgency} Priority
                          </span>
                          {job.quotationRequired && (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                              Quotation Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Posted:</span>
                        <p className="font-medium text-gray-900">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Deadline:</span>
                        <p className="font-medium text-gray-900">
                          {new Date(job.applicationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Contact:</span>
                        <p className="font-medium text-gray-900">{job.contactPerson}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="lg:w-48 flex flex-col gap-3">
                    <button className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Apply Now
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />
                      Save Job
                    </button>
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

        {/* Pagination - EXACTLY like dashboard */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`px-3 py-2 rounded-lg font-medium ${currentPage === page
                      ? 'bg-gray-900 text-white'
                      : page === '...'
                        ? 'cursor-default text-gray-400'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}
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
    </div>
  );
};

export default NewLeads;
