import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../components/Title';
import TeamPageCard from '../components/TeamPageCard';

function Team() {
  const currentUser = useSelector((state) => state.user.user);
  const allTeamData = useSelector((state) => state.data.data);
  let capitalTeam;

  if (currentUser.team.includes('club')) {
    const teamName = currentUser.team.replace('club', '');
    capitalTeam = teamName[0].toUpperCase() + teamName.slice(1);
  } else {
    capitalTeam = currentUser.team[0].toUpperCase() + currentUser.team.slice(1);
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
          {allTeamData ?
            allTeamData.map((player, i) => {
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