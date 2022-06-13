import ProfileDataCard from './ProfileDataCard';

function ProfileDataCardGrid(userData) {
  const {agility, broad, three, wb} = userData.data;

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
      <ProfileDataCard 
        dataTitle="50's Wall Ball" 
        data={wb ? wb : 0}
      />
      <ProfileDataCard 
        dataTitle="300's" 
        data={three}
      />
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