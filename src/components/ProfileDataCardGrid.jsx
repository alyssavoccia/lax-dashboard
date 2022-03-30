import Grid from '@mui/material/Grid';
import ProfileDataCard from './ProfileDataCard';

function ProfileDataCardGrid(userData) {
  const {agility, broad, three, wb} = userData;

  return (
    <>
      {/* ROW 1 */}
      <Grid item xs={12} sm={6}>
        <ProfileDataCard 
          dataTitle="50's Wall Ball" 
          data={wb}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProfileDataCard 
          dataTitle="300's" 
          data={three}
        />
      </Grid>

      {/* ROW 2 */}
      <Grid item xs={12} sm={6}>
        <ProfileDataCard 
          dataTitle="5-10-5" 
          data={agility}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProfileDataCard 
          dataTitle="Broad Jump" 
          data={broad}
        />
      </Grid>
    </>
  )
}

export default ProfileDataCardGrid;