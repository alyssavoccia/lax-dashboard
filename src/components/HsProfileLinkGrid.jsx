import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import HsProfileLink from './HsProfileLink';

function HsProfileLinkGrid() {
  const [userLinkObj, setUserLinkObj] = useState({});
  const [showSnack, setShowSnack] = useState(false);
  const currentUser = useSelector((state) => state.user.user);

  const {wbLink, threeLink, broadLink, agilityLink} = userLinkObj;

  useEffect(() => {
    const getUserLinks = async () => {
      if (currentUser.isAdmin && currentUser.team === 'highschool') {
        const linkDocRef = doc(db, currentUser.team, currentUser.id, 'links', currentUser.id);
        const linkDocSnap = await getDoc(linkDocRef);
        setUserLinkObj(linkDocSnap.data());
      }
    }
    getUserLinks();
  }, [currentUser.id, currentUser.isAdmin, currentUser.team]);

  const handleSubmit = (e) => {
    // Get the input id to know which value is being updated in firebase
    const inputId = e.target.parentElement.parentElement.childNodes[0].id;

    // Get the link that the user entered
    const inputValue = e.target.parentElement.parentElement.childNodes[0].value;

    // Get the input element
    const input = e.target.parentElement.parentElement.childNodes[0];

    const updatedValue = {
      [inputId]: inputValue
    };

    // Update on firebase
    const docRef = doc(db, currentUser.team, currentUser.id, 'links', currentUser.id);
    updateDoc(docRef, updatedValue);


    setShowSnack(true);
    setTimeout(() => {
      setShowSnack(false);
    }, 3000);
    input.value = '';
  }

  return (
    <div className='md:container my-4 mx-auto'>
      <HsProfileLink dataTitle="Wall Ball Link" data={wbLink} handleSubmit={handleSubmit} dataId="wbLink" />
      <HsProfileLink dataTitle="300's Link" data={threeLink} handleSubmit={handleSubmit} dataId="threeLink" />
      <HsProfileLink dataTitle="Broad Jump Link" data={broadLink} handleSubmit={handleSubmit} dataId="broadLink" />
      <HsProfileLink dataTitle="5-10-5 Link" data={agilityLink} handleSubmit={handleSubmit} dataId="agilityLink" />

      <div className={`${showSnack ? 'opactity-100': 'opacity-0'} transition-all duration-300 ease-in absolute top-2 right-2 space-x-2 justify-center`}>
        <div className="shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" role="alert">
          <div className=" bg-emerald-500 flex justify-between items-center py-2 px-3 bg-clip-padding rounded-lg">
            <p className="font-bold text-white">Link successfully submitted!</p>
            <div className="flex items-center">
              <button type="button" className="box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" onClick={() => setShowSnack(false)}>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>   
    </div>
  )
}

export default HsProfileLinkGrid;