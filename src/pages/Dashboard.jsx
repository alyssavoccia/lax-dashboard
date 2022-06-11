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
          <div className="flex items-center p-3 mb-5 rounded-lg shadow-md bg-slate-600 w-full">
            <DashboardPlayerSearch onChange={handlePlayerChange} />
            {(selectedPlayer === undefined || selectedPlayer === '' || selectedPlayer === null) &&
              <p className="text-lg font-bold text-white ml-5">Please choose a player to view their dashboard.</p>
            }
          </div>
        }
        {selectedPlayer &&
          <DashboardGrid data={selectedPlayer} />
        }
        { !currentUser.isAdmin &&
          <DashboardGrid data={currentUser} />
        }
      </div>
    </div>
  )
}

export default Dashboard;