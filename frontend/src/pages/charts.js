// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { LineChart } from '@mui/x-charts/LineChart';
import React, { useState, useEffect } from 'react';
function Charts() {
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
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch cardiovascular data');
      }
      const data = await response.json();
      console.log("mydata=",data)
      setCardioData(data);
      
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

  return (
    <Grid container spacing={3}>
  <Grid item xs={12}>
    <Paper elevation={3} sx={{ height: '100%', textAlign: 'center' }}>
      <h2>Digestive Score Comparison</h2>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: digestiveData.heart_rate, label: 'Heart Rate' },
              { id: 1, value: digestiveData.respiratory_rate, label: 'Respiratory Rate' },
              { id: 2, value: digestiveData.temperature, label: 'Temperature' },
            ],
          },
        ]}
        height={400}
        sx={{ display: 'inline-block' }}
      />
    </Paper>
  </Grid>
  <Grid item xs={12} md={6}>
    <Paper elevation={3} sx={{ height: '100%' }}>
      <h2 style={{ textAlign: 'left', paddingLeft: '10px'}} >Cardiovascular Score Comparison</h2>
      <BarChart
        series={[{ data: [cardioData.heart_rate, cardioData.hematocrit, cardioData.albumin, cardioData.platelets] }]}
        height={400}
        xAxis={[{ data: ['Heart Rate', 'Hematocrit', 'Albumin', 'Platelets'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        
      />
    </Paper>
  </Grid>
  <Grid item xs={12} md={6}>
    <Paper elevation={3} sx={{ height: '100%' }}>
      <h2 style={{ textAlign: 'left', paddingLeft: '10px'}} >Urinary Score Comparison</h2>
      <BarChart
        series={[{ data: [urinaryData.acidity, urinaryData.protein_in_urine, urinaryData.creatinine, urinaryData.wbc_in_urine] }]}
        layout="horizontal"
        height={400}
        yAxis={[{ data: ['Acidity ', 'Protein in Urine', 'Creatinine', 'WBC in Urine'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 110, right: 10 }} // Increased left margin
        style={{ fontSize: '12px' }} // Decreased font size of y-axis labels
      />
    </Paper>
  </Grid>
</Grid>

  
  );
}

export default Charts;
