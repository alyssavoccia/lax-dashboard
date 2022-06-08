import { useSelector } from 'react-redux';
import PlayerDataTable from '../components/PlayerDataTable';

function PlayerData() {
  const allTeamData = useSelector((state) => state.data.data);

  return (
    <div className='lg:container mx-auto pl-20 pr-4 py-4'>
      <div className="flex justify-center mb-5">
        <div className="block p-4 rounded-lg shadow-md bg-violet-500 min-w-full">
          <h1 className="text-white text-xl leading-tight font-medium">Player Data</h1>
        </div>
      </div>
      {allTeamData &&
        <PlayerDataTable rows={allTeamData} />
      }
    </div>
  )
}

export default PlayerData;