import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, createUserProfileDocument, db } from './firebase.config';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from './redux/user/userActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { setCurrentTeam } from './redux/team/teamActions';
import { setCurrentData } from './redux/data/dataActions';
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
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const setUser = bindActionCreators(setCurrentUser, dispatch);
  const setTeam = bindActionCreators(setCurrentTeam, dispatch);
  const setData = bindActionCreators(setCurrentData, dispatch);

  useEffect(() => {
    const users = [];
    const usersData = [];

    const getUserData = async () => {
      for (const person of users) {
        const docRef = doc(db, currentUser.team, person.id, 'data', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj) {
          usersData.push({...person, ...userDataObj});
        }

        if (usersData.length === users.length) {
          setData(usersData);
          setLoading(false);
        }
      };
    }

    const getAllTeamUsers = async () => {
      const snapshot = await db.collection(currentUser.team).get();
      snapshot.docs.forEach((doc, index, array) => {
        if (!doc.data().isAdmin) {
          users.push(doc.data());
        }

        if (index === array.length - 1) {
          setTeam(users);
          getUserData();
        }
      });
    }
    
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setUser(snapShot.data());
          });

          if (currentUser) {
            getAllTeamUsers();
          }
        } 
      } else {
        setUser(userAuth);
        setLoading(false);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultTheme = createTheme();

  if (loading) {
    return <Spinner />
  }
  
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          {location.pathname === '/sign-in-sign-up' ? <></> : <Navbar />}
          <Routes>
            <Route path='/sign-in-sign-up' element={<SignInSignUp />} />
            <Route path='/successful-payment' element={<SuccessfulPayment />} />
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Dashboard />} />
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
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;