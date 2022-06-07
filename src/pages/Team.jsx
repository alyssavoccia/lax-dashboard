import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
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
        <div className="block p-4 rounded-lg shadow-md bg-violet-500 min-w-full">
          <h1 className="text-white text-xl leading-tight font-medium">{capitalTeam} Roster</h1>
        </div>
      </div>
        <Grid container spacing={3} sx={{ textAlign: 'center' }}>
          {allTeamData ?
            allTeamData.map((player, i) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={i}>
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
                </Grid>
              )
            })
            : ''
          }
        </Grid>
    </div>
  )
}

export default Team;