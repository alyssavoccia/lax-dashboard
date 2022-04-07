import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import Title from './Title';
import HsProfileLink from './HsProfileLink';

function HsProfileLinkGrid() {
  const [userLinkObj, setUserLinkObj] = useState({});
  const currentUser = useSelector((state) => state.user.user);

  const {wbLink, threeLink, broadLink, agilityLink} = userLinkObj;

  useEffect(() => {
    const getUserLinks = async () => {
      const linkDocRef = doc(db, currentUser.team, currentUser.id, 'links', currentUser.id);
      const linkDocSnap = await getDoc(linkDocRef);
      setUserLinkObj(linkDocSnap.data());
    }
    getUserLinks();
  }, [currentUser.id, currentUser.team]);

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

    alert('Link Submitted!');
    input.value = '';
  }
  

  return (
    <Grid container direction='row' alignItems='flex-start' sx={{my: 4}}>
      <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} item xs={12}>
        <Title>Upload Links</Title>
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="Wall Ball Link" data={wbLink} handleSubmit={handleSubmit} dataId="wbLink" />
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="300's Link" data={threeLink} handleSubmit={handleSubmit} dataId="threeLink" />
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="Broad Jump Link" data={broadLink} handleSubmit={handleSubmit} dataId="broadLink" />
      </Grid>
      <Grid item xs={12} sx={{textAlign: 'left', mt: 2}}>
        <HsProfileLink dataTitle="5-10-5 Link" data={agilityLink} handleSubmit={handleSubmit} dataId="agilityLink" />
      </Grid>
    </Grid>
  )
}

export default HsProfileLinkGrid