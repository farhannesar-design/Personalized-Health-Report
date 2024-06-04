import PaperGrid from "../components/Paper/paper"
import { Paper } from '@mui/material';
import healthreportImage from '../images/health-medical-report_24640-78411.jpg'
function Home({ isLoggedIn }){

    return(
      <div>
            {isLoggedIn && (
                <header style={{ textAlign: 'center', paddingBottom: '20px' }}>
                    <h1>My Personalized Health Report</h1>
                </header>
            )}
            {isLoggedIn ? (
                <PaperGrid />
            ) : (
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
                    <h2>Health Report</h2>
                    <img src={healthreportImage} alt="Health Report" style={{ maxWidth: '100%', height: '400px', margin: '10px auto' }} />
                    <p>Welcome to our health report website! Please sign up or login to view your health report dashboard.</p>
                </Paper>
            )}
        </div>

    )
}
export default Home