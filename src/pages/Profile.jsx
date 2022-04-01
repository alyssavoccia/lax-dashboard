import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
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
import ProfileDataCardGrid from '../components/ProfileDataCardGrid';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log(currentUser);

  useEffect(() => {
    const auth = getAuth();

    const fetchUserData = async () => {
      if (!currentUser.isAdmin) {
        try {
          const userDataRef = doc(db, currentUser.team, auth.currentUser.uid, 'data', auth.currentUser.uid);
          const userDataDoc = await getDoc(userDataRef);

          setUserData(userDataDoc.data());
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoading(false);
      }
    }

    currentUser && fetchUserData();
  }, [currentUser]);
  
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
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 100, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Title>{currentUser.displayName}</Title>

                <Stack direction="row" spacing={2}>
                  {currentUser.isAdmin 
                  ? <Chip label="Admin" /> 
                  : <>
                      <Chip label={userData.position ? userData.position : 'POS'} />
                      <Chip label={userData.grad ? userData.grad : 'GRAD'} />
                    </>
                  }
                </Stack>
              </Paper>
            </Grid>
            
            {/* PLAYER DATA CARDS */}
            {currentUser.isAdmin
              ? <></>
              : <ProfileDataCardGrid data={userData} />
            }

          </Grid>
        </Container>
      </Box>
    )
  }
}

export default Profile;