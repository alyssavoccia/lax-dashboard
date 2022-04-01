import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase.config';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from '@mui/material/Box';
import { useAuthStatus } from './hooks/useAuthStatus';
import { setCurrentUser } from './redux/user/userActions';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SignInSignUp from './pages/SignInSignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Spinner from './components/Spinner';

function App() {
  const location = useLocation();
  const { loggedIn } = useAuthStatus();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  bindActionCreators(setCurrentUser, dispatch);

  useEffect(() => {
    const auth = getAuth();

    if (loggedIn) {
      const fetchCurrentUser = async () => {
        try {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          
          setCurrentUser(userDoc.data());
          console.log(user.user)
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }

      fetchCurrentUser();
    }
  }, [loggedIn, user]);

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
        </Routes>
      </Box>
    </>
  );
}

export default App;