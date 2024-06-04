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
function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://six440-ihi-team-practicum-project-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(username)
      console.log(password)
      const data = await response.json();
      console.log(data); // Check the response data in the console
      
      if (!response.ok) {
        setError('Wrong username or password. Please try again.');
        return;
      }
      
      // Check if the response contains the access token
      if (data && data.access_token) {
        localStorage.setItem('loggedinUser', username);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('firstname', data.firstname);
        localStorage.setItem('id', data.id);
        onLogin();
        navigate('/');
      } else {
        // Handle the case where the access token is not present in the response
        throw new Error('Access token not found in response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', backgroundColor: "white", padding: '40px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
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
          Sign in
        </Button>
      </form>
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
          {error}
        </Typography>
      )}
      <Typography variant="body1" style={{ marginTop: '1rem' }}>
        Need to create an account?{' '}
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          Click here to sign up
        </Link>
      </Typography>

      {/* {showPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            zIndex: 9999,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5">Oops! You do not have an account.</Typography>
          <Typography variant="body1">Please sign up instead.</Typography>
          <Button variant="contained" onClick={handlePopupClose}>Close</Button>
          <Button variant="contained" onClick={handleSignUpClick}>Sign up</Button>
        </Box>
      )} */}
    </Container>
  );
}

export default LoginForm;
