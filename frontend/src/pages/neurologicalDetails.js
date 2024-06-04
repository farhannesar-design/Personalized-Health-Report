import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { neurologicalOptimalRanges } from '../components/neurologicalOptimalRanges';

function NeurologicalDetails() {
  const [neurologicalData, setNeurologicalData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchNeurologicalData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchNeurologicalData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_neurological_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch neurological data');
      }
      const data = await response.json();
      console.log(data)
      setNeurologicalData(data);
      console.log("neurologicaldata", neurologicalData)
    } catch (error) {
      console.error('Error fetching neurological data:', error);
    }
  };

  const neurological_score = calculateScore(neurologicalData, neurologicalOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Neurological Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={neurological_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your neurological health can be obtained with the following tests: magnetic resonance imaging (MRI), electroencephalogram (EEG), electromyography (EMG) and nerve conduction studies (NCS).</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
    </div>
  );
}

export default NeurologicalDetails;
