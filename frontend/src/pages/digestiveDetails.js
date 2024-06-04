import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, Slider } from "@mui/material";
import CircularWithValueLabel from '../components/circularbar/Circularbar';
import styles from '../page.module.css';
import { calculateScore } from '../components/calculateScore';
import { digestiveOptimalRanges } from '../components/digestiveOptimalRanges';

function DigestiveDetails() {
  const [digestiveData, setDigestiveData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

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

  const digestive_score = calculateScore(digestiveData, digestiveOptimalRanges)

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
          <h2 className={styles.header}>
            Digestive Score
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel value={digestive_score} />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
            <p>Metrics for your digestive health can be obtained with the following tests: comprehensive metabolic panel, vitals check, upper/lower GI series, endoscopy, colonoscopy, and stool tests.</p>
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
            value={digestiveData.blood_pressure_systolic|| 0}
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
            value={digestiveData.blood_pressure_diastolic|| 0}
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
            value={digestiveData.heart_rate|| 0}
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
            value={digestiveData.respiratory_rate|| 0}
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
            value={digestiveData.temperature|| 0}
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
            value={digestiveData.hematocrit|| 0}
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
            value={digestiveData.hemoglobin|| 0}
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
            value={digestiveData.platelets|| 0}
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
            value={digestiveData.red_blood_cells|| 0}
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
            value={digestiveData.white_blood_cells|| 0}
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
            value={digestiveData.hdl_cholesterol|| 0}
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
            value={digestiveData.ldl_cholesterol|| 0}
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
            value={digestiveData.total_cholesterol|| 0}
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
            value={digestiveData.trigylcerides|| 0}
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
            value={digestiveData.albumin|| 0}
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
            value={digestiveData.alkaline_phosphatase|| 0}
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
            value={digestiveData.alanine_aminotransferase|| 0}
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
            value={digestiveData.alanine_aminotransferase|| 0}
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
            value={digestiveData.billirubin|| 0}
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
            value={digestiveData.blood_urea_nitrogen|| 0}
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
            value={digestiveData.calcium|| 0}
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
            value={digestiveData.carbon_dioxide|| 0}
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
            value={digestiveData.chloride|| 0}
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
            value={digestiveData.creatinine|| 0}
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
            value={digestiveData.glucose|| 0}
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
            value={digestiveData.potassium|| 0}
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
            value={digestiveData.sodium|| 0}
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
            value={digestiveData.acidity|| 0}
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
            value={digestiveData.leukocyte_esterase_in_urine|| 0}
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
            value={digestiveData[30] || 0}
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
            value={digestiveData[31] || 0}
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
            value={digestiveData[32] || 0}
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
            value={digestiveData[33] || 0}
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
            value={digestiveData[34] || 0}
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
            value={digestiveData[35] || 0}
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
            value={digestiveData[36] || 0}
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
            value={digestiveData[37] || 0}
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

export default DigestiveDetails;
