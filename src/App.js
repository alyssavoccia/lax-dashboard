import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase.config';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from '@mui/material/Box';
import { setCurrentUser } from './redux/user/userActions';
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

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const setUser = bindActionCreators(setCurrentUser, dispatch);

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setUser(snapShot.data());
          })
        } 
        setLoading(false)
      } else {
        setUser(userAuth);
        setLoading(false);
      }
    })
  }, [setUser]);

  if (loading) {
    return <Spinner />
  }
  
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {location.pathname === '/sign-in-sign-up' ? <></> : <Navbar />}
        <Routes>
          <Route path='/sign-in-sign-up' element={<SignInSignUp />} />
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
    </>
  );
}

export default App;