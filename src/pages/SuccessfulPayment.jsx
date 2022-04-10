import { auth, createUserProfileDocument } from '../firebase.config';

function SuccessfulPayment() {

  const getHsUser = async () => {
    const { displayName, email, password, grad, position, team} = JSON.parse(localStorage.getItem("hsUser"));

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await createUserProfileDocument(user, displayName, team, grad, position);

    localStorage.removeItem('hsUser');
  }
  
  getHsUser();

  return (
    <div>SuccessfulPayment</div>
  )
}

export default SuccessfulPayment;