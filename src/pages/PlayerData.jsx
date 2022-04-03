import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Title from '../components/Title';
import Grid from '@mui/material/Grid';
import Spinner from '../components/Spinner';
import PlayerDataTable from '../components/PlayerDataTable';

function PlayerData() {
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState([]);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const users = [];
    const usersData = [];

    const getUserData = async () => {
      for (const person of users) {
        const docRef = doc(db, currentUser.team, person.id, 'data', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj) {
          usersData.push({...person, ...userDataObj});
        }

        if (usersData.length === users.length) {
          setPlayerData(usersData);
          setLoading(false);
        }
      };
    }

    const getAllTeamUsers = async () => {
      const snapshot = await db.collection(currentUser.team).get();
      snapshot.docs.forEach((doc, index, array) => {
        if (!doc.data().isAdmin) {
          users.push(doc.data());
        }

        if (index === array.length - 1) {
          getUserData();
        }
      });
    }

    getAllTeamUsers();
  }, [currentUser.team]);

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
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Title>Player Data</Title>
        <Grid container flex>
          {playerData ?
            <PlayerDataTable rows={playerData} />
            : ''
          }
        </Grid>
      </Container>
    </Box>
  )
}

export default PlayerData;