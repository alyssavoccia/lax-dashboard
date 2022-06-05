import { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Title from '../components/Title';
import DashboardPlayerSearch from '../components/DashboardPlayerSearch';
import DashboardGrid from '../components/DashboardGrid';
import Spinner from '../components/Spinner';

function Dashboard() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const currentUser = useSelector((state) => state.user.user);

  const handlePlayerChange = (e, value) => {
    setSelectedPlayer(e.target.value);
  };

  if (!currentUser) {
    return <Spinner />
  }

  return (
    <div className='pl-60 bg-gray-50 w-full h-full'>
      {/* If current user is admin, show player search */}
      {currentUser && currentUser.isAdmin 
      ? <Container maxWidth="lg" sx={{mt: 4, mb: 2}}>
          <DashboardPlayerSearch onChange={handlePlayerChange} />
        </Container>
        
        : <></>
      }

      {/* DASHBOARD GRID ITEMS */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        { !currentUser.isAdmin
          ? <DashboardGrid data={currentUser} />
          : selectedPlayer === undefined || selectedPlayer === '' || selectedPlayer === null
          ? <Title>Please choose a player to view their dashboard.</Title>
          : <DashboardGrid data={selectedPlayer} />
        }
      </Container>
    </div>
  )
}

export default Dashboard;