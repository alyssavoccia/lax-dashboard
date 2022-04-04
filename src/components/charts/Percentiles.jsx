import Container from '@mui/material/Container';
import Title from '../Title';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

function Percentiles({ title, data, currentPlayerData }) {
  console.log(data, currentPlayerData)
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

  teamPercentile = 100 - currentPlayerPercentile;

  const chartData = [
    { name: 'Player', value: currentPlayerPercentile },
    { name: 'Team', value: teamPercentile },
  ];
  
  const COLORS = ['#1976D2', '#515151'];
  
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
      <Title>{title}</Title>
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
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
            </PieChart>
          : <Container sx={{ textAlign: 'center' }}>
              <Title>No Data to Compile</Title>
            </Container>
        }
      </ResponsiveContainer>
    </>
  )
}

export default Percentiles;