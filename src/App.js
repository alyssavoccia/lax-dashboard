import Box from '@mui/material/Box';

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Dashboard />
      </Box>
    </div>
  );
}

export default App;
