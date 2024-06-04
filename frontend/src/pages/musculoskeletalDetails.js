import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { musculoskeletalOptimalRanges } from '../components/musculoskeletalOptimalRanges';

function MusculoskeletalDetails() {
  const [musculoskeletalData, setMusculoskeletalData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchMusculoskeletalData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchMusculoskeletalData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_musculoskeletal_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch musculoskeletal data');
      }
      const data = await response.json();
      console.log(data)
      setMusculoskeletalData(data);
      console.log("musculoskeletaldata", musculoskeletalData)
    } catch (error) {
      console.error('Error fetching musculoskeletal data:', error);
    }
  };

  const musculoskeletal_score = calculateScore(musculoskeletalData, musculoskeletalOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Musculoskeletal Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={musculoskeletal_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your musculoskeletal health can be obtained with the following tests: comprehensive metabolic panel, bone density scan, xray, electromyography (EMG) and nerve conduction studies (NCS).</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'calcium range'}
            track={false}
            min={0}
            max={20}
            value={musculoskeletalData.calcium || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 8.5,
                label: '8.5',
              },
              {
                value: 10.2,
                label: '10.2',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Calcium (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'creatinine range'}
            track={false}
            min={0}
            max={2}
            value={musculoskeletalData.creatinine|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0.6,
                label: '0.6',
              },
              {
                value: 1.3,
                label: '1.3',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Creatinine (mg/dL)
        </Grid>
      </Grid>
    </div>
  );
}

export default MusculoskeletalDetails;
