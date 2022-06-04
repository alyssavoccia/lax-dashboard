
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function DashboardPlayerSearch({ onChange }) {
  const currentTeam = useSelector((state) => state.team.team);
  const players = [];

  currentTeam && currentTeam.map(person => !person.isAdmin && players.push(person.displayName));

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