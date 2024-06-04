import React , { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { immuneOptimalRanges } from '../components/immuneOptimalRanges';

function ImmuneDetails() {
  const [immunesystemData, setImmuneSystemData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchImmuneSystemData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchImmuneSystemData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_immune_system_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch immune_system data');
      }
      const data = await response.json();
      console.log(data)
      setImmuneSystemData(data);
      console.log("immune_systemdata", immunesystemData)
    } catch (error) {
      console.error('Error fetching immune_system data:', error);
    }
  };

  const immune_score = calculateScore(immunesystemData, immuneOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Immune System Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={immune_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your immune health can be obtained with the following tests: complete blood count, flow cytometry, complement levels, and specific antibody tests.</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'wbc range'}
            track={false}
            min={0}
            max={20}
            value={immunesystemData.white_blood_cells || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 5,
                label: '5',
              },
              {
                value: 11,
                label: '11',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          WBC: White Blood Cells (thousand/mcL)
        </Grid>
      </Grid>
    </div>
  );
}

export default ImmuneDetails;
