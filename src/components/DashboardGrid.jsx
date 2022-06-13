import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  }, [allTeamData, data]);

  if (loading) {
    return (
      <div className="flex justify-center mb-5">
        <div className="block p-4 rounded-lg shadow-md bg-slate-600 min-w-full">
          <h1 className="text-white text-xl leading-tight font-medium">Loading Data</h1>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      {/* PERFORMANCE RELATIVE TO PEERS */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <PerformanceRelativeToPeers wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} agilityScores={agilityScores} currentPlayerData={currentPlayerData} />
      </div>

      {/* STRENGTHS ASSESSMENT */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <StrengthsAssessment wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} currentPlayerData={currentPlayerData} />
      </div>

      {/* PERCENTILE / 50'S WALL BALL */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <Percentiles title="50's Wall Ball" data={wbScores} currentPlayerData={currentPlayerData} />
      </div>

      {/* PERCENTILE / 300's */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <Percentiles title="300's" data={threeScores} currentPlayerData={currentPlayerData} />
      </div>
      
      {/* PERCENTILE / BROAD JUMP */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <Percentiles title="Broad Jump" data={broadScores} currentPlayerData={currentPlayerData} />
      </div>

      {/* PERCENTILE / 5-10-5 */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <Percentiles title="5-10-5" data={agilityScores} currentPlayerData={currentPlayerData} />
      </div>

      {/* TAP SCORE */}
      <div className="bg-white flex flex-col h-full shadow-md rounded-lg">
        <TapScore currentPlayerData={currentPlayerData} wbScores={wbScores} threeScores={threeScores} broadScores={broadScores} agilityScores={agilityScores} />
      </div>

      {/* STRENGTHS & WEAKNESSES */}
      <div className="bg-white flex flex-col h-80 shadow-md rounded-lg">
        <div className="py-3 px-5 bg-cyan-100 rounded-t-lg mb-1">Strengths / Areas for Improvement</div>
      </div>
    </div>
  )
}

export default DashboardGrid;