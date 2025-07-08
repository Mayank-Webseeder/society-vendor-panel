import { Button } from "@mui/material";
import { ratingsCount, finalRating } from "../static/dummyData_MyStats";


// Helper: polar to cartesian for SVG arc
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// Helper: SVG arc path
const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? '1' : '0';
  const sweepFlag = endAngle > startAngle ? '1' : '0';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y,
  ].join(' ');
};




const CircularRatings = () => {

  const size = 300;    // Increased from 220
  const strokeWidth = 30;    // Increased from 22
  
  const maxRating = 5;
  const rating = Number(finalRating);
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const clampedRating = Math.min(Math.max(rating, 0), maxRating);
  const effectiveMaxRating = maxRating + 0.5;
  const anglePerHalf = (clampedRating / effectiveMaxRating) * 180;
  const bottomAngle = 270;


  // Star logic
  const fullStars = Math.floor(clampedRating);
  const decimal = clampedRating - fullStars;



  return (
    <div className="flex flex-col items-center justify-center p-12 font-sans bg-white rounded-2xl max-w-lg mx-auto">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9D9D9" />
              <stop offset="100%" stopColor="#56A9D9" />
            </linearGradient>
          </defs>
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth}
          />
          {/* Progress Arcs */}
          {clampedRating > 0 && (
            <g>
              {/* Right Arc */}
              <path
                d={describeArc(center, center, radius, bottomAngle, bottomAngle - anglePerHalf)}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Left Arc */}
              <path
                d={describeArc(center, center, radius, bottomAngle, bottomAngle + anglePerHalf)}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <span className="text-6xl font-bold" style={{ color: '#56A9D9' }}>
            {rating.toFixed(1)}
          </span>
          <span className="text-5xl font-medium text-black/[0.49] mt-1">
            /{maxRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mt-3">
        {[...Array(5)].map((_, i) => {
          // Full star
          if (i < fullStars) {
            return (
              <svg
                key={i}
                width={48}
                height={48}
                viewBox="0 0 512 512"
                style={{ marginRight: 4 }}
              >
                <path
                  d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"
                  fill="#FED700"
                  stroke="#FED700"
                  strokeWidth={10}
                  opacity={1}
                />
              </svg>
            );
          }
          // Partial star (only one, for the decimal part)
          if (i === fullStars && decimal > 0) {
            return (
              <svg
                key={i}
                width={48}
                height={48}
                viewBox="0 0 512 512"
                style={{ marginRight: 4 }}
              >
                {/* Fill with partial opacity */}
                <path
                  d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"
                  fill="#FED700"
                  fillOpacity={decimal}
                  stroke="#FED700"
                  strokeWidth={10}
                  strokeOpacity={1}
                />
              </svg>
            );
          }
          // Empty star (border only)
          return (
            <svg
              key={i}
              width={48}
              height={48}
              viewBox="0 0 512 512"
              style={{ marginRight: 4 }}
            >
              <path
                d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"
                fill="transparent"
                stroke="#FED700"
                strokeWidth={10}
                opacity={1}
              />
            </svg>
          );
        })}
      </div>

      {/* Additional Info */}
      <p className="mt-3 text-2xl font-semibold text-black/[0.49]">Based on {ratingsCount} Ratings</p>
      <p className="mt-2 text-lg font-normal text-black/[0.49]">You did a good job!</p>

      {/* Button */}
      <Button
        sx={{
          fontSize: 20,
          marginTop: 4,
          width: '70%',
          color: 'white',
          fontWeight: '700',
          backgroundColor: '#56A9D9',
          '&:hover': {
            backgroundColor: '#3B82F6',
          },
          textTransform: 'none'
        }}
        color="#56A9D9"
        variant="contained"
      >
        View Job Rating
      </Button>
    </div>
  );
};


export default CircularRatings;