import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function StrengthsAssessment({ wbScores, threeScores, broadScores, currentPlayerData }) {
  const wbTotal = wbScores.reduce((a, b) => a + b, 0);
  const threeTotal = threeScores.reduce((a, b) => a + b, 0);
  const broadTotal = broadScores.reduce((a, b) => a + b, 0);
  
  let currentWbPercentile = Math.floor(currentPlayerData.wb / (wbTotal / wbScores.length) * 100);
  let currentThreePercentile = Math.floor(currentPlayerData.three / (threeTotal / threeScores.length) * 100);
  let currentBroadPercentile = Math.floor(currentPlayerData.broad / (broadTotal / broadScores.length) * 100);

  let teamWbPercentile, teamThreePercentile, teamBroadPercentile;

  if (currentWbPercentile < 100) {
    teamWbPercentile = 100 - currentWbPercentile;
  } else {
    currentWbPercentile -= 100;
    teamWbPercentile = 100 - currentWbPercentile;
  }

  if (currentThreePercentile < 100) {
    teamThreePercentile = 100 - currentThreePercentile;
  } else {
    currentThreePercentile -= 100;
    teamThreePercentile = 100 - currentThreePercentile;
  }

  if (currentBroadPercentile < 100) {
    teamBroadPercentile = 100 - currentBroadPercentile;
  } else {
    currentBroadPercentile -= 100;
    teamBroadPercentile = 100 - currentBroadPercentile;
  }

  const data = [
    {
      test: "50's Wall Ball",
      A: currentPlayerData.wb ? currentWbPercentile : 0,
      B: teamWbPercentile,
      fullMark: 100
    },
    {
      test: "300's",
      A: currentPlayerData.three ? currentThreePercentile : 0,
      B: teamThreePercentile,
      fullMark: 100
    },
    {
      test: "Broad Jump",
      A: currentPlayerData.broad ? currentBroadPercentile : 0,
      B: teamBroadPercentile,
      fullMark: 100
    },
  ];

  return (
    <>
      <div className="py-3 px-5 bg-cyan-100 rounded-t-lg mb-1">Strengths Assessment</div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius='90%' data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="test" />
          <Radar name="Player" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
          <Radar name="Average" dataKey="B" stroke="#515151" fill="#515151" fillOpacity={0.2} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  )
}

export default StrengthsAssessment;