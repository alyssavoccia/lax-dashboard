import { auth, createUserProfileDocument } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function SuccessfulPayment() {
  const navigate = useNavigate();

  const getHsUser = async () => {
    const { displayName, email, password, grad, position, team} = JSON.parse(localStorage.getItem("hsUser"));

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await createUserProfileDocument(user, displayName, team, grad, position);

    localStorage.removeItem('hsUser');

    navigate('/');
  }
  
  getHsUser();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        textAlign: 'center'
      }}
    >
      <Toolbar />
      <Typography variant="h1" gutterBottom>Payment Successful!</Typography>
      <Typography variant="h2" gutterBottom>You will now be redirected to your dashboard.</Typography>
    </Box>
  )
}

export default SuccessfulPayment;