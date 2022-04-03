import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../components/Title';
import Percentiles from './charts/Percentiles';
import PerformanceRelativeToPeers from './charts/PerformanceRelativeToPeers';
import StrengthsAssessment from './charts/StrengthsAssessment';
import TapScore from './charts/TapScore';

function DashboardGrid({ data }) {
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <Title>Loading Data...</Title>
  // }

  return (
    <Grid container spacing={3}>
      {/* PERFORMANCE RELATIVE TO PEERS */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <PerformanceRelativeToPeers />
        </Paper>
      </Grid>

      {/* STRENGTHS ASSESSMENT */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <StrengthsAssessment />
        </Paper>
      </Grid>

      {/* PERCENTILE / 50'S WALL BALL */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="50's Wall Ball" />
        </Paper>
      </Grid>

      {/* PERCENTILE / 300's */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="300's" />
        </Paper>
      </Grid>
      
      {/* PERCENTILE / BROAD JUMP */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="Broad Jump" />
        </Paper>
      </Grid>

      {/* PERCENTILE / 5-10-5 */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
          <Percentiles title="5-10-5" />
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