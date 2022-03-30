import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

import Spinner from '../components/Spinner';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../components/Title';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const position = null;
  const grad = null;

  useEffect(() => {
    const auth = getAuth();
    
    const fetchCurrentUser = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        setCurrentUser(userDoc.data());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentUser();
  }, []);
  
  if (loading) {
    return <Spinner />
  } else {
    return (
      <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
      >
      <Toolbar />

      <Container maxWidth="lg" sx={{ my: 5, mx: 4 }}>
        <Grid container spacing={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 100, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
            <Title>{currentUser.displayName}</Title>

            <Stack direction="row" spacing={2}>
              {currentUser.isAdmin 
              ? <Chip label="Admin" /> 
              : <>
                  <Chip label={position ? position : 'POS'} />
                  <Chip label={grad ? grad : 'GRAD'} />
                </>
              }
            </Stack>
          </Paper>
        </Grid>
      </Container>

      </Box>
    )
  }
}

export default Profile;