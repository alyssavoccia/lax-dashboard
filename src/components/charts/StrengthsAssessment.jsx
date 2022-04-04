import Title from '../Title';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function StrengthsAssessment({ wbScores, threeScores, broadScores, currentPlayerData }) {
  
  const data = [
    {
      subject: "50's Wall Ball",
      A: currentPlayerData.wb ? currentPlayerData.wb : 0,
      B: wbScores.reduce((a, b) => a + b, 0) / wbScores.length,
    },
    {
      subject: "300's",
      A: currentPlayerData.three ? currentPlayerData.three : 0,
      B: threeScores.reduce((a, b) => a + b, 0) / threeScores.length,
    },
    {
      subject: "Broad Jump",
      A: currentPlayerData.broad ? currentPlayerData.broad : 0,
      B: broadScores.reduce((a, b) => a + b, 0) / broadScores.length,
    },
  ];

  return (
    <>
      <Title>Strengths Assessment</Title>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar name="Player" dataKey="A" stroke="#1976D2" fill="#1976D2" fillOpacity={0.6} />
          <Radar name="Average" dataKey="B" stroke="#757575" fill="#757575" fillOpacity={0.3} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  )
}

export default StrengthsAssessment;