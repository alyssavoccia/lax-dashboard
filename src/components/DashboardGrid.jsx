import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const currentTeam = useSelector((state) => state.team.team);
  const allTeamData = useSelector((state) => state.data.data);

  useEffect(() => {
    allTeamData && allTeamData.forEach(async (person, index) => {
        person.wb !== null && setWbScores(prevScores => [...prevScores, person.wb]);
        person.three !== null && setThreeScores(prevScores => [...prevScores, person.three]);
        person.broad !== null && setBroadScores(prevScores => [...prevScores, person.broad]);
        person.agility !== null && setAgilityScores(prevScores => [...prevScores, person.agility]);

      if (data === person.displayName || data.displayName === person.displayName) {
        setCurrentPlayerData({...person});
      }

      if (index === allTeamData.length - 1) {
        setLoading(false);
      }
    });
  }, [allTeamData, currentTeam.length, data]);

  if (loading) {
    return <Title>Loading Data...</Title>
  }

  return (
    <Grid container spacing={3}>
      {/* PERFORMANCE RELATIVE TO PEERS */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, textAlign: 'center' }}>
          <PerformanceRelativeToPeers wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} agilityScores={agilityScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* STRENGTHS ASSESSMENT */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, textAlign: 'center' }}>
          <StrengthsAssessment wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* PERCENTILE / 50'S WALL BALL */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, textAlign: 'center' }}>
          <Percentiles title="50's Wall Ball" data={wbScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* PERCENTILE / 300's */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, textAlign: 'center' }}>
          <Percentiles title="300's" data={threeScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>
      
      {/* PERCENTILE / BROAD JUMP */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, textAlign: 'center' }}>
          <Percentiles title="Broad Jump" data={broadScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* PERCENTILE / 5-10-5 */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300, textAlign: 'center' }}>
          <Percentiles title="5-10-5" data={agilityScores} currentPlayerData={currentPlayerData} />
        </Paper>
      </Grid>

      {/* TAP SCORE */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          <TapScore currentPlayerData={currentPlayerData} wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} agilityScores={agilityScores} />
        </Paper>
      </Grid>

      {/* STRENGTHS & WEAKNESSES */}
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          <Title>Strengths / Areas for Improvement</Title>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardGrid;