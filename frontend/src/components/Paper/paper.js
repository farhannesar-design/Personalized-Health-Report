import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import CircularWithValueLabel from '../circularbar/Circularbar';
import styles from '../../page.module.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { calculateScore } from '../calculateScore';
import { cardioOptimalRanges } from '../cardioOptimalRanges';
import { digestiveOptimalRanges } from '../digestiveOptimalRanges';
import { musculoskeletalOptimalRanges } from '../musculoskeletalOptimalRanges';
import { respiratoryOptimalRanges } from '../respiratoryOptimalRanges';
import { immuneOptimalRanges } from '../immuneOptimalRanges';
import { neurologicalOptimalRanges } from '../neurologicalOptimalRanges';
import { endocrineOptimalRanges } from '../endocrineOptimalRanges';
import { reproductiveOptimalRanges } from '../reproductiveOptimalRanges';
import { urinaryOptimalRanges } from '../urinaryOptimalRanges';

function PaperGrid() {
    const [loggedInUserId, setLoggedInUserId] = useState('');
    const [cardioData, setCardioData] = useState([]);
    const [digestiveData, setDigestiveData] = useState([]);
    const [musculoskeletalData, setMusculoskeletalData] = useState([]);
    const [respiratoryData, setRespiratoryData] = useState([]);
    const [immunesystemData, setImmuneSystemData] = useState([]);
    const [neurologicalData, setNeurologicalData] = useState([]);
    const [endocrineData, setEndocrineData] = useState([]);
    const [reproductiveData, setReproductiveData] = useState([]);
    const [urinaryData, setUrinaryData] = useState([]);
    
    useEffect(() => {
      const userIdFromStorage = localStorage.getItem('id');
      if (userIdFromStorage) {
        setLoggedInUserId(userIdFromStorage);
        fetchCardioData(userIdFromStorage);
        fetchDigestiveData(userIdFromStorage);
        fetchMusculoskeletalData(userIdFromStorage);
        fetchRespiratoryData(userIdFromStorage);
        fetchImmuneSystemData(userIdFromStorage);
        fetchNeurologicalData(userIdFromStorage);
        fetchEndocrineData(userIdFromStorage);
        fetchReproductiveData(userIdFromStorage);
        fetchUrinaryData(userIdFromStorage);
      }
    }, []); // Empty dependency array means this effect runs only once after the initial render
  
    // cardio score calculation
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

    // digestive score calculation
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

    // musculoskeletal score calculation
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

    // respiratory score calculation
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

    // immune score calculation
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

    // neurological score calculation
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
    
    // endocrine score calculation
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

    // reproductive score calculation
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

    // urinary score calculation
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

    const cardio_score = calculateScore(cardioData, cardioOptimalRanges)
    const digestive_score = calculateScore(digestiveData, digestiveOptimalRanges)
    const musculoskeletal_score = calculateScore(musculoskeletalData, musculoskeletalOptimalRanges)
    const respiratory_score = calculateScore(respiratoryData, respiratoryOptimalRanges)
    const immune_score = calculateScore(immunesystemData, immuneOptimalRanges)
    const neurological_score = calculateScore(neurologicalData, neurologicalOptimalRanges)
    const endocrine_score = calculateScore(endocrineData, endocrineOptimalRanges)
    const reproductive_score = calculateScore(reproductiveData, reproductiveOptimalRanges)
    const urinary_score = calculateScore(urinaryData, urinaryOptimalRanges)

    const overall_score = (cardio_score + digestive_score + musculoskeletal_score + respiratory_score
                        + immune_score + neurological_score + endocrine_score + reproductive_score + urinary_score) / 9

    return (
        <Container>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto'}}>   
                <h2 className={styles.header}>
                    <Link to='/overallHealthDetails'>
                        Overall Health Score
                    </Link>
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularWithValueLabel value={overall_score} />
                </div>

                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <p><InfoOutlinedIcon/> {" "} Your health score is determined based on your age, sex, height, weight and your medical records</p>
                </Paper>
            </Grid>
        </Grid>
    
        <Grid container spacing={4}  style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper}  style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/cardioDetails'>
                            Cardiovascular Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel value={cardio_score} />
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/digestiveDetails'>
                            Digestive Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={digestive_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/musculoskeletalDetails'>
                            Musculoskeletal Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={musculoskeletal_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/respiratoryDetails'>
                            Respiratory Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={respiratory_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/immuneDetails'>
                            Immune System Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={immune_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/neurologicalDetails'>
                            Neurological Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={neurological_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/endocrineDetails'>
                            Endocrine Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={endocrine_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/reproductiveDetails'>
                            Reproductive Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={reproductive_score}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className={styles.paper} style={{ padding: '20px 20px 40px 20px', height: 'auto' }}>
                    <h2 className={styles.header}>
                        <Link to='/urinaryDetails'>
                            Urinary Score
                        </Link>
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularWithValueLabel  value={urinary_score}/>
                    </div>
                </Paper>
            </Grid>
        </Grid>
        </Container>
    )
}
export default PaperGrid;