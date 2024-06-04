import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';

function OverallHealthDetails() {
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
      console.log(data)
      setCardioData(data);
      console.log("cardiodata", cardioData)
    } catch (error) {
      console.error('Error fetching cardiovascular data:', error);
    }
  };

  const [digestiveData, setDigestiveData] = useState([]);
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchDigestiveData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const  fetchDigestiveData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_digestive_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch digestive data');
      }
      const data = await response.json();
      console.log(data)
      setDigestiveData(data);
      console.log("digestivedata", digestiveData)
    } catch (error) {
      console.error('Error fetching digestive data:', error);
    }
  };

  const [musculoskeletalData, setMusculoskeletalData] = useState([]);
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

  const [respiratoryData, setRespiratoryData] = useState([]);
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

  const [immunesystemData, setImmuneSystemData] = useState([]);
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

  const [endocrineData, setEndocrineData] = useState([]);

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

  const [reproductiveData, setReproductiveData] = useState([]);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchReproductiveData(userIdFromStorage);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const fetchReproductiveData= async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_reproductive_score_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reproductive data');
      }
      const data = await response.json();
      console.log(data)
      setReproductiveData(data);
      console.log("reproductive_systemdata", reproductiveData)
    } catch (error) {
      console.error('Error fetching reproductive data:', error);
    }
  };
  const [urinaryData, setUrinaryData] = useState([]);
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
  return (
    <div>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
        <h2 className={styles.header}>
          Overall Health Score
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularWithValueLabel value={25} />
        </div>
        </Paper>
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
            value={cardioData.blood_pressure_systolic || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 120,
                label: '120',
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
            value={cardioData.blood_pressure_diastolic || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 80,
                label: '80',
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
            value={cardioData.heart_rate || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 60,
                label: '60',
              },
              {
                value: 100,
                label: '100',
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
            value={cardioData.respiratory_rate || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 12,
                label: '12',
              },
              {
                value: 18,
                label: '18',
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
            getAriaLabel={() => 'temperature range'}
            track={false}
            min={90}
            max={110}
            value={digestiveData.temperature || 0}
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
            getAriaLabel={() => 'hematocrit range'}
            track={false}
            min={0}
            max={100}
            value={cardioData.hematocrit || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 35,
                label: '35%',
              },
              {
                value: 49,
                label: '49%',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Hematocrit
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
            value={cardioData.hemoglobin || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 11,
                label: '11',
              },
              {
                value: 17,
                label: '17',
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
            value={cardioData.platelets || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 135,
                label: '135',
              },
              {
                value: 370,
                label: '370',
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
            value={cardioData.red_blood_cells || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 4,
                label: '4',
              },
              {
                value: 6,
                label: '6',
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
            value={cardioData.white_blood_cells || 0}
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
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'hdl range'}
            track={false}
            min={0}
            max={150}
            value={cardioData.hdl_choleresterol || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 50,
                label: '50 (healthy min)',
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
            value={cardioData.ldl_choleresterol || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 100,
                label: '100 (healthy max)',
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
            value={cardioData.total_choleresterol || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 200,
                label: '200 (healthy max)',
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
            value={cardioData.triglycerides || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 150,
                label: '150 (healthy max)',
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
            value={cardioData.albumin || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 3.4,
                label: '3.4',
              },
              {
                value: 5.4,
                label: '5.4',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Albumin (g/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'alkaline phosphatase range'}
            track={false}
            min={0}
            max={200}
            value={digestiveData.alkaline_phosphatase || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 20,
                label: '20',
              },
              {
                value: 130,
                label: '130',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Alkaline phosphatase (U/L)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'alt range'}
            track={false}
            min={0}
            max={50}
            value={digestiveData.alanine_aminotransferase || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 4,
                label: '4',
              },
              {
                value: 36,
                label: '36',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          ALT: Alanine Aminotransferase (U/L)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'ast range'}
            track={false}
            min={0}
            max={50}
            value={digestiveData.asparate_aminotransferase || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 8,
                label: '8',
              },
              {
                value: 33,
                label: '33',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          AST: Asparate Aminotransferase (U/L)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'bilirubin range'}
            track={false}
            min={0}
            max={3}
            value={digestiveData.billrubin || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0.1,
                label: '0.1',
              },
              {
                value: 1.2,
                label: '1.2',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Bilirubin (mg/dL)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'bun range'}
            track={false}
            min={0}
            max={40}
            value={digestiveData.blood_urea_nitrogen || 0}
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
            getAriaLabel={() => 'calcium range'}
            track={false}
            min={0}
            max={20}
            value={digestiveData.calcium || 0}
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
            getAriaLabel={() => 'co2 range'}
            track={false}
            min={10}
            max={40}
            value={digestiveData.carbon_dioxide || 0}
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
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'chloride range'}
            track={false}
            min={80}
            max={150}
            value={digestiveData.chloride || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 96,
                label: '96',
              },
              {
                value: 106,
                label: '106',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Chloride (mEq/L)
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
            value={digestiveData.creatinine || 0}
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
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'glucose range'}
            track={false}
            min={50}
            max={150}
            value={digestiveData.glucose || 0}
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
            getAriaLabel={() => 'potassium range'}
            track={false}
            min={0}
            max={10}
            value={digestiveData.potassium || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 3.7,
                label: '3.7',
              },
              {
                value: 5.2,
                label: '5.2',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Potassium (mEq/L)
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={4}> 
          <Slider
            getAriaLabel={() => 'sodium range'}
            track={false}
            min={100}
            max={200}
            value={digestiveData.sodium || 0}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 135,
                label: '135',
              },
              {
                value: 145,
                label: '145',
              },
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          Sodium (mEq/L)
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
            value={digestiveData.acidity || 0}
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
            value={urinaryData.billrubin_in_urine || 0}
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
            value={urinaryData.nitrates_in_urine || 0}
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
      <br></br>
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
            value={urinaryData.wbc_in_urine || 0}
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
    </div>
  );
}

export default OverallHealthDetails;
