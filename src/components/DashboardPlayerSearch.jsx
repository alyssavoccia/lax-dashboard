
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { db } from '../firebase.config'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function DashboardPlayerSearch({ onChange }) {
  const currentUser = useSelector((state) => state.user.user);
  const players = [];

  const getTeam = async () => {
    const snapshot = await db.collection(currentUser.team).get();
    snapshot.docs.map(doc => doc.data().isAdmin ? '' : players.push(doc.data().displayName));
  }
  
  getTeam();

  return (
    <Autocomplete
      onChange={onChange}
      disablePortal
      id="dashboard-player-search"
      options={players}
      sx={{ width: 300, backgroundColor: '#FFF' }}
      renderInput={(params) => <TextField {...params} label="Player" />}
    />
  )
}

export default DashboardPlayerSearch;