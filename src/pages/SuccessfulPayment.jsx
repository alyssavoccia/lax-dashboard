import { auth, createUserProfileDocument } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

function SuccessfulPayment() {
  const navigate = useNavigate();

  const getHsUser = async () => {
    const { displayName, email, password, grad, position, team} = JSON.parse(localStorage.getItem("hsUser"));

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await createUserProfileDocument(user, displayName, team, grad, position);

    localStorage.removeItem('hsUser');

    navigate('/dashboard');
  }
  
  getHsUser();

  return (
    <div>
      <h1 className='mb-4'>Payment Successful!</h1>
      <h2>You will now be redirected to your dashboard.</h2>
    </div>
  )
}

export default SuccessfulPayment;