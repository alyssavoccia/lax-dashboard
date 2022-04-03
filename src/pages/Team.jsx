import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../components/Title';
import Spinner from '../components/Spinner';
import TeamPageCard from '../components/TeamPageCard';

function Team() {
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const capitalTeam = currentUser.team[0].toUpperCase() + currentUser.team.slice(1);

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
        <Title sx={{ textAlign: 'left' }}>{capitalTeam} Roster</Title>
        <Grid container spacing={3} sx={{ textAlign: 'center' }}>
          {playerData ?
            playerData.map((player, i) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <TeamPageCard
                    key={player.id}
                    name={player.displayName}
                    position={player.position}
                    grad={player.grad}
                    agility={player.agility}
                    broad={player.broad}
                    three={player.three}
                    wb={player.wb}
                  />
                </Grid>
              )
            })
            : ''
          }
        </Grid>
      </Container>
    </Box>
  )
}

export default Team;