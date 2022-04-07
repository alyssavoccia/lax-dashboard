import Grid from '@mui/material/Grid';
import ProfileDataCard from './ProfileDataCard';

function ProfileDataCardGrid(userData) {
  const {agility, broad, three, wb} = userData.data;

  return (
    <Grid item sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', mt: 2}}>
      {/* ROW 1 */}
        <ProfileDataCard 
          dataTitle="50's Wall Ball" 
          data={wb ? wb : 0}
        />
        <ProfileDataCard 
          dataTitle="300's" 
          data={three}
        />
      {/* ROW 2 */}
        <ProfileDataCard 
          dataTitle="5-10-5" 
          data={agility}
        />

        <ProfileDataCard 
          dataTitle="Broad Jump" 
          data={broad}
        />
    </Grid>
  )
}

export default ProfileDataCardGrid;