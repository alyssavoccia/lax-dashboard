import Container from '@mui/material/Container';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

function Percentiles({ title, data, currentPlayerData }) {
  let currentPlayerPercentile;
  let teamPercentile;
  let attrTested = false;

  if (currentPlayerData) {
    const dataTotal = data.reduce((a, b) => a + b, 0);

    switch (title) {
      case "50's Wall Ball":
        if (currentPlayerData.wb) {
          currentPlayerPercentile = Math.floor((currentPlayerData.wb / (dataTotal / data.length) * 100));
          attrTested = true;
        } else {
          attrTested = false;
        }
        break;
      case "300's":
        if (currentPlayerData.three) {
          currentPlayerPercentile = Math.floor((currentPlayerData.three / (dataTotal / data.length) * 100));
          attrTested = true;
        } else {
          attrTested = false;
        }
        break;
      case "Broad Jump":
        if (currentPlayerData.broad) {
          currentPlayerPercentile = Math.floor((currentPlayerData.broad / (dataTotal / data.length) * 100));
          attrTested = true;
        } else {
          attrTested = false;
        }
        break;
      case "5-10-5":
        if (currentPlayerData.agility) {
          currentPlayerPercentile = Math.floor((currentPlayerData.agility / (dataTotal / data.length) * 100));
          attrTested = true;
        } else {
          attrTested = false;
        }
        break;
      default:
        return 'No data';
    }
  }

  if (currentPlayerPercentile < 100) {
    teamPercentile = 100 - currentPlayerPercentile;
  } else {
    currentPlayerPercentile = currentPlayerPercentile - 100;
    teamPercentile = 100 - currentPlayerPercentile;
  }
  
  const chartData = [
    { name: `${currentPlayerData.displayName}'s Percentile`, value: currentPlayerPercentile },
    { name: '', value: teamPercentile },
  ];
  
  const COLORS = ['#06b6d4', '#515151'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="py-3 px-5 bg-cyan-100 rounded-t-lg mb-1">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        {attrTested
          ? <PieChart width={400} height={400}>
              <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  dataKey="value"
                >
                  <Cell key={`cell-1`} fill={COLORS[0 % COLORS.length]} />
                  <Cell key={`cell-2`} fill={COLORS[1 % COLORS.length]} />
                </Pie>
                <Legend />
            </PieChart>
          : <Container sx={{ textAlign: 'center' }}>
              <p className='italic'>No data to compile</p>
            </Container>
        }
      </ResponsiveContainer>
    </>
  )
}

export default Percentiles;