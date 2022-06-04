import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../components/Title';
import HsSubmissionsPageCard from '../components/HsSubmissionsPageCard';

function HsLinkSubmissions() {
  const currentLinks = useSelector((state) => state.hsLinks.hsLinks);
  const userSubmissions = [];
  
  const handleDelete = (e) => {
    const linkId = e.target.parentNode.parentNode.id;
    const playerId = e.target.parentNode.parentNode.parentNode.parentNode.id;

    // Update on firebase
    const docRef = doc(db, 'highschool', playerId, 'links', playerId);
    updateDoc(docRef, `{${linkId}: null}`);
  };

  if (currentLinks.length > 0) {
    currentLinks.forEach((player, i) => {
      if (player.wbLink || player.threeLink || player.agilityLink || player.broadLink) {
        userSubmissions.push(player);
      }
    })
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
            : <Grid item xs={12} md={6} lg={4}>
                <Typography variant='subtitle1'>Currently no pending submissons.</Typography>
              </Grid>
          }
        </Grid>
      </Container>
    </Box>
  )
}

export default HsLinkSubmissions;