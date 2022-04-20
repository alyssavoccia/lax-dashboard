import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Title from '../components/Title';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function SignInSignUp() {
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title>Lax Dashboard</Title>
        <Grid container spacing={5}>
          <SignIn />
          <SignUp />
        </Grid>            
      </Box>
    </Container>
  )
}

export default SignInSignUp;