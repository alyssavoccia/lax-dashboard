import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthStatus } from './hooks/useAuthStatus';

import Box from '@mui/material/Box';

import Navbar from "./components/navbar/Navbar";
import PrivateRoute from './components/PrivateRoute';
import Dashboard from "./pages/Dashboard";
import SignInSignUp from './pages/SignInSignUp';

function App() {
    const { loggedIn } = useAuthStatus();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {loggedIn ? <Navbar /> : <></>}
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Dashboard />} />
            </Route>
            <Route path='/sign-in-sign-up' element={<SignInSignUp />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
