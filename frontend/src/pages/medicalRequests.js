import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

function MedicalHistory() {
  const [medicationRequestData, setMedicationRequestData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('id');
    if (userIdFromStorage) {
      setLoggedInUserId(userIdFromStorage);
      fetchMedicationRequestData(userIdFromStorage);
      fetchPatientData(userIdFromStorage);
    }
  }, []);

  const fetchMedicationRequestData = async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_medicationrequest_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch medication request data');
      }
      const data = await response.json();
      setMedicationRequestData(data);
    } catch (error) {
      console.error('Error fetching medication request data:', error);
    }
  };

  const fetchPatientData = async (userId) => {
    try {
      const response = await fetch(`https://six440-ihi-team-practicum-project-backend.onrender.com/get_patient_data?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
      const data = await response.json();
      setPatientData(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
       <h1 style={{ textAlign: 'center', paddingLeft: '10px' }}>Patient Details</h1>
      <h2 style={{ textAlign: 'left', paddingLeft: '10px'}}>Basic Info</h2>
      {patientData.length > 0 ? (
    <div style={{ textAlign: 'left' }}>
        {patientData
          .filter(item => 
            item.name?.[0]?.given?.[0] ||
            item.name?.[0]?.family ||
            item.telecom?.[0]?.value ||
            item.gender ||
            item.birthDate
          )
          .map((item, index) => (
            <ui>
            <li key={index} style={{ marginBottom: '10px' }}><strong>Name:</strong> {item.name?.[0]?.given?.[0]} {item.name?.[0]?.family}<br/> </li>
            
              {/* <div style={{ marginBottom: '10px' }}> */}
              <li key={index} style={{ marginBottom: '10px' }}><strong>Phone Number:</strong> {item.telecom?.[0]?.value}<br/></li>
              {/* </div> */}
              {/* <div style={{ marginBottom: '10px' }}> */}
              <li key={index} style={{ marginBottom: '10px' }}><strong>Gender:</strong> {item.gender}<br/></li>
              {/* </div> */}
              {/* <div style={{ marginBottom: '10px' }}> */}
              <li key={index} style={{ marginBottom: '10px' }}><strong>Birth Date:</strong> {item.birthDate}<br/></li>
              {/* </div> */}
           
            </ui>
          ))}
  
    </div>
  ) : (
    <p>No patient data available</p>
  )}
      <h2 style={{ textAlign: 'left', paddingLeft: '10px'}}>Medical History</h2>
      {medicationRequestData.length > 0 ? (
 <div style={{ textAlign: 'left' }}>
  {medicationRequestData
    .filter(item => 
      item.medication?.CodeableConcept?.text ||
      item.extension?.[0]?.valueCodeableConcept?.coding?.[0]?.code ||
      item.intent ||
      item.status
    )
    .map((item, index) => (
      <ui>
      {/* <li key={index} style={{ marginBottom: '10px' }}>
        <strong>Medication Text:</strong> {item.medication?.CodeableConcept?.text}<br /></li> */}
        <li key={index} style={{ marginBottom: '10px' }}><strong>Value Code:</strong> {item.extension?.[0]?.valueCodeableConcept?.coding?.[0]?.code}<br/></li>
        <li key={index} style={{ marginBottom: '10px' }}><strong>Intent:</strong> {item.intent}<br /></li>
        <li key={index} style={{ marginBottom: '10px' }}><strong>Status:</strong> {item.status}<br /></li>
      {/* </li> */}
      </ui>
    ))}
</div>
) : (
  <p>No medication request data available</p>
)}
    </Paper>
  );
}

export default MedicalHistory;
