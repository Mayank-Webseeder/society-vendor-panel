import { Box } from '@mui/material';
import CircularRatings from './CircularRatings';
import LinearRatings from './LinearRatings';


const RatingGraphs = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        gap: 3,
        backgroundColor: 'white',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <CircularRatings />
      <LinearRatings />
    </Box>
  );
};


export default RatingGraphs;