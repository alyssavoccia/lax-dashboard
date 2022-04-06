import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Title from '../../components/title/Title';
import HsSubmissionsPageCard from '../components/HsSubmissionsPageCard';

function HsLinkSubmissions() {
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div>HsLinkSubmissions</div>
  )
}

export default HsLinkSubmissions;