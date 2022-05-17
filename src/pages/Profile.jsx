import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../components/Title';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProfileDataCardGrid from '../components/ProfileDataCardGrid';
import HsProfileLinkGrid from '../components/HsProfileLinkGrid';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const currentData = useSelector((state) => state.data.data);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser.isAdmin) {
       const result = currentData.filter(person => person.displayName === currentUser.displayName);
       setUserData(result[0]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    currentUser && fetchUserData();
  }, [currentData, currentUser]);

  const handleClose = () => {
    setOpen(false);
  }
  
  if (loading) {
    return <Spinner />
  }
  
  return (
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100vh',
      justifyItems: 'center',
      overflow: 'auto'
    }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ my: 5, display: 'flex', justifyItems: 'center' }}>
        <Grid sx={{width: '100%'}}>
          <Paper elevation={0} sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12}>
              <Title>{currentUser.displayName}</Title>

              <Stack direction="row" spacing={2}>
                {currentUser.isAdmin 
                ? <Chip label="Admin" sx={{borderRadius: '5px'}} /> 
                : <>
                    <Chip label={userData.position ? userData.position : 'POS'} sx={{borderRadius: '5px'}} />
                    <Chip label={userData.grad ? userData.grad : 'GRAD'} sx={{borderRadius: '5px'}} />
                  </>
                }
              </Stack>
            </Grid>

            {/* PLAYER DATA CARDS */}
            {!currentUser.isAdmin &&  <ProfileDataCardGrid data={userData} />}
            {(!currentUser.isAdmin && currentUser.team === 'highschool') && <HsProfileLinkGrid />}
          </Paper>
        </Grid>
      </Container>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>Error fetching data. Please try again.</Alert>
      </Snackbar>   
    </Box>
  )
}

export default Profile;