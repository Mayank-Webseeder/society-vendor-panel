import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import { motion } from 'framer-motion';
import { ratingsData, ratingsCount, finalRating } from '../static/dummyData_MyStats';
import AccessLockedModal from '../components/modals/AccessLockedModal';
import { useUser } from '../UserContext';


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


// Calculate rating breakdown
const ratingBreakdown = {
  5: ratingsData.filter(r => r.rating === 5.0).length,
  4: ratingsData.filter(r => r.rating === 4.0).length,
  3: ratingsData.filter(r => r.rating === 3.0).length,
  2: ratingsData.filter(r => r.rating === 2.0).length,
  1: ratingsData.filter(r => r.rating === 1.0).length,
};


const AnimatedProgressBar = ({ value, max, color, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth((value / max) * 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, max, delay]);
  return (
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute top-0 left-0 h-full ${color} transition-all duration-1000 ease-out rounded-full`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const CircularProgress = ({ percentage, size = 120 }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{finalRating}</div>
          <div className="text-sm text-gray-400">out of 5</div>
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ rating, size = 'w-5 h-5' }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${size} ${
          star <= rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ))}
  </div>
);



const MyStats = () => {

  const { user } = useUser();
  const subscriptionActive = user.velra_subscription_active;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(!subscriptionActive);

  const handleModalClose = () => {
    navigate('/dashboard');
  };

  const totalRatings = ratingsCount;
  const positiveRatings = ratingBreakdown[5] + ratingBreakdown[4];
  const positivePercentage = ((positiveRatings / totalRatings) * 100).toFixed(1);



  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 pt-3 pb-5">
        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div
            className="flex flex-col shadow-md hover:shadow-lg border-solid border border-gray-400 w-full justify-start bg-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4"
            variants={itemVariants}
          >
            <div className="flex gap-3 sm:gap-5">
              <div className="flex justify-center items-center p-2 sm:p-3 rounded-xl bg-green-500 shadow-md">
                <ChartNoAxesCombined color='white' size={28} className="sm:w-[34px] sm:h-[34px]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h2 style={{ fontFamily:'Manrope' }} className="text-xl sm:text-2xl font-normal text-black/75">Ratings & Reviews</h2>
                <p style={{ fontFamily:'Lato' }} className="text-xs sm:text-sm text-gray-700/60 mt-1">Discover what customers say about their experience</p>
              </div>
          </div>
        </motion.div>

          {/* <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Customer Ratings & Reviews
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover what our customers are saying about their experience with our product
            </p>
          </motion.div> */}

          {/* Main Rating Cards */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12"
            variants={itemVariants}
          >
            {/* Overall Rating Card */}
            <motion.div
              className="lg:col-span-2 xl:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 text-center relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-10 transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8"></div>
              <div className="relative z-10">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Overall Rating</h3>
                <div className="flex justify-center mb-4 sm:mb-6">
                  <CircularProgress percentage={parseFloat(finalRating) * 20} size={100} />
                </div>
                <div className="flex justify-center mb-3 sm:mb-4">
                  <StarRating rating={Math.round(parseFloat(finalRating))} size="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  Based on {totalRatings} reviews
                </div>
              </div>
            </motion.div>

            {/* Rating Distribution */}
            <motion.div
              className="lg:col-span-1 xl:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10 transform -translate-x-3 sm:-translate-x-4 -translate-y-3 sm:-translate-y-4"></div>
              <div className="relative z-10">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">Rating Distribution</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[5, 4, 3, 2, 1].map((stars, index) => (
                    <div key={stars} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 w-8 sm:w-12">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">{stars}</span>
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <AnimatedProgressBar
                          value={ratingBreakdown[stars]}
                          max={totalRatings}
                          color={stars >= 4 ? 'bg-green-500' : stars === 3 ? 'bg-yellow-500' : 'bg-red-500'}
                          delay={index * 200}
                        />
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 w-6 sm:w-8 text-right">
                        {ratingBreakdown[stars]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              className="lg:col-span-1 xl:col-span-1 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 transform translate-x-6 sm:translate-x-8 translate-y-6 sm:translate-y-8"></div>
              <div className="relative z-10">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">Key Statistics</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                      {positivePercentage}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Positive Reviews</div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${positivePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">{totalRatings}</div>
                      <div className="text-xs text-gray-500">Total Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">{Math.round(parseFloat(finalRating))}</div>
                      <div className="text-xs text-gray-500">Average Stars</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Detailed Breakdown */}
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8"
            variants={itemVariants}
          >
            {/* Left Panel - Main Chart */}
            <motion.div className="xl:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8" variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Detailed Rating Analysis</h3>
              <div className="grid grid-cols-3 gap-5 sm:gap-6 md:gap-12">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingBreakdown[rating];
                  const percentage = ((count / totalRatings) * 100).toFixed(1);
                  return (
                    <div key={rating} className="text-center">
                      <div className="mb-3 sm:mb-4">
                        <div className="relative w-16 h-16 sm:w-28 sm:h-28 mx-auto">
                          <svg className="w-16 h-16 sm:w-28 sm:h-28 transform -rotate-90">
                            {/* Mobile circles */}
                            <g className="block sm:hidden">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                                fill="none"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke={rating >= 4 ? '#10b981' : rating === 3 ? '#f59e0b' : '#ef4444'}
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${(count / totalRatings) * 175.929} 175.929`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                            </g>
                            {/* Desktop circles */}
                            <g className="hidden sm:block">
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                stroke="#e5e7eb"
                                strokeWidth="5"
                                fill="none"
                              />
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                stroke={rating >= 4 ? '#10b981' : rating === 3 ? '#f59e0b' : '#ef4444'}
                                strokeWidth="5"
                                fill="none"
                                strokeDasharray={`${(count / totalRatings) * 301.59} 301.59`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                            </g>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs sm:text-base font-semibold text-gray-800">{percentage}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mb-1 sm:mb-2">
                        <StarRating rating={rating} size="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-gray-800">{count}</div>
                      <div className="text-xs sm:text-sm text-gray-500">reviews</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Panel - Additional Insights */}
            <motion.div className="xl:col-span-1 space-y-4 sm:space-y-6" variants={itemVariants}>
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Rating Trends</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Excellent (5★)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(ratingBreakdown[5] / totalRatings) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800">{ratingBreakdown[5]}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Good (4★)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(ratingBreakdown[4] / totalRatings) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800">{ratingBreakdown[4]}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Average (3★)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(ratingBreakdown[3] / totalRatings) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800">{ratingBreakdown[3]}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Poor (2★)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(ratingBreakdown[2] / totalRatings) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800">{ratingBreakdown[2]}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Terrible (1★)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(ratingBreakdown[1] / totalRatings) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800">{ratingBreakdown[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-200">
                <h4 className="text-base sm:text-lg font-semibold text-purple-800 mb-3">Customer Satisfaction</h4>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{positivePercentage}%</div>
                  <div className="text-xs sm:text-sm text-purple-700 mb-3">Customers are satisfied</div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${positivePercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-indigo-200">
                <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-3">Quality Metrics</h4>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-indigo-600">{totalRatings}</div>
                    <div className="text-xs text-indigo-700">Total Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-indigo-600">{finalRating}</div>
                    <div className="text-xs text-indigo-700">Average Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={itemVariants}
          >
            <motion.div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200" variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-green-800">Positive Feedback</h4>
              </div>
              <p className="text-xs sm:text-sm text-green-700">
                <span className="font-bold">{positiveRatings}</span> customers ({positivePercentage}%)
                rated us 4 stars or higher, indicating excellent satisfaction levels.
              </p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200" variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-blue-800">Quality Score</h4>
              </div>
              <p className="text-xs sm:text-sm text-blue-700">
                With an average of <span className="font-bold">{finalRating}/5.0</span> stars,
                we consistently deliver high-quality experiences to our customers.
              </p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-200" variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-orange-800">Room for Growth</h4>
              </div>
              <p className="text-xs sm:text-sm text-orange-700">
                <span className="font-bold">{ratingBreakdown[3] + ratingBreakdown[2] + ratingBreakdown[1]}</span> reviews
                highlight areas where we can improve our service quality.
              </p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-200" variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-cyan-800">Customer Trust</h4>
              </div>
              <p className="text-xs sm:text-sm text-cyan-700">
                Over <span className="font-bold">{Math.round((ratingBreakdown[5] / totalRatings) * 100)}%</span> of customers
                gave us the highest rating, showing strong brand loyalty.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>


        {!subscriptionActive && (
          <AccessLockedModal
            open={isModalOpen}
            onClose={handleModalClose}
            heading="Access Restricted"
            subheading="Subscribe to unlock detailed statistics and premium insights."
          />
        )}
    </div>
  );
};

export default MyStats;