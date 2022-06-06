import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth, createUserProfileDocument } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from './redux/user/userActions';
import { setCurrentTeam } from './redux/team/teamActions';
import { setCurrentData } from './redux/data/dataActions';
import { setCurrentLinks } from './redux/hs-links/hsLinksActions';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SignInSignUp from './pages/SignInSignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Team from './pages/Team';
import PlayerData from './pages/PlayerData';
import HsLinkSubmissions from './pages/HsLinkSubmissions';
import SuccessfulPayment from './pages/SuccessfulPayment';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const setUser = bindActionCreators(setCurrentUser, dispatch);
  const setTeam = bindActionCreators(setCurrentTeam, dispatch);
  const setData = bindActionCreators(setCurrentData, dispatch);
  const setLinks = bindActionCreators(setCurrentLinks, dispatch);

  useEffect(() => {
    const users = [];
    const usersData = [];

    const getHsLinks = async (currentUser) => {
      const hsUsers = [];
      const hsLinks = [];

      for (const person of users) {
        hsUsers.push(person.displayName);
        const docRef = doc(db, currentUser.team, person.id, 'links', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj.agilityLink || userDataObj.broadLink || userDataObj.threeLink || userDataObj.wbLink) {
          hsLinks.push({...person, ...userDataObj});
        }

        if (hsUsers.length === users.length) {
          setLinks(hsLinks);
          setLoading(false);
        }
      }
    };

    const getAllUsersData = async (currentUser) => {
      for (const person of users) {
        const docRef = doc(db, currentUser.team, person.id, 'data', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj) {
          usersData.push({...person, ...userDataObj});
        }

        if (usersData.length === users.length) {
          setData(usersData);

          if (currentUser.isAdmin && currentUser.team === 'highschool') {
            getHsLinks(currentUser);
          } else {
            setLoading(false);
          }
        }
      };
    }

    const getAllTeamMembers = async (currentUser) => {
      const snapshot = await db.collection(currentUser.team).get();
      snapshot.docs.forEach((doc, index, array) => {
        if (!doc.data().isAdmin) {
          users.push(doc.data());
        }

        if (index === array.length - 1) {
          setTeam(users);
          getAllUsersData(currentUser)
        }
      });
    }

    onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setUser(snapShot.data());
            getAllTeamMembers(snapShot.data());
          });
        }
      } else {
        setUser(userAuth);
        setTeam(null);
        setData(null);
        setLinks(null);
        setLoading(false);
      }
    })
  }, [setUser, setTeam, setData, setLinks]);

  if (loading) {
    return <Spinner />
  }
  
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* <Navbar2 /> */}
          {location.pathname === '/sign-in-sign-up' ? <></> : <Navbar />}
          <Routes>
            <Route path='/sign-in-sign-up' element={<SignInSignUp />} />
            <Route path='/successful-payment' element={<SuccessfulPayment />} />
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/team' element={<AdminRoute />}>
              <Route path='/team' element={<Team />} />
            </Route>
            <Route path='/player-data' element={<AdminRoute />}>
              <Route path='/player-data' element={<PlayerData />} />
            </Route>
            <Route path='/hs-link-submissions' element={<AdminRoute />}>
              <Route path='/hs-link-submissions' element={<HsLinkSubmissions />} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;