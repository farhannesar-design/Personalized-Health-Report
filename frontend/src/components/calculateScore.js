export function calculateScore(values, optimalRanges) {
  let totalScore = 0;
  let maxScore = Object.keys(optimalRanges).length; // Maximum possible score based on the number of values
  console.log('maxScore: ', maxScore)

  if (maxScore > 0) {
    for (let key in values) {
      const value = values[key];
  
      if (optimalRanges.hasOwnProperty(key)) {
        const { min, max } = optimalRanges[key];
  
        if (value >= min && value <= max) {
          totalScore += 1; // Increase score if value is within optimal range
        }
      }
    }

    // Cap the total score at 100
    totalScore = Math.min(totalScore, maxScore) * (100 / maxScore);

  } else {
    totalScore = 100
  }

  return totalScore;
}
