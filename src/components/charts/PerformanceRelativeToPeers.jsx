import Title from '../Title';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

function PerformanceRelativeToPeers({ wbScores, threeScores, broadScores, agilityScores, currentPlayerData }) {
  // console.log(wbScores, threeScores, broadScores, agilityScores, currentPlayerData);
  const data = [
    {
      name: 'WB Test',
      Player: 2.5
    },
    {
      name: "300's",
      Player: 2.5
    },
    {
      name: 'Broad',
      Player: -2.5
    },
    {
      name: '5-10-5',
      Player: .5
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
            left: -40,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="Player" fill="#1976D2" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default PerformanceRelativeToPeers;