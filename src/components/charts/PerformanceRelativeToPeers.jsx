import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

function PerformanceRelativeToPeers({ wbScores, threeScores, broadScores, agilityScores, currentPlayerData }) {
  const getMean = (array) => {
    return array.reduce((a, b) => a + b, 0) / array.length;
  }

  const getStandardDeviation = (array) => {
    const mean = getMean(array);
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / array.length);
  }

  const performanceToPeers = (data, array) => {
    let result;
    if (data) {
      result = (data - getMean(array)) / getStandardDeviation(array) * -1
    }

    if (!isNaN(result)) {
      return result;
    }
  }

  const data = [
    {
      name: "50's WB",
      player: performanceToPeers(currentPlayerData.wb, wbScores)
    },
    {
      name: "300's",
      player: performanceToPeers(currentPlayerData.three, threeScores)
    },
    {
      name: 'Broad',
      player: performanceToPeers(currentPlayerData.broad, broadScores)
    },
    {
      name: '5-10-5',
      player: performanceToPeers(currentPlayerData.agility, agilityScores)
    }
  ];

  return (
    <>
      <div className="py-3 px-5 bg-cyan-100 rounded-t-lg mb-1">Performance Relative to Peer Average</div>
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
          <ReferenceLine y={0} stroke="#222" />
          <Bar dataKey="player" fill="#06b6d4" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default PerformanceRelativeToPeers;