import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJKBY6fl_vhGOsFwebH1VEDEyf3j34eho",
  authDomain: "lax-dashboard-v2-testing.firebaseapp.com",
  projectId: "lax-dashboard-v2-testing",
  storageBucket: "lax-dashboard-v2-testing.appspot.com",
  messagingSenderId: "945781234656",
  appId: "1:945781234656:web:d1a13864036187d2582985"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, displayName, team, grad = null, position = null) => {
  if (!userAuth) {
    alert('No login');
    return;
  }

  const userRef = db.doc(`users/${userAuth.uid}`);

  let teamSnapshot;

  if (team) {
    const teamRef = db.collection(team);
    teamSnapshot = await teamRef.get();
  }

  const teamUserRef = db.doc(`${team}/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists && teamSnapshot !== undefined) {
    if (teamSnapshot.size !== 0) {
      const { email, uid } = userAuth;
      try {
        await userRef.set({
          displayName,
          email,
          id: uid,
          isAdmin: false,
          team
        });
        await teamUserRef.set({
          displayName,
          id: uid,
          isAdmin: false,
          team
        });
        db.collection(team).doc(userAuth.uid).collection('data').doc(userAuth.uid).set({
          displayName,
          id: uid,
          agility: null,
          broad: null,
          grad: grad,
          position: position,
          three: null,
          wb: null
        });
        if (team === 'highschool') {
          db.collection(team).doc(userAuth.uid).collection('links').doc(userAuth.uid).set({
            agilityLink: null,
            broadLink: null,
            threeLink: null,
            wbLink: null
          });
        }
      } catch (error) {
        console.log('Error creating user: ', error.message);
      }
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const db = firebase.firestore();