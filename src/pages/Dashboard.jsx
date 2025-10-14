import { useUser } from '../UserContext';
import SubscribeStrip from '../components/SubscribeStrip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  MapPin,
  Clock,
  FileText,
  Search,
  Settings,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Briefcase,
  Star,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const subscriptionActive = user?.subscription_active;

  // Chart Data with better colors
  const applicationStatusData = [
    { name: 'Pending Review', value: 8, color: '#f59e0b' },
    { name: 'Accepted', value: 12, color: '#10b981' },
    { name: 'Rejected', value: 3, color: '#f87171' },
    { name: 'Quotation Required', value: 4, color: '#6366f1' }
  ];

  const monthlyJobActivity = [
    { month: 'Jan', newJobs: 15, applications: 8, completed: 5 },
    { month: 'Feb', newJobs: 22, applications: 12, completed: 8 },
    { month: 'Mar', newJobs: 18, applications: 10, completed: 7 },
    { month: 'Apr', newJobs: 25, applications: 15, completed: 12 },
    { month: 'May', newJobs: 30, applications: 18, completed: 15 },
    { month: 'Jun', newJobs: 28, applications: 16, completed: 13 }
  ];

  const serviceJobDistribution = [
    { service: 'Plumbing', jobsApplied: 12, jobsCompleted: 8, jobsAvailable: 6 },
    { service: 'Electrical', jobsApplied: 15, jobsCompleted: 11, jobsAvailable: 4 },
    { service: 'Cleaning', jobsApplied: 8, jobsCompleted: 5, jobsAvailable: 9 },
    { service: 'HVAC', jobsApplied: 10, jobsCompleted: 7, jobsAvailable: 3 }
  ];

  // Jobs Data
  const availableJobs = [
    {
      id: 1,
      title: 'Plumbing Repair - Kitchen Sink',
      society: 'Green Valley Society',
      location: 'Sector 12, Noida',
      posted: '2h ago',
      urgent: true,
      quotationRequired: false,
      type: 'Emergency'
    },
    {
      id: 2,
      title: 'Electrical Panel Maintenance',
      society: 'Sunrise Apartments',
      location: 'Gurgaon',
      posted: '5h ago',
      urgent: false,
      quotationRequired: true,
      type: 'Regular'
    },
    {
      id: 3,
      title: 'HVAC System Installation',
      society: 'Royal Gardens',
      location: 'Delhi',
      posted: '1d ago',
      urgent: false,
      quotationRequired: true,
      type: 'Project'
    }
  ];

  const recentApplications = [
    {
      id: '#2847',
      society: 'Metro Heights',
      service: 'Cleaning Services',
      appliedDate: '2 days ago',
      status: 'Under Review',
      quotationSubmitted: false
    },
    {
      id: '#2846',
      society: 'Park View Society',
      service: 'Garden Maintenance',
      appliedDate: '3 days ago',
      status: 'Quotation Submitted',
      quotationSubmitted: true
    },
    {
      id: '#2845',
      society: 'City Center',
      service: 'Painting Work',
      appliedDate: '5 days ago',
      status: 'Accepted',
      quotationSubmitted: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'text-emerald-700 bg-emerald-50';
      case 'under review': return 'text-amber-700 bg-amber-50';
      case 'quotation submitted': return 'text-indigo-700 bg-indigo-50';
      case 'rejected': return 'text-rose-700 bg-rose-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      {!subscriptionActive && <SubscribeStrip />}

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome back, {user?.name || 'Vendor'}
          </p>
        </div>

        {/* Stats Cards with better colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Available Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <Search className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Applications Sent</p>
                <p className="text-2xl font-semibold text-gray-900">27</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Jobs Completed</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Services</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Settings className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section with updated colors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Job Activity */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Job Activity</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-800 text-white rounded-md">Monthly</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Weekly</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyJobActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="newJobs"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                    name="New Jobs Posted"
                  />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    name="Applications Sent"
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Jobs Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service-wise Job Distribution */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Jobs by Service</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-slate-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Applied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Completed</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceJobDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="service"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="jobsAvailable" fill="#64748b" radius={[4, 4, 0, 0]} name="Available Jobs" />
                  <Bar dataKey="jobsApplied" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Applied Jobs" />
                  <Bar dataKey="jobsCompleted" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed Jobs" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Jobs */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Available Jobs</h3>
              <button className="text-sm bg-gray-800 text-white font-medium px-3 py-2 rounded-md hover:bg-gray-700">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {availableJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.society}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.type === 'Emergency' ? 'bg-rose-50 text-rose-700' :
                          job.type === 'Project' ? 'bg-indigo-50 text-indigo-700' :
                            'bg-slate-50 text-slate-700'
                        }`}>
                        {job.type}
                      </span>
                      {job.quotationRequired && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                          Quotation Required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Applications</h3>

            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{app.service}</p>
                      <p className="text-xs text-gray-500">{app.society}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {app.quotationSubmitted && (
                        <FileText className="w-3 h-3 text-indigo-500" />
                      )}
                      <span className="text-xs text-gray-500">Applied {app.appliedDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
