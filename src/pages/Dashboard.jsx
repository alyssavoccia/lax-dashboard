import { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardPlayerSearch from '../components/DashboardPlayerSearch';
import DashboardGrid from '../components/DashboardGrid';
import Spinner from '../components/Spinner';

function Dashboard() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const currentUser = useSelector((state) => state.user.user);

  const handlePlayerChange = e => {
    setSelectedPlayer(e.target.value);
  };

  if (!currentUser) {
    return <Spinner />
  }

  return (
    <div className='pl-20 pr-4 w-full min-h-screen'>
      {/* If current user is admin, show player search */}
      <div className='py-5'>
        {currentUser && currentUser.isAdmin &&
          <DashboardPlayerSearch onChange={handlePlayerChange} /> 
        }
        { !currentUser.isAdmin
          ? <DashboardGrid data={currentUser} />
          : selectedPlayer === undefined || selectedPlayer === '' || selectedPlayer === null
          ? <p className="text-lg font-bold text-slate-800">Please choose a player to view their dashboard.</p>
          : <DashboardGrid data={selectedPlayer} />
        }
      </div>
    </div>
  )
}

export default Dashboard;