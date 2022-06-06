import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import HsProfileLink from './HsProfileLink';

function HsProfileLinkGrid() {
  const [userLinkObj, setUserLinkObj] = useState({});
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.user);

  const {wbLink, threeLink, broadLink, agilityLink} = userLinkObj;

  useEffect(() => {
    const getUserLinks = async () => {
      if (currentUser.isAdmin && currentUser.team === 'highschool') {
        const linkDocRef = doc(db, currentUser.team, currentUser.id, 'links', currentUser.id);
        const linkDocSnap = await getDoc(linkDocRef);
        setUserLinkObj(linkDocSnap.data());
      }
    }
    getUserLinks();
  }, [currentUser.id, currentUser.isAdmin, currentUser.team]);

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
    <div className='md:container my-4 mx-auto'>
      <HsProfileLink dataTitle="Wall Ball Link" data={wbLink} handleSubmit={handleSubmit} dataId="wbLink" />
      <HsProfileLink dataTitle="300's Link" data={threeLink} handleSubmit={handleSubmit} dataId="threeLink" />
      <HsProfileLink dataTitle="Broad Jump Link" data={broadLink} handleSubmit={handleSubmit} dataId="broadLink" />
      <HsProfileLink dataTitle="5-10-5 Link" data={agilityLink} handleSubmit={handleSubmit} dataId="agilityLink" />

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>Link submitted successfully!</Alert>
      </Snackbar>      
    </div>
  )
}

export default HsProfileLinkGrid;