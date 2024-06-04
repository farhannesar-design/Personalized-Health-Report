'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// import theme from './theme';


function CircularProgressWithLabel(props) {
    
  const getColor = (value) => {
    if (value >= 0 && value <= 20) {
        return 'red'; // Red color for Poor
      } else if (value >= 21 && value <= 40) {
        return 'orange'; // Orange color for Fair
      } else if (value >= 41 && value <= 60) {
        return 'rgba(218, 230, 0, 0.8)'; // Yellow color for Good
      } else if (value >= 61 && value <= 80) {
        return 'rgba(3, 242, 0, 0.8)'; // Light Green color for Great
      } else {
        return 'green'; // Dark Green color for Excellent
      }
  };
  function getText(value) {
    if (value >= 0 && value <= 20) {
      return 'Poor';
    } else if (value >= 21 && value <= 40) {
      return 'Fair';
    } else if (value >= 41 && value <= 60) {
      return 'Good';
    } else if (value >= 61 && value <= 80) {
      return 'Great';
    } else {
      return 'Excellent';
    }
  }
  
  const grayValue = 100 - props.value; 

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column', // Display items vertically
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
          <Typography
            variant="body1"
            component="div"
            color="text.secondary"
          >
            {getText(props.value)}
          </Typography>
        </Typography>
      </Box>
      <CircularProgress
        variant="determinate"
        value={100} // Set the value for the gray part
        // color="rgba(0, 0, 0, 0.1)" // Gray color
        style={{'color': 'rgba(0, 0, 0, 0.1)'}}
        size={150}
        sx={{
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        {...props}
        // color={getColor(props.value)} // Apply color based on value
        style={{'color': getColor(props.value)}}
        size={150}
        //  sx={{
        //   '& circle': {
        //     stroke: 'rgba(0, 0, 0, 0.1)', // Outline color
        //   },
        // }}
      />
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ value }) {
  return <CircularProgressWithLabel value={value} />;
}