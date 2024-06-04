import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { urinaryOptimalRanges } from '../components/urinaryOptimalRanges';

function UrinaryDetails() {

  const [urinaryData, setUrinaryData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchUrinaryData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchUrinaryData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_urinary_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch immune_system data');
      }
      const data = await response.json();
      console.log(data)
      setUrinaryData(data);
      console.log("urinaryData", urinaryData)
    } catch (error) {
      console.error('Error fetching urinary data:', error);
    }
  };

  const urinary_score = calculateScore(urinaryData, urinaryOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Urinary Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={urinary_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your urinary health can be obtained with the following tests: urinalysis, urine culture, voiding cystourethrogram (VCUG), and urodynamic tests.</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'bun range'}
            track={false}
            min={0}
            max={40}
            value={urinaryData.blood_urea_nitrogen || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 6,
                label: '6',
              },
              {
                value: 20,
                label: '20',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          BUN: Blood Urea Nitrogen (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'acidity range'}
            track={false}
            min={0}
            max={10}
            value={urinaryData.acidity || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 4.5,
                label: '4.5',
              },
              {
                value: 8,
                label: '8',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Acidity (pH)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'bilirubin urine range'}
            track={false}
            min={-20}
            max={20}
            value={urinaryData.billirubin_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0 (healthy max)',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Bilirubin in urine (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'concentration urine range'}
            track={false}
            min={0.9}
            max={1.1}
            value={urinaryData.concentration_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 1.005,
                label: '1.005',
              },
              {
                value: 1.03,
                label: '1.03',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Concentration in urine (specific gravity)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'glucose urine range'}
            track={false}
            min={0}
            max={20}
            value={urinaryData.glucose_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0',
              },
              {
                value: 15,
                label: '15',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Glucose in urine (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'ketones urine range'}
            track={false}
            min={-20}
            max={20}
            value={urinaryData.ketones_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0 (healthy max)',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Ketones in urine (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'leukocyte urine range'}
            track={false}
            min={-20}
            max={20}
            value={urinaryData.leukocyte_esterase_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0 (healthy max)',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Leukocyte esterase in urine (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'nitrites urine range'}
            track={false}
            min={-20}
            max={20}
            value={urinaryData.nitrites_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0 (healthy max)',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Nitrites in urine (mg/dL)
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'protein urine range'}
            track={false}
            min={0}
            max={20}
            value={urinaryData.protein_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0',
              },
              {
                value: 14,
                label: '14',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Protein in urine (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'rbc urine range'}
            track={false}
            min={0}
            max={5}
            value={urinaryData.rbc_in_urine || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0',
              },
              {
                value: 3,
                label: '3',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          RBC in urine (/hpf)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'wbc urine range'}
            track={false}
            min={0}
            max={5}
            value={urinaryData.wbc_in_urine|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0',
              },
              {
                value: 3,
                label: '3',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          WBC in urine (/hpf)
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
            value={urinaryData.creatinine || 0}
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

export default UrinaryDetails;
