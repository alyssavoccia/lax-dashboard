import ProfileDataCard from './ProfileDataCard';

function ProfileDataCardGrid(userData) {
  const {agility, broad, three, wb} = userData.data;

  return (
    <div class="flex flex-wrap justify-center gap-4 mt-8 w-full">
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
    </div>
  )
}

export default ProfileDataCardGrid;