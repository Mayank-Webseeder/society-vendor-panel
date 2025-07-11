import { useEffect, useRef, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
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
    const key = Math.floor(r.rating) + '.0';
    if (distribution[key]) {
      distribution[key].count += 1;
    }
  });
  Object.keys(distribution).forEach(key => {
    distribution[key].percentage = ratingsCount
      ? (distribution[key].count / ratingsCount) * 100
      : 0;
  });
  return distribution;
};

const ratingDistribution = getRatingDistribution();

const stars = ['5.0', '4.0', '3.0', '2.0', '1.0'];

const LinearRatings = () => {
  // Animation state for each bar
  const [animatedPercentages, setAnimatedPercentages] = useState(
    stars.map(() => 0)
  );
  const requestRef = useRef();

  useEffect(() => {
    const targetPercentages = stars.map(star => ratingDistribution[star]?.percentage || 0);
    let start;
    const duration = 900; // ms

    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setAnimatedPercentages(
        targetPercentages.map(p => p * progress)
      );
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [ratingsCount]);

  return (
    <Box
      sx={{
        fontFamily: 'Inter, sans-serif',
        padding: '24px',
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, fontSize: '2rem', color: '#212121' }}>
        Rating and Distribution
      </Typography>
      {stars.map((star, idx) => (
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
            value={animatedPercentages[idx]}
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
};

export default LinearRatings;