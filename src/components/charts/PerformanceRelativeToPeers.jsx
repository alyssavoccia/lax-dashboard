import Title from '../Title';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

function PerformanceRelativeToPeers({ wbScores, threeScores, broadScores, agilityScores, currentPlayerData }) {
  // console.log(wbScores, threeScores, broadScores, agilityScores, currentPlayerData);

  const getMean = (array) => {
    return array.reduce((a, b) => a + b, 0) / array.length;
  }

  const getStandardDeviation = (array) => {
    const mean = getMean(array);
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / array.length);
  }

  const data = [
    {
      name: "50's WB",
      player: ((currentPlayerData.wb - getMean(wbScores)) / getStandardDeviation(wbScores) * -1)
    },
    {
      name: "300's",
      player: ((currentPlayerData.three - getMean(threeScores)) / getStandardDeviation(threeScores) * -1)
    },
    {
      name: 'Broad',
      player: ((currentPlayerData.broad - getMean(broadScores)) / getStandardDeviation(broadScores) * -1)
    },
    {
      name: '5-10-5',
      player: ((currentPlayerData.agility - getMean(agilityScores)) / getStandardDeviation(agilityScores) * -1)
    }
  ];

  return (
    <>
      <Title>Performance Relative to Peer Average</Title>
      <ResponsiveContainer width="99%" height="99%">
        <BarChart
          data={data}
          stackOffset="sign"
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="player" fill="#1976D2" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default PerformanceRelativeToPeers;