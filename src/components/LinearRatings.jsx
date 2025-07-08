import { Box, Typography, LinearProgress } from '@mui/material';
import { StarIcon } from '@heroicons/react/24/solid';
import { IoIosStar } from "react-icons/io";
import { ratingsData, ratingsCount } from '../static/dummyData_MyStats';


// Calculate rating distribution from ratingsData
const getRatingDistribution = () => {
  const distribution = {
    '5.0': { count: 0 },
    '4.0': { count: 0 },
    '3.0': { count: 0 },
    '2.0': { count: 0 },
    '1.0': { count: 0 },
  };
  ratingsData.forEach(r => {
    // Use Math.floor to match the styling sample logic
    const key = Math.floor(r.rating) + '.0';
    if (distribution[key]) {
      distribution[key].count += 1;
    }
  });
  // Calculate percentage for each
  Object.keys(distribution).forEach(key => {
    distribution[key].percentage = ratingsCount
      ? (distribution[key].count / ratingsCount) * 100
      : 0;
  });
  return distribution;
};

const ratingDistribution = getRatingDistribution();




const LinearRatings = () => (

  <Box
    sx={{
      fontFamily: 'Inter, sans-serif',
      padding: '24px',
      backgroundColor: 'white',
      //borderRadius: '12px',
      //boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '600px',
      mx: 'auto',
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, fontSize: '2rem', color: '#212121' }}>
      Rating and Distribution
    </Typography>
    {['5.0', '4.0', '3.0', '2.0', '1.0'].map(star => (
      <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="body1"
          sx={{
            mr: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '1.25rem',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            color: 'rgba(0,0,0,0.59)'
          }}
        >
          {star}{' '}
          <IoIosStar
            style={{
              paddingBottom: '2px',
              color: '#FBBC02',
              verticalAlign: 'middle',
            }}
          />
        </Typography>
        <LinearProgress
          variant="determinate"
          value={ratingDistribution[star]?.percentage || 0}
          sx={{
            flexGrow: 1,
            height: '16px',
            borderRadius: '8px',
            backgroundColor: '#4487AE',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#56A9D9',
              borderRadius: '16px',
            },
          }}
        />
        <Typography
          variant="body1"
          sx={{
            ml: 2,
            width: '80px',
            textAlign: 'left',
            color: 'rgba(0,0,0,0.69)',
            fontSize: '1.25rem',
            fontWeight: 500,
          }}
        >
          {ratingDistribution[star]?.count || 0} jobs
        </Typography>
      </Box>
    ))}
  </Box>
);


export default LinearRatings;