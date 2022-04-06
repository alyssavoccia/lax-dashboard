import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../components/Title';
import HsSubmissionsPageCard from '../components/HsSubmissionsPageCard';

function HsLinkSubmissions() {
  const [usersData, setUsersData] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const userSubmissions = [];

  useEffect(() => {  
    const getUserData = async (users) => {
      for (const person of users) {
        const docRef = doc(db, currentUser.team, person.id, 'links', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj.agilityLink || userDataObj.broadLink || userDataObj.threeLink || userDataObj.wbLink) {
          setUsersData((prevState) => [...prevState, {...person, ...userDataObj}]);
        }
      }
    };

    const getTeam = async () => {
      const users = [];
      const snapshot = await db.collection(currentUser.team).get();
      snapshot.docs.forEach(person => {
        if (!person.data().isAdmin) {
          users.push(person.data());
        }
      });
      if (users.length > 0) {
        getUserData(users);
      }
    };

    getTeam();
  }, [currentUser.team]);
  

  const handleDelete = (e) => {
    const linkId = e.target.parentNode.parentNode.id;
    const dataState = usersData[0];
    const playerId = e.target.parentNode.parentNode.parentNode.parentNode.id;

    // Create updated value object
    const updatedValue = {
      [linkId]: null
    };

    // Update on firebase
    const docRef = doc(db, 'highschool', playerId, 'links', playerId);
    updateDoc(docRef, {[linkId]: null});

    // Update state - will remove item from page
    setUsersData([{...dataState, ...updatedValue}]);
  };

  if (usersData.length > 0) {
    usersData.forEach((player, i) => {
      if (player.wbLink || player.threeLink || player.agilityLink || player.broadLink) {
        userSubmissions.push(player);
      }
    })
  }

  console.log(usersData);

  // if (loading) {
  //   return <Spinner />
  // }

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
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Title>Pending Submissions</Title>
        <Grid container spacing={3}>
          {userSubmissions.length > 0
            ? userSubmissions.map((player, i) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <HsSubmissionsPageCard
                    name={player.displayName}
                    playerId={player.id}
                    wbLink={player.wbLink}
                    threeLink={player.threeLink}
                    agilityLink={player.agilityLink}
                    broadLink={player.broadLink}
                    handleDelete={handleDelete}
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

export default HsLinkSubmissions;