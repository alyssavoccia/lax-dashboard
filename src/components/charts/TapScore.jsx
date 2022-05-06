import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import Title from '../Title';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function TapScore({ currentPlayerData, wbScores, threeScores, broadScores, agilityScores }) {
  const [loading, setLoading] = useState(true);
  const [tapScores, setTapScores] = useState([]);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchAllData = async () => {
      const users = [];
      const allPlayersData = [];
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
        allPlayersData.forEach((person, index) => {
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
          
          if (index === allPlayersData.length - 1) {
            playerTapScores.sort((a, b) => a.tapScore < b.tapScore ? 1 : -1);
            setTapScores(playerTapScores);
            setLoading(false);
          }
        });
      };

      const getUserData = async () => {
        users.forEach(async (person, index) => {
          const docRef = doc(db, currentUser.team, person.id, 'data', person.id);
          const docSnap = await getDoc(docRef);
          const userDataObj = docSnap.data();
          if (userDataObj) {
            allPlayersData.push(userDataObj);
          }
  
          if (index === users.length - 1) {
            getPlayerTapScores();
          }
        });
      }


      // Get all users in the team
      try {
        const snapshot = await db.collection(currentUser.team).get();
        snapshot.docs.forEach((doc, index, array) => {
          if (!doc.data().isAdmin) {
            users.push(doc.data());
          }
  
          if (index === array.length - 1) {
            getDataMeans();
            getUserData();
          }
        });
      } catch (error) {
        console.log('error:', error);
      }
    }

    fetchAllData();
  }, [agilityScores, broadScores, currentPlayerData.id, currentUser.team, threeScores, wbScores]);

    return (
      <>
        
        <Title>TAP Score Relative to Team</Title>
        {loading 
          ? <Title>Loading Data</Title>
          : <ResponsiveContainer width="100%" aspect={1}>
              <BarChart 
              width={500}
              height={300}
              data={tapScores}
              layout='vertical'
              >
                <XAxis type="number"/>
                <YAxis type="category" dataKey="user" />
                <Bar dataKey='tapScore' fill="#1976D2">
                  { tapScores.map((entry, index) => (
                      <Cell key={index} fill={entry.selectedUser ? '#1976D2' : '#515151'} />
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