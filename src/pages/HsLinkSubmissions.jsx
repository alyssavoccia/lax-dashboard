import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCurrentLinks } from '../redux/hs-links/hsLinksActions';
import Spinner from '../components/Spinner';
import HsSubmissionsPageCard from '../components/HsSubmissionsPageCard';

function HsLinkSubmissions() {
  const dispatch = useDispatch();
  const updateLinks = bindActionCreators(updateCurrentLinks, dispatch);
  const currentLinks = useSelector((state) => state.hsLinks.hsLinks);
  const [loading, setLoading] = useState(true);
  const [showSnack, setShowSnack] = useState(false);

  useEffect(() => {
    if (currentLinks) {
      setLoading(false);
    }
  }, [currentLinks]);
  
  const handleDelete = (e) => {
    const linkId = e.target.parentNode.id;
    const playerId = e.target.parentNode.parentNode.id;

    const updatedValue = {
      [linkId]: null
    };

    // Update on firebase
    const docRef = doc(db, 'highschool', playerId, 'links', playerId);
    updateDoc(docRef, updatedValue);
    updateLinks(currentLinks, playerId, linkId);

    setShowSnack(true);
    setTimeout(() => {
      setShowSnack(false);
    }, 3000);
  };

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='lg:container mx-auto pl-20 pr-4 py-4'>
        <div className="flex justify-center mb-5">
          <div className="block p-4 rounded-lg shadow-md bg-slate-600 min-w-full">
            <h1 className="text-white text-xl leading-tight font-medium">Pending Submissions</h1>
          </div>
        </div>
          <div className='flex flex-wrap gap-7 justify-start'>
            {currentLinks.length > 0
              ? currentLinks.map((player, i) => {
                return (
                  <HsSubmissionsPageCard
                    key={i}
                    name={player.displayName}
                    playerId={player.id}
                    wbLink={player.wbLink}
                    threeLink={player.threeLink}
                    agilityLink={player.agilityLink}
                    broadLink={player.broadLink}
                    handleDelete={handleDelete}
                  />
                )
              })
              : <div className="bg-purple-100 rounded-lg py-3 px-4 mb-3 text-base text-purple-700 inline-flex items-center w-full" role="alert">
                  There are currently no pending submissions.
                </div>
            }
          </div>
      </div>
      <div className={`${showSnack ? 'opactity-100': 'opacity-0'} transition-all duration-300 ease-in absolute top-2 right-2 space-x-2 justify-center`}>
        <div className="shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" role="alert">
          <div className=" bg-emerald-500 flex justify-between items-center py-2 px-3 bg-clip-padding rounded-lg">
            <p className="font-bold text-white">Link successfully deleted.</p>
            <div className="flex items-center">
              <button type="button" className="box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" onClick={() => setShowSnack(false)}>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HsLinkSubmissions;