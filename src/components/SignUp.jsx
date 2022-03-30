import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Typography from '@mui/material/Typography';

function SignUp() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: '',
    isAdmin: false
  });

  const navigate = useNavigate();

  const {displayName, email, password, confirmPassword, team, isAdmin} = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName,
        team,
        isAdmin
      });

      const formDataCopy = {...formData};
      delete formDataCopy.password;
      delete formDataCopy.confirmPassword;

      const userData = {
        agility: null,
        broad: null,
        displayName,
        grad: null,
        id: user.uid,
        position: null,
        three: null,
        wb: null
      };

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      await setDoc(doc(db, team, user.uid), formDataCopy);
      await setDoc(doc(db, team, user.uid, 'data', user.uid), userData);

      navigate('/');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <Grid item xs={12} md={6}>
      <Avatar sx={{ m: '15px auto', bgcolor: 'secondary.main' }}>
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
        <Box display='flex' justifyContent='space-between'>
          <Button
            onClick={handleSubmit}
            type="submit"
            sx={{pl: 15, pr: 15, mb: 1}}
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export default SignUp;