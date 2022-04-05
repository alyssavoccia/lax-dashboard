import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import Title from '../Title';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function TapScore({ currentPlayerData, wbScores, threeScores, broadScores, agilityScores }) {
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [allPlayersData, setAllPlayersData] = useState([]);
  const [wbMean, setWbMean] = useState(0);
  const [threeMean, setThreeMean] = useState(0);
  const [broadMean, setBroadMean] = useState(0);
  const [agilityMean, setAgilityMean] = useState(0);
  const [tapScores, setTapScores] = useState([]);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const users = [];

    const getDataMeans = () => {
      setWbMean(wbScores.reduce((a, b) => a + b, 0));
      setThreeMean(threeScores.reduce((a, b) => a + b, 0));
      setBroadMean(broadScores.reduce((a, b) => a + b, 0));
      setAgilityMean(agilityScores.reduce((a, b) => a + b, 0));
    };

    const getPlayerTapScores = () => {
      const playerTapScores = [];
      getDataMeans();
      allPlayersData.forEach((person, index) => {
        let wbPercentile = Math.floor(person.wb / wbMean * 100);
        let threePercentile = Math.floor(person.three / threeMean * 100);
        let broadPercentile = Math.floor(person.broad / broadMean * 100);
        let agilityPercentile = Math.floor(person.agility / agilityMean * 100);

        if (wbPercentile > 100) {
          wbPercentile = wbPercentile - 100;
        }
        if (threePercentile > 100) {
          threePercentile = wbPercentile - 100;
        }
        if (broadPercentile > 100) {
          broadPercentile = wbPercentile - 100;
        }
        if (agilityPercentile > 100) {
          agilityPercentile = wbPercentile - 100;
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
          console.log(tapScores);
        }
      });
    }

    const getUserData = async () => {
      users.forEach(async (person, index) => {
        console.log(person)
        const docRef = doc(db, currentUser.team, person.id, 'data', person.id);
        const docSnap = await getDoc(docRef);
        const userDataObj = docSnap.data();
        if (userDataObj) {
          setAllPlayersData(prevData => [...prevData, userDataObj]);
        }

        if (index === users.length - 1) {
          getPlayerTapScores();
        }
      });
    }

    const getAllTeamUsers = async () => {
      const snapshot = await db.collection(currentUser.team).get();
      snapshot.docs.forEach((doc, index, array) => {
        if (!doc.data().isAdmin) {
          users.push(doc.data());
        }

        if (index === array.length - 1) {
          getUserData();
        }
      });
    }

    getAllTeamUsers();
  }, [currentUser.team, currentPlayerData.displayName, wbScores, threeScores, broadScores, agilityScores, wbMean, threeMean, broadMean, agilityMean]);

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
                      <Cell key={entry.user} fill={entry.selectedUser ? '#1976D2' : '#A9A9A9'} />
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