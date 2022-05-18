import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Title from './Title';
import HsProfileLink from './HsProfileLink';

function HsProfileLinkGrid() {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.user);

  const handleSubmit = (e) => {
    // Get the input id to know which value is being updated in firebase
    const inputId = e.target.parentElement.parentElement.childNodes[0].childNodes[0].id;

    // Get the link that the user entered
    const inputValue = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].value;

    // Get the input element
    const input = e.target.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];

    const updatedValue = {
      [inputId]: inputValue
    };

    // Update on firebase
    const docRef = doc(db, currentUser.team, currentUser.id, 'links', currentUser.id);
    updateDoc(docRef, updatedValue);


    setOpen(true);
    input.value = '';
  }

    // Handle snackbar close
    const handleClose = () => {
      setOpen(false);
    };
  

  return (
    <Grid container direction='row' alignItems='flex-start' sx={{my: 4}}>
      <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} item xs={12}>
        <Title>Upload Links</Title>
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="Wall Ball Link" handleSubmit={handleSubmit} dataId="wbLink" />
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="300's Link" handleSubmit={handleSubmit} dataId="threeLink" />
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="Broad Jump Link" handleSubmit={handleSubmit} dataId="broadLink" />
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="5-10-5 Link" handleSubmit={handleSubmit} dataId="agilityLink" />
      </Grid>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>Link submitted successfully!</Alert>
      </Snackbar>      
    </Grid>
  )
}

export default HsProfileLinkGrid;