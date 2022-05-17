import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Title from '../components/Title';
import Grid from '@mui/material/Grid';
import PlayerDataTable from '../components/PlayerDataTable';

function PlayerData() {
  const currentData = useSelector((state) => state.data.data);

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
          {currentData && <PlayerDataTable rows={currentData} />}
        </Grid>
      </Container>
    </Box>
  )
}

export default PlayerData;