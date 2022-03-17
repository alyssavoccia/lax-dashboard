import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import Box from '@mui/material/Box';

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import SignInSignUp from './pages/SignInSignUp';

function App() {
  const auth = getAuth();
  console.log(auth);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {auth.currentUser ? <Navbar /> : <></>}
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/sign-in-sign-up' element={<SignInSignUp />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
