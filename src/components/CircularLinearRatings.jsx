import { useState, useEffect } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { StarIcon } from '@heroicons/react/24/solid'; // For filled stars
import { ratingsData } from '../static/dummyData_MyStats'


function CircularLinearRatings() {
  
  const [overallRating, setOverallRating] = useState('0.0');
  const [totalRatingsCount, setTotalRatingsCount] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    '5.0': { count: 0, percentage: 0 },
    '4.0': { count: 0, percentage: 0 },
    '3.0': { count: 0, percentage: 0 },
    '2.0': { count: 0, percentage: 0 },
    '1.0': { count: 0, percentage: 0 },
  });

  useEffect(() => {
    // This effect runs only once after the initial render because of the empty dependency array [].
    // This prevents infinite re-renders caused by state updates.

    // Ensure there is data before processing
    if (ratingsData.length === 0) {
      return;
    }

    let sumRatings = 0;
    // Initialize distribution counts
    const distribution = {
      '5.0': 0,
      '4.0': 0,
      '3.0': 0,
      '2.0': 0,
      '1.0': 0,
    };

    // Iterate through the ratings data to calculate sum and distribution
    ratingsData.forEach(item => {
      sumRatings += item.rating;
      // Round to the nearest whole star for distribution counting
      const roundedRating = Math.floor(item.rating);
      if (distribution[roundedRating + '.0'] !== undefined) {
        distribution[roundedRating + '.0']++;
      }
    });

    // Calculate the overall average rating, formatted to one decimal place
    const avgRating = (sumRatings / ratingsData.length).toFixed(1);
    setOverallRating(avgRating);
    setTotalRatingsCount(ratingsData.length);

    // Calculate percentages for each rating level
    const newDistribution = {};
    Object.keys(distribution).forEach(key => {
      const count = distribution[key];
      const percentage = (count / ratingsData.length) * 100;
      newDistribution[key] = { count, percentage };
    });
    setRatingDistribution(newDistribution);

  }, []); // Empty dependency array ensures this runs only once

  // Helper function to render star icons based on the rating
  const renderStars = (rating, size=24) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    // Render filled yellow stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} style={{ height: size, width: size, color: '#FFD700' }} />); // Gold color
    }
    // Render empty (gray) stars for the remainder up to 5
    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarIcon key={`empty-${i}`} style={{ height: size, width: size, color: '#e0e0e0' }} />); // Grey color
    }
    return stars;
  };

  // Define the radius and circumference for the SVG circle
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  // Calculate the strokeDashoffset based on the overall rating
  const strokeDashoffset = circumference * (1 - (parseFloat(overallRating) / 5));




  return (
    <Box
      sx={{
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        backgroundColor: 'white', // Changed from #f8f8f8 to white
        minHeight: '100vh', // Ensure it takes at least the full viewport height
        width: '100%', // Ensure it takes full width
      }}
    >
      {/* Overall Rating Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4, // margin-bottom
          p: 5, // padding
          backgroundColor: 'white',
          borderRadius: '12px',
          // boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Removed box shadow
          width: '100%',
          maxWidth: '520px', // Max width for the card
        }}
      >
        {/* Circular Rating Display using SVG */}
        <Box
          sx={{
            position: 'relative',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <svg width="220" height="220" viewBox="0 0 220 220"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)', // Rotate to start the arc from the top
            }}
          >
            {/* Background circle (track) */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#e0e0e0" // Base gray color
              strokeWidth="14" // Thickness
              fill="none"
            />
            {/* Progress circle (fill) */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#42a5f5" // Blue color
              strokeWidth="14" // Thickness
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" // Round ends of the progress bar
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }} // Smooth transition
            />
          </svg>
          {/* Inner white circle and text */}
          <Box
            sx={{
              width: 'calc(100% - 28px)', // Adjust for border thickness (10px on each side)
              height: 'calc(100% - 28px)',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1, // Ensure text is above the arc background
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
              {overallRating}/5.0
            </Typography>
          </Box>
        </Box>

        {/* Stars */}
        <Box sx={{ display: 'flex', gap: '8px', mb: 2 }}>
          {renderStars(parseFloat(overallRating), 36)}
        </Box>

        <Typography variant="body1" sx={{ color: '#555', mb: 0.5 }}>
          Based on {totalRatingsCount} Ratings
        </Typography>
        <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
          You did a good job!
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#60A5FA', // Blue color
            '&:hover': {
              backgroundColor: '#3B82F6', // Darker blue on hover
            },
            color: 'white',
            textTransform: 'none', // Prevent uppercase
            px: 6, // horizontal padding
            py: 2.5, // vertical padding
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          onClick={() => console.log("View Job Rating clicked")}
        >
          View Job Rating
        </Button>
      </Box>

      {/* Rating and Distribution Section */}
      <Box
        sx={{
          mt: 4, // margin-top
          p: 5, // padding
          backgroundColor: 'white',
          borderRadius: '12px',
          // boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Removed box shadow
          width: '100%',
          maxWidth: '600px', // Max width for the card
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, fontSize: '2rem' }}>
          Rating and Distribution
        </Typography>

        {/* Map through star ratings for distribution bars */}
        {['5.0', '4.0', '3.0', '2.0', '1.0'].map(star => (
          <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="body1" sx={{ width: '60px', mr: 3, color: '#555', fontSize: '1.25rem' }}>
              {star} <StarIcon style={{ height: '24px', width: '24px', color: '#FFD700', verticalAlign: 'middle' }} />
            </Typography>
            <LinearProgress
              variant="determinate"
              value={ratingDistribution[star]?.percentage || 0} // Use calculated percentage
              sx={{
                flexGrow: 1, // Allow progress bar to take available space
                height: '16px',
                borderRadius: '8px',
                backgroundColor: '#e0e0e0', // Background of the bar
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#60A5FA', // Blue progress bar color
                },
              }}
            />
            <Typography variant="body1" sx={{ ml: 3, width: '80px', textAlign: 'right', color: '#555', fontSize: '1.25rem' }}>
              {ratingDistribution[star]?.count || 0} jobs
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}



export default CircularLinearRatings;