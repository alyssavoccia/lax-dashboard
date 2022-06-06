import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import ProfileDataCardGrid from '../components/ProfileDataCardGrid';
import HsProfileLinkGrid from '../components/HsProfileLinkGrid';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.user);
  const currentData = useSelector((state) => state.data.data);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser.isAdmin) {
       const result = currentData.filter(person => person.displayName === currentUser.displayName);
       setUserData(result[0]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    currentUser && fetchUserData();
  }, [currentData, currentUser]);
  
  if (loading) {
    return <Spinner />
  }
  
  return (
    <div className='lg:container mx-auto pl-48 pr-4 py-4'>
      <div className="flex justify-center">
        <div className="block rounded-lg shadow-md bg-cyan-500 w-full text-left">
          <div className="text-md text-white font-bold py-3 px-6">Profile Information</div>
          <div className="p-6 bg-white rounded-b">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{currentUser.displayName}</h5>
            <div className="flex space-x-2">
              <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white rounded"> 
                {userData.position ? userData.position : 'POS'}
              </span>
              <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white rounded">
                {userData.grad ? userData.grad : 'GRAD'}
              </span>
            </div>

            {!currentUser.isAdmin &&  <ProfileDataCardGrid data={userData} />}
          </div>
        </div>
      </div>
      
      {(!currentUser.isAdmin && currentUser.team === 'highschool') && 
        <div className="block rounded-lg shadow-md bg-cyan-500 w-full text-left mt-8">
          <div className="text-md text-white font-bold py-3 px-6">
            Upload Links
          </div>
          <div className="p-6 bg-white rounded-b">
            <HsProfileLinkGrid />
          </div>
        </div>
      }
    </div>
  )
}

export default Profile;