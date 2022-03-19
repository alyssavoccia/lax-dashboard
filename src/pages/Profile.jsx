import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

function Profile() {
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
      <h1>Profile Page</h1>
    </Container>

  </Box>
  )
}

export default Profile