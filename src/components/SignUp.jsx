import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import { db, auth, createUserProfileDocument } from '../firebase.config';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SignUpHS from './SignUpHS';

function SignUp() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: '',
    isAdmin: false
  });

  const navigate = useNavigate();

  const {displayName, email, password, confirmPassword, team} = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSeverity('error');
      setMessage('Passwords DO NOT match.');
      setOpen(true);
    }

    if (password.length < 6) {
      setSeverity('error');
      setMessage('Password must be AT LEAST 6 characters long.');
      setOpen(true);
      return;
    }

    // Check if user's team exists
    const teamRef = db.collection(team);
    const teamSnapshot = await teamRef.get();

    if (teamSnapshot.size === 0) {
      setSeverity('error');
      setMessage('Team DOES NOT exist.');
      setOpen(true);
      return;
    }

    // Try to create a new user
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, displayName, team);      

      navigate('/');
    } catch (error) {
      setSeverity('error');
      setMessage('Error signing up. Please try again.');
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Grid item xs={12} md={6}>
      <Avatar sx={{ m: '15px auto', bgcolor: '#222' }}>
        <PersonOutlineIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          inputProps={{
            form: {
              autocomplete: 'off'
            }
          }}
          margin="normal"
          required
          fullWidth
          label="Full Name"
          name="displayName"
          id="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <TextField
          inputProps={{
            form: {
              autocomplete: 'off'
            }
          }}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          id="email"
          onChange={handleChange}
          type="email"
          value={email}
        />
        <TextField
          inputProps={{
            form: {
              autocomplete: 'off'
            }
          }}
          margin="normal"
          required
          fullWidth
          name="password"
          id="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          value={confirmPassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Team Code"
          name="team"
          id="team"
          value={team}
          onChange={handleChange}
        />
        <Box sx={{display: 'flex', gap: '10px'}}>
          <Button
            onClick={handleSubmit}
            type="submit"
            sx={{mb: 1, flex: '50%'}}
            variant="contained"
          >
            Sign Up
          </Button>
          <SignUpHS sx={{flex: '50%'}} />
        </Box>
      </Box>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>   
    </Grid>
  )
}

export default SignUp;