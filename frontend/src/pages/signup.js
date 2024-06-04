import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
function SignupForm({ onSignup }) {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://six440-ihi-team-practicum-project-backend.onrender.com/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          firstname,
          lastname
        }),
      });

      if (response.status === 409) {
        // User already exists, show popup
        setShowPopup(true);
      } else if (!response.ok) {
        // Other error occurred, log error
        throw new Error('Signup failed');
      } else {

     
        // Clear input fields after successful signup
        setUsername('');
        setPassword('');

        const data = await response.json();
        localStorage.setItem('loggedinUser', username);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('id', data.id);
        localStorage.setItem('access_token', data.access_token);
        console.log("data=", data)
       

        // Call the onSignup callback to update the parent component state
        onSignup();
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      // Show popup for other errors
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleLoginClick = () => {
    setShowPopup(true);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', backgroundColor: "white", padding: '40px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
         <FormControl fullWidth  margin="normal" variant="outlined" onChange={(e) => setPassword(e.target.value)}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

    
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign up
        </Button>
      </form>
      <Typography variant="body1" style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none' }} onClick={handleLoginClick}>
          Click here to login
        </Link>
      </Typography>

      {showPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            zIndex: 9999, // Ensure the popup appears above other elements
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5">Oops! You already have an account.</Typography>
          <Typography variant="body1">Please login instead.</Typography>
          <Button variant="contained" onClick={handlePopupClose}>Close</Button>
        </Box>
      )}
    </Container>
  );
}

export default SignupForm;
