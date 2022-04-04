import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../components/Title';
import Percentiles from './charts/Percentiles';
import PerformanceRelativeToPeers from './charts/PerformanceRelativeToPeers';
import StrengthsAssessment from './charts/StrengthsAssessment';
import TapScore from './charts/TapScore';

function DashboardGrid({ data }) {
  const [loading, setLoading] = useState(true);
  const [currentPlayerData, setCurrentPlayerData] = useState({});
  const [wbScores, setWbScores] = useState([]);
  const [threeScores, setThreeScores] = useState([]);
  const [broadScores, setBroadScores] = useState([]);
  const [agilityScores, setAgilityScores] = useState([]);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const users = [];

    const getUserData = async () => {
      users.forEach(async (person, index) => {
        const docRef = doc(db, currentUser.team, person.id, 'data', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj) {
          userDataObj.wb !== null && setWbScores(prevScores => [...prevScores, userDataObj.wb]);
          userDataObj.three !== null && setThreeScores(prevScores => [...prevScores, userDataObj.three]);
          userDataObj.broad !== null && setBroadScores(prevScores => [...prevScores, userDataObj.broad]);
          userDataObj.agility !== null && setAgilityScores(prevScores => [...prevScores, userDataObj.agility]);
        }

        if (data === person.displayName || data.displayName === person.displayName) {
          setCurrentPlayerData({...userDataObj});
        }

        if (index === users.length - 1) {
          setLoading(false);
        }
      });
    }

    const getAllTeamUsers = async () => {
      const snapshot = await db.collection(currentUser.team).get();
      snapshot.docs.forEach((doc, index, array) => {
        if (!doc.data().isAdmin) {
          users.push(doc.data());
        }

        if (index === array.length - 1) {
          getUserData();
        }
      });
    }

    getAllTeamUsers();
  }, [currentUser.team, data]);

  if (loading) {
    return <Title>Loading Data...</Title>
  }

  return (
    <Grid container spacing={3}>
      {/* PERFORMANCE RELATIVE TO PEERS */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <PerformanceRelativeToPeers wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} agilityScores={agilityScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* STRENGTHS ASSESSMENT */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <StrengthsAssessment wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* PERCENTILE / 50'S WALL BALL */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="50's Wall Ball" data={wbScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* PERCENTILE / 300's */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="300's" data={threeScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>
      
      {/* PERCENTILE / BROAD JUMP */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="Broad Jump" data={broadScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* PERCENTILE / 5-10-5 */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="5-10-5" data={agilityScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* TAP SCORE */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <TapScore />
        </Paper>
      </Grid>

      {/* STRENGTHS & WEAKNESSES */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Strengths / Areas for Improvement</Title>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardGrid;