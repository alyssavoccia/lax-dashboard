import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import HsSubmissionsPageCard from '../components/HsSubmissionsPageCard';
import { updateCurrentLinks } from '../redux/hs-links/hsLinksActions';
import Spinner from '../components/Spinner';

function HsLinkSubmissions() {
  const dispatch = useDispatch();
  const updateLinks = bindActionCreators(updateCurrentLinks, dispatch);
  const currentLinks = useSelector((state) => state.hsLinks.hsLinks);
  const [userSubmissions, setUserSubmissions] = useState([]);

  // useEffect(() => {
  //   // if (currentLinks.length > 0) {
  //   //   currentLinks.forEach((player, i) => {
  //   //     if (player.wbLink || player.threeLink || player.agilityLink || player.broadLink) {
  //   //       setUserSubmissions(prevState => [...prevState, player]);
  //   //     }
  //   //   })
  //   // }
  // }, [currentLinks]);
  
  const handleDelete = (e) => {
    const linkId = e.target.parentNode.id;
    const playerId = e.target.parentNode.parentNode.id;

    // Update on firebase
    const docRef = doc(db, 'highschool', playerId, 'links', playerId);
    updateDoc(docRef, {[linkId]: null});
    updateLinks(currentLinks, playerId, linkId);
  };

  return (
    <div className='lg:container mx-auto pl-20 pr-4 py-4'>
      <div className="flex justify-center mb-5">
        <div className="block p-4 rounded-lg shadow-md bg-violet-500 min-w-full">
          <h1 className="text-white text-xl leading-tight font-medium">Pending Submissions</h1>
        </div>
        {console.log(userSubmissions)}
      </div>
        <div className='flex flex-wrap gap-7 justify-start'>
          {currentLinks && currentLinks.length > 0
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
            : <div className="bg-purple-100 rounded-lg py-5 px-6 mb-3 text-base text-purple-700 inline-flex items-center w-full" role="alert">
                There are currently no pending submissions.
              </div>
          }
        </div>
    </div>
  )
}

export default HsLinkSubmissions;