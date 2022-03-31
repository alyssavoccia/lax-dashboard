import { Routes, Route, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';

import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SignInSignUp from './pages/SignInSignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  const location = useLocation();

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