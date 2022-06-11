import { useSelector } from 'react-redux';
import TeamPageCard from '../components/TeamPageCard';

function Team() {
  const currentUser = useSelector((state) => state.user.user);
  const allTeamData = useSelector((state) => state.data.data);
  let capitalTeam;

  if (currentUser.team.includes('club')) {
    const teamName = currentUser.team.replace('club', '');
    capitalTeam = teamName[0].toUpperCase() + teamName.slice(1);
  } else {
    capitalTeam = currentUser.team[0].toUpperCase() + currentUser.team.slice(1);
  }

  return (
    <div className='lg:container mx-auto pl-20 pr-4 py-4'>
      <div className="flex justify-center mb-5">
        <div className="block p-4 rounded-lg shadow-md bg-slate-600 min-w-full">
          <h1 className="text-white text-xl leading-tight font-medium">{capitalTeam} Roster</h1>
        </div>
      </div>
        <div className='flex flex-wrap gap-7 justify-center'>
          {allTeamData &&
            allTeamData.map((player, i) => {
              return (
                <TeamPageCard
                  key={player.id}
                  name={player.displayName}
                  position={player.position}
                  grad={player.grad}
                  agility={player.agility}
                  broad={player.broad}
                  three={player.three}
                  wb={player.wb}
                />
              )
            })
          }
        </div>
    </div>
  )
}

export default Team;