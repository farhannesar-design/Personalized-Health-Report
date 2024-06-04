import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { endocrineOptimalRanges } from '../components/endocrineOptimalRanges';

function EndocrineDetails() {
  const [endocrineData, setEndocrineData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchEndocrineData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchEndocrineData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_endocrine_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch endocrine data');
      }
      const data = await response.json();
      console.log(data)
      setEndocrineData(data);
      console.log("endocrine_systemdata", endocrineData)
    } catch (error) {
      console.error('Error fetching immune_system data:', error);
    }
  };

  const endocrine_score = calculateScore(endocrineData, endocrineOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Endocrine Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={endocrine_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your endocrine health can be obtained with the following tests: thyroid function, parathyroid hormone (PTH), cortisol tests, sex hormone tests, and insulin and glucose tests.</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'glucose range'}
            track={false}
            min={50}
            max={150}
            value={endocrineData.glucose || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 70,
                label: '70',
              },
              {
                value: 100,
                label: '100',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Glucose (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'temperature range'}
            track={false}
            min={90}
            max={110}
            value={endocrineData.temperature || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 97,
                label: '97',
              },
              {
                value: 99,
                label: '99',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Temperature (deg Fahrenheit)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'co2 range'}
            track={false}
            min={10}
            max={40}
            value={endocrineData.carbon_dioxide || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 23,
                label: '23',
              },
              {
                value: 29,
                label: '29',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          CO2: Carbon Dioxide (mEq/L)
        </Grid>
      </Grid>
    </div>
  );
}

export default EndocrineDetails;
