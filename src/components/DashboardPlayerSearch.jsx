import { useSelector } from 'react-redux';

function DashboardPlayerSearch({ onChange }) {
  const currentTeam = useSelector((state) => state.team.team);
  const players = [];

  currentTeam && currentTeam.map(person => !person.isAdmin && players.push(person.displayName));

  return (
    <div className="flex justify-flex-start">
      <div className="xl:w-96">
        <select className="form-select
          block
          w-full
          px-4
          py-2
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
          onChange={onChange}
          id='dashboard-player-search'
        >
          <option defaultValue='select-player'>Select Player</option>
          {players.map((player, i) => (
            <option key={i} value={player}>{player}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default DashboardPlayerSearch;