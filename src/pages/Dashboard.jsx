import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import DashboardPlayerSearch from '../components/DashboardPlayerSearch';

function Dashboard() {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const currentUser = useSelector((state) => state.user.user);

  const handlePlayerChange = (e, value) => {
    setSelectedPlayer({
      chosenPlayer: value
    });
  };

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

      {currentUser.isAdmin ?
        <Container maxWidth="lg" sx={{mt: 4, mb: 2}}>
          <DashboardPlayerSearch onChange={handlePlayerChange} />
        </Container>
        
        : <></>
      }

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Lax Dashboard</h1>
      </Container>

    </Box>
  )
}

export default Dashboard