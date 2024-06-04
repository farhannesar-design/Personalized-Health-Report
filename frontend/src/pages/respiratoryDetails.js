import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { respiratoryOptimalRanges } from '../components/respiratoryOptimalRanges';

function RespiratoryDetails() {
  const [respiratoryData, setRespiratoryData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchRespiratoryData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchRespiratoryData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_respiratory_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch respiratory data');
      }
      const data = await response.json();
      console.log(data)
      setRespiratoryData(data);
      console.log("respiratorydata", respiratoryData)
    } catch (error) {
      console.error('Error fetching respiratory data:', error);
    }
  };

  const respiratory_score = calculateScore(respiratoryData, respiratoryOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Respiratory Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={respiratory_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your respiratory health can be obtained with the following tests: comprehensive metabolic panel, lung function tests (LFT's), pulse oximetry, artery blood gas test, and sputum tests.</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'co2 range'}
            track={false}
            min={10}
            max={40}
            value={respiratoryData.carbon_dioxide || 0}
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

export default RespiratoryDetails;
