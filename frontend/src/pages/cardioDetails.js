import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { cardioOptimalRanges } from '../components/cardioOptimalRanges';

function CardioDetails() {

  const [cardioData, setCardioData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchCardioData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const  fetchCardioData = async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_cardiovascular_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cardiovascular data');
      }
      const data = await response.json();
      setCardioData(data);
      
    } catch (error) {
      console.error('Error fetching cardiovascular data:', error);
    }
  };
  
  const cardio_score = calculateScore(cardioData, cardioOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={6} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>
            <h2 className={styles.header}>
              Cardiovascular Score
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={cardio_score} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your cardiovascular health can be obtained with the following tests: complete blood count, complete cholesterol test, comprehensive metabolic panel, vitals check, echocardiogram, and stress test.</p>
          </Paper>
        </Grid>
      </Grid>
      <div style={{ margin: '50px'}}></div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Slider
            getAriaLabel={() => 'blood pressure systolic range'}
            track={false}
            min={0}
            max={200}
            value= {cardioData.blood_pressure_systolic|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['blood_pressure_systolic']['max'],
                label: cardioOptimalRanges['blood_pressure_systolic']['max'].toString(),
              },
              {
                value: 140,
                label: '140',
              },
              {
                value: 180,
                label: '180',
              }
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Blood Pressure Systolic (mmHg)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'blood pressure diastolic range'}
            track={false}
            min={0}
            max={150}
            value={cardioData.blood_pressure_diastolic|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['blood_pressure_diastolic']['max'],
                label: cardioOptimalRanges['blood_pressure_diastolic']['max'].toString(),
              },
              {
                value: 90,
                label: '90',
              },
              {
                value: 120,
                label: '120',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Blood Pressure Diastolic (mmHg)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'heart rate range'}
            track={false}
            min={0}
            max={150}
            value={cardioData.heart_rate|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['heart_rate']['min'],
                label: cardioOptimalRanges['heart_rate']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['heart_rate']['max'],
                label: cardioOptimalRanges['heart_rate']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Heart Rate (bpm)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'respiratory rate range'}
            track={false}
            min={0}
            max={20}
            value={cardioData.respiratory_rate|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['respiratory_rate']['min'],
                label: cardioOptimalRanges['respiratory_rate']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['respiratory_rate']['max'],
                label: cardioOptimalRanges['respiratory_rate']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Respiratory Rate (bpm)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'hematocrit range'}
            track={false}
            min={0}
            max={100}
            value={cardioData.hematocrit|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['hematocrit']['min'],
                label: cardioOptimalRanges['hematocrit']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['hematocrit']['max'],
                label: cardioOptimalRanges['hematocrit']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Hematocrit (%)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'hemoglobin range'}
            track={false}
            min={10}
            max={20}
            value={cardioData.hemoglobin|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['hemoglobin']['min'],
                label: cardioOptimalRanges['hemoglobin']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['hemoglobin']['max'],
                label: cardioOptimalRanges['hemoglobin']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Hemoglobin (g/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'platelets range'}
            track={false}
            min={100}
            max={400}
            value={cardioData.platelets|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['platelets']['min'],
                label: cardioOptimalRanges['platelets']['min'],
              },
              {
                value: cardioOptimalRanges['platelets']['max'],
                label: cardioOptimalRanges['platelets']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Platelets (thousand/mcL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'rbc range'}
            track={false}
            min={0}
            max={10}
            value={cardioData.red_blood_cells|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['red_blood_cells']['min'],
                label: cardioOptimalRanges['red_blood_cells']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['red_blood_cells']['max'],
                label: cardioOptimalRanges['red_blood_cells']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          RBC: Red Blood Cells (million/mcL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'wbc range'}
            track={false}
            min={0}
            max={20}
            value={cardioData.white_blood_cells|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['white_blood_cells']['min'],
                label: cardioOptimalRanges['white_blood_cells']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['white_blood_cells']['max'],
                label: cardioOptimalRanges['white_blood_cells']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          WBC: White Blood Cells (thousand/mcL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'hdl range'}
            track={false}
            min={0}
            max={150}
            value={cardioData.hdl_cholesterol|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['hdl_cholesterol']['min'],
                label: cardioOptimalRanges['white_blood_cells']['min'].toString(),
              }
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          HDL cholesterol (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'ldl range'}
            track={false}
            min={0}
            max={200}
            value={cardioData.ldl_cholesterol|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['ldl_cholesterol']['max'],
                label: cardioOptimalRanges['ldl_cholesterol']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          LDL cholesterol (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'cholesterol range'}
            track={false}
            min={0}
            max={300}
            value={cardioData.total_cholesterol|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['total_cholesterol']['max'],
                label: cardioOptimalRanges['total_cholesterol']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Total cholesterol (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'triglyceride range'}
            track={false}
            min={0}
            max={250}
            value={cardioData.trigylcerides|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['triglicerides']['max'],
                label: cardioOptimalRanges['triglicerides']['max'].toString(),
              }
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Trigylcerides (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'albumin range'}
            track={false}
            min={0}
            max={10}
            value={cardioData.albumin|| 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: cardioOptimalRanges['albumin']['min'],
                label: cardioOptimalRanges['albumin']['min'].toString(),
              },
              {
                value: cardioOptimalRanges['albumin']['max'],
                label: cardioOptimalRanges['albumin']['max'].toString(),
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Albumin (g/dL)
        </Grid>
      </Grid>
    </div>
  );
}

export default CardioDetails;
