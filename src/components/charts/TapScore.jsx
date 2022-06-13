import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function TapScore({ currentPlayerData, wbScores, threeScores, broadScores, agilityScores }) {
  const [loading, setLoading] = useState(true);
  const [tapScores, setTapScores] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const currentTeam = useSelector((state) => state.team.team);
  const currentData = useSelector((state) => state.data.data);

  useEffect(() => {
    const fetchAllData = async () => {
      let wbMean = 0;
      let threeMean = 0;
      let broadMean = 0;
      let agilityMean = 0;

      const getDataMeans = () => {
        wbMean = wbScores.reduce((a, b) => a + b, 0) / wbScores.length;
        threeMean = threeScores.reduce((a, b) => a + b, 0) / threeScores.length;
        broadMean = broadScores.reduce((a, b) => a + b, 0) / broadScores.length;
        agilityMean = agilityScores.reduce((a, b) => a + b, 0) / agilityScores.length;
      };

      const getPlayerTapScores = () => {
        const playerTapScores = [];
        currentData.forEach((person, index) => {
          let wbPercentile = Math.floor(person.wb / wbMean * 100);
          let threePercentile = Math.floor(person.three / threeMean * 100);
          let broadPercentile = Math.floor(person.broad / broadMean * 100);
          let agilityPercentile = Math.floor(person.agility / agilityMean * 100);

          if (wbPercentile > 100) {
            wbPercentile -= 100;
          }
          if (threePercentile > 100) {
            threePercentile -= 100;
          }
          if (broadPercentile > 100) {
            broadPercentile -= 100;
          }
          if (agilityPercentile > 100) {
            agilityPercentile -= 100;
          }
          
  
          if (isNaN(wbPercentile)) {
            wbPercentile = 0;
          }
          if (isNaN(threePercentile)) {
            threePercentile = 0;
          }
          if (isNaN(broadPercentile)) {
            broadPercentile = 0;
          }
          if (isNaN(agilityPercentile)) {
            agilityPercentile = 0;
          }

          const tapScore = wbPercentile + threePercentile + broadPercentile + agilityPercentile;

          if (person.id === currentPlayerData.id) {
            playerTapScores.push({user: person.id, tapScore: tapScore, selectedUser: true});
          } else {
            playerTapScores.push({user: person.id, tapScore: tapScore});
          }
          
          if (index === currentData.length - 1) {
            playerTapScores.sort((a, b) => a.tapScore < b.tapScore ? 1 : -1);
            setTapScores(playerTapScores);
            setLoading(false);
          }
        });
      };

      if (currentTeam) {
        getDataMeans();
      }

      if (currentData) {
        getPlayerTapScores();
      }
    }

    fetchAllData();
  }, [agilityScores, broadScores, currentData, currentPlayerData.id, currentTeam, currentUser.team, threeScores, wbScores]);

    return (
      <>
        <div className="py-3 px-5 bg-cyan-100 rounded-t-lg mb-1">Tap Score Relative to Team</div>
        {loading 
          ? <p className="italic">Loading Data</p>
          : <ResponsiveContainer width="100%" aspect={1}>
              <BarChart 
              width={500}
              height={300}
              data={tapScores}
              layout='vertical'
              >
                <XAxis type="number"/>
                <YAxis type="category" dataKey="user" />
                <Bar dataKey='tapScore' fill="#06b6d4">
                  { tapScores.map((entry, index) => (
                      <Cell key={index} fill={entry.selectedUser ? '#06b6d4' : '#515151'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
        }
      </>
    )
}

export default TapScore;