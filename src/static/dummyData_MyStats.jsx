

const generateRatings = () => {
  let ratings = [];

  // Add 82 ratings of 5.0
  for (let i = 0; i < 82; i++) {
    ratings.push({ rating: 5.0 });
  }
  // Add 24 ratings of 4.0
  for (let i = 0; i < 24; i++) {
    ratings.push({ rating: 4.0 });
  }
  // Add 6 ratings of 3.0
  for (let i = 0; i < 6; i++) {
    ratings.push({ rating: 3.0 });
  }
  // Add 4 ratings of 2.0
  for (let i = 0; i < 4; i++) {
    ratings.push({ rating: 2.0 });
  }
  // Add 2 ratings of 1.0
  for (let i = 0; i < 2; i++) {
    ratings.push({ rating: 1.0 });
  }

  return ratings;
};


export const ratingsData = generateRatings();