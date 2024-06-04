import './App.css';
import Navbar from './components/Navbar';
import styles from './page.module.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Charts from './pages/charts';
import Home from './pages/home';
import MedicalHistory from './pages/medicalRequests';
import OverallHealthDetails from './pages/overallHealthDetails';
import CardioDetails from './pages/cardioDetails';
import DigestiveDetails from './pages/digestiveDetails';
import MusculoskeletalDetails from './pages/musculoskeletalDetails';
import RespiratoryDetails from './pages/respiratoryDetails';
import ImmuneDetails from './pages/immuneDetails';
import NeurologicalDetails from './pages/neurologicalDetails';
import EndocrineDetails from './pages/endocrineDetails';
import ReproductiveDetails from './pages/reproductiveDetails';
import UrinaryDetails from './pages/urinaryDetails';
import GoogleloginTest from './pages/googleloginTest';
import SignupForm from './pages/signup';
import LoginForm from './pages/login';
import Calendar from './pages/patientCalandar';
import TestBackendConnection from './pages/testBEC';
import React, { useState, useEffect } from 'react';

function App() {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstname, setFirstname] = useState('');
  useEffect(() => {
    // Check if the access token exists in local storage
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      // User is logged in
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const handleLogin = async () => {
    setIsLoggedIn(true);
    const firstName = localStorage.getItem('firstname'); // Retrieve firstname from localStorage
  setFirstname(firstName); // Update the firstname state
  };
  const handleLogout = () => {
      // Clear the access token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('loggedinUser');
      localStorage.removeItem('firstname');
      localStorage.removeItem('id');
      setFirstname(''); // Clear firstname when logging out
    setIsLoggedIn(false);
    window.location.reload();
    
  };
  const handleSignup = () =>{
    setIsLoggedIn(true); 
    const firstName = localStorage.getItem('firstname');
    setFirstname(firstName);
  };
  

  useEffect(() => {

    if (isLoggedIn){
    // Fetch username from the users table
    const fetchFirstname = async () => {
      try {
        const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_user/${localStorage.getItem('loggedinUser')}`);
        console.log(localStorage.getItem('loggedinUser'))
        if (response.ok) {
          const userData = await response.json();
          setFirstname(userData.firstname);
          
        } else {
          throw new Error('Failed to fetch username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
  
    // Call the fetchUsername function when the component mounts
    fetchFirstname();
  }
  }, [isLoggedIn]);

  return (

    <Router>
    <div className="App">
    <Navbar isLoggedIn={isLoggedIn} firstname={firstname} onLogout={handleLogout} />
      <main className={styles.main}>
        <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/medicalhistory" element={<MedicalHistory />} />
            <Route path="/overallHealthDetails" element={<OverallHealthDetails />} />
            <Route path="/cardioDetails" element={<CardioDetails />} />
            <Route path="/digestiveDetails" element={<DigestiveDetails />} />
            <Route path="/musculoskeletalDetails" element={<MusculoskeletalDetails />} />
            <Route path="/respiratoryDetails" element={<RespiratoryDetails />} />
            <Route path="/immuneDetails" element={<ImmuneDetails />} />
            <Route path="/neurologicalDetails" element={<NeurologicalDetails />} />
            <Route path="/neurologicalDetails" element={<NeurologicalDetails />} />
            <Route path="/endocrineDetails" element={<EndocrineDetails />} />
            <Route path="/reproductiveDetails" element={<ReproductiveDetails />} />
            <Route path="/urinaryDetails" element={<UrinaryDetails />} />
            <Route path="/googleloginTest" element={<GoogleloginTest />} />
            <Route path="/signup" element={<SignupForm onSignup={handleSignup}/>} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
            <Route path="/calandar" element={<Calendar/>} />
            <Route path="/testBEC" element={<TestBackendConnection/>} />
          </Routes>
    
    </main>
    </div>
    </Router>
  );
}

export default App;
