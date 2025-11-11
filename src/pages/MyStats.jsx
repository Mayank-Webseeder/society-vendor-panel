import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, TrendingUp, Users, Award, BarChart3, ChevronDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar
} from 'recharts';
import AccessLockedModal from '../components/modals/AccessLockedModal';
import { useUser } from '../UserContext';

const MyStats = () => {
  const { user } = useUser();
  const subscriptionActive = user?.subscription_active;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive);
  const [timeFilter, setTimeFilter] = useState('year');
  
  // API data state
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        // Fetch feedbacks and ratings in parallel
        const [feedbacksRes, ratingsRes] = await Promise.all([
          axios.get(`${baseURL}/api/vendor/getFeedbacks`, config),
          axios.get(`${baseURL}/api/vendor/getRating`, config)
        ]);

        setFeedbacks(feedbacksRes.data.feedbacks || []);
        setAverageRating(ratingsRes.data.averageRating || 0);
        setTotalRatings(ratingsRes.data.totalRatings || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModalClose = () => {
    navigate('/dashboard');
  };

  const ratingBreakdown = {
    5: feedbacks?.filter(r => r.rating === 5).length || 0,
    4: feedbacks?.filter(r => r.rating === 4).length || 0,
    3: feedbacks?.filter(r => r.rating === 3).length || 0,
    2: feedbacks?.filter(r => r.rating === 2).length || 0,
    1: feedbacks?.filter(r => r.rating === 1).length || 0,
  };

  const positiveRatings = ratingBreakdown[5] + ratingBreakdown[4];
  const positivePercentage = totalRatings > 0 ? ((positiveRatings / totalRatings) * 100).toFixed(1) : '0.0';

  // Chart data
  const barChartData = [
    { name: '5 Star', count: ratingBreakdown[5], fill: '#10b981' },
    { name: '4 Star', count: ratingBreakdown[4], fill: '#3b82f6' },
    { name: '3 Star', count: ratingBreakdown[3], fill: '#f59e0b' },
    { name: '2 Star', count: ratingBreakdown[2], fill: '#f97316' },
    { name: '1 Star', count: ratingBreakdown[1], fill: '#ef4444' }
  ];

  const pieChartData = [
    { name: 'Excellent (5★)', value: ratingBreakdown[5], fill: '#10b981' },
    { name: 'Good (4★)', value: ratingBreakdown[4], fill: '#3b82f6' },
    { name: 'Average (3★)', value: ratingBreakdown[3], fill: '#f59e0b' },
    { name: 'Poor (2★)', value: ratingBreakdown[2], fill: '#f97316' },
    { name: 'Bad (1★)', value: ratingBreakdown[1], fill: '#ef4444' }
  ].filter(item => item.value > 0);

  // Calculate monthly trend from actual feedbacks
  const calculateMonthlyTrend = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6Months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      const monthFeedbacks = feedbacks.filter(f => {
        const feedbackDate = new Date(f.createdAt);
        return feedbackDate.getFullYear() === date.getFullYear() && 
               feedbackDate.getMonth() === date.getMonth();
      });
      
      const avgRating = monthFeedbacks.length > 0
        ? monthFeedbacks.reduce((sum, f) => sum + f.rating, 0) / monthFeedbacks.length
        : 0;
      
      last6Months.push({
        month: monthNames[date.getMonth()],
        rating: parseFloat(avgRating.toFixed(1)),
        reviews: monthFeedbacks.length
      });
    }
    
    return last6Months;
  };

  const monthlyTrend = calculateMonthlyTrend();

  const radialData = [
    { name: 'Satisfaction', value: parseFloat(positivePercentage), fill: '#10b981' }
  ];

  const StarRating = ({ rating, size = 'w-4 h-4' }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
            }`}
        />
      ))}
    </div>
  );

  const formatTimeAgo = (createdAt) => {
    const reviewDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - reviewDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Ratings & Reviews</h1>
                <p className="text-gray-600 text-sm">Track your performance and customer feedback</p>
              </div>
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Overall Rating</p>
                    <p className="text-2xl font-semibold text-gray-900">{averageRating.toFixed(1)}</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Reviews</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalRatings}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Positive Reviews</p>
                    <p className="text-2xl font-semibold text-gray-900">{positivePercentage}%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">5-Star Reviews</p>
                    <p className="text-2xl font-semibold text-gray-900">{ratingBreakdown[5]}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
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
                      <Bar
                        dataKey="count"
                        radius={[4, 4, 0, 0]}
                        name="Reviews"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div> */}

              {/* Rating Breakdown Pie Chart */}
              {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Rating Breakdown</h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                    <StarRating rating={Math.round(averageRating)} size="w-4 h-4" />
                  </div>
                </div>
                <div className="h-80">
                  {pieChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value, percent }) => `${value} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No rating data available</p>
                    </div>
                  )}
                </div>
              </div> */}
            </div>

            {/* Trend Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Rating Trend</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                      />
                      <YAxis
                        domain={[0, 5]}
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
                        dataKey="rating"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                        name="Average Rating"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div> */}

              {/* Customer Satisfaction Gauge */}
              {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Satisfaction</h3>
                  <p className="text-sm text-gray-600">4+ star ratings</p>
                </div>
                <div className="h-80 flex items-center justify-center">
                  <div className="relative">
                    <ResponsiveContainer width={200} height={200}>
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="90%"
                        data={radialData}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <RadialBar
                          dataKey="value"
                          cornerRadius={10}
                          fill="#10b981"
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{positivePercentage}%</div>
                        <div className="text-sm text-gray-500">Satisfied</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reviews</h3>
              {feedbacks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {feedbacks.slice(0, 5).map((review) => (
                    <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {review.society?.username?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.society?.username || 'Anonymous'}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <StarRating rating={review.rating} size="w-4 h-4" />
                              <span className="text-sm text-gray-500">{formatTimeAgo(review.createdAt)}</span>
                              {review.job?.type && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {review.job.type}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-14">{review.feedbackText}</p>
                      {review.job?.title && (
                        <p className="text-sm text-gray-500 ml-14 mt-2">Job: {review.job.title}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyStats;