import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Home } from "@mui/icons-material";
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

// const pages = [
//   { label: 'Home', icon: <Home />, to: '/' },
//   { label: 'Charts', icon: <InsertChartOutlinedTwoToneIcon />, to: '/charts' },
//   { label: 'Patient Details', icon: <MedicalInformationOutlinedIcon />, to: '/medicalhistory' },
//   { label: 'Appointments', icon: <CalendarMonthIcon />, to: '/calandar' }
// ];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({ isLoggedIn, firstname, onLogout }) {
  const pages = [
    { label: 'Home', icon: <Home />, to: '/' },
    ...(isLoggedIn ? [
      { label: 'Charts', icon: <InsertChartOutlinedTwoToneIcon />, to: '/charts' },
      { label: 'Patient Details', icon: <MedicalInformationOutlinedIcon />, to: '/medicalhistory' },
      { label: 'Appointments', icon: <CalendarMonthIcon />, to: '/calandar' }
    ] : [])
  ];
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(false);

  // Function to handle admin login
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };


  // const handleLogout = () => {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('loggedinUser');
  //   setIsLoggedIn(false);
  //   onLogout();
  // };
  // React.useEffect(() => {
  //   const storedToken = localStorage.getItem('access_token');
  //   if (storedToken) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            className="cursorp"
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "light blue",
                position: "relative",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "calc(100% - 8px)",
                  height: "calc(100% - 8px)",
                  borderRadius: "50%",
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                H
              </span>
            </Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.to}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>




          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
              <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.to}>
                {page.icon}
                <Typography variant="inherit" sx={{ ml: 1 }}>{page.label}</Typography>

              </MenuItem>
            ))}
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <SearchIcon sx={{ color: 'inherit', mr: 1 }} />
            <InputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: 'inherit' }}
            />
          </Box> */}

          {/* Add a "Sign up" button
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{
              backgroundColor: 'transparent', 
              color: 'white', 
            }}

            > <PersonIcon /> Sign up</Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{
              backgroundColor: 'transparent', // Remove background color
              color: 'white', // Text color of the button
              // borderRadius: '20px', // Rounded corners

            }}

            > <LoginIcon /> Login</Button>
          </Link> */}
          {isLoggedIn ? (
          // Display "Welcome User!" if user is logged in
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome {firstname}!

             <Button color="inherit" onClick={onLogout}>
            Log out
          </Button>
          </Typography>
        
        ) : (
          // Conditionally render sign-up and login buttons if user is not logged in
          <>
            <Button component={Link} to="/signup" color="inherit" startIcon={<PersonIcon />}>
              Sign up
            </Button>
            <Button component={Link} to="/login" color="inherit" startIcon={<LoginIcon />}>
              Login
            </Button>
          </>
        )}


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;