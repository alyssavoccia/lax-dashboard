import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import ProfileDataCardGrid from '../components/ProfileDataCardGrid';
import HsProfileLinkGrid from '../components/HsProfileLinkGrid';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  }
  
  if (loading) {
    return <Spinner />
  }
  
  return (
    <div className='lg:container mx-auto pl-48 pr-4 py-4'>
      <div className="flex justify-center">
        <div className="block rounded-lg shadow-md bg-indigo-700 w-full text-left">
          <div className="text-md text-white font-bold py-3 px-6">
            Profile
          </div>
          <div className="p-6 bg-white rounded-b">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{currentUser.displayName}</h5>
            <div className="flex space-x-2">
              <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white rounded">{userData.position ? userData.position : 'POS'}</span>
              <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-slate-600 text-white rounded">{userData.grad ? userData.grad : 'GRAD'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PLAYER DATA CARDS */}
      {!currentUser.isAdmin &&  <ProfileDataCardGrid data={userData} />}
    </div>
  )
}

export default Profile;