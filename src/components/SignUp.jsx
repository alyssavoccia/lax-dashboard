import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth, createUserProfileDocument } from '../firebase.config';

function SignUp({ handleUserChange }) {
  const [message, setMessage] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: '',
    isAdmin: false
  });

  const navigate = useNavigate();

  const {displayName, email, password, confirmPassword, team} = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords DO NOT match.')
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
    }

    if (password.length < 6) {
      setMessage('Password must be AT LEAST 6 characters long.');
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
    }

    // Check if user's team exists
    const teamRef = db.collection(team);
    const teamSnapshot = await teamRef.get();

    if (teamSnapshot.size === 0) {
      setMessage('Team DOES NOT exist.');
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
    }

    // Try to create a new user
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, displayName, team);      

      navigate('/dashboard');
    } catch (error) {
      setMessage('Error creating account. Please try again.');
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
    }
  }

  return (
    <>
      <h1 tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">Sign Up</h1>
      <p className="text-sm my-4 font-medium leading-none text-gray-500 mb-8">
        Highschool User?
        <span className="text-cyan-500 hover:text-cyan-600 cursor-pointer" onClick={handleUserChange}> Sign up here</span>
      </p>
      <div>
        <label className="text-md font-medium leading-none text-gray-800">Full Name</label>
        <input aria-label="enter email adress" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='displayName' id="displayName" autoFocus value={displayName} onChange={handleChange} />
      </div>
      <div className="mt-6">
        <label className="text-md font-medium leading-none text-gray-800">Email</label>
        <input aria-label="enter email adress" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='email' id="email" autoComplete="email" autoFocus value={email} onChange={handleChange} />
      </div>
      <div className="mt-6  w-full">
        <label className="text-md font-medium leading-none text-gray-800">Password</label>
        <div className="relative flex items-center justify-center">
          <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='password' id="password" autoComplete="current-password" value={password} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-6  w-full">
        <label className="text-md font-medium leading-none text-gray-800">Confirm Password</label>
        <div className="relative flex items-center justify-center">
          <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='confirmPassword' id="confirmPassword" value={confirmPassword} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-6  w-full">
        <label className="text-md font-medium leading-none text-gray-800">Team Code</label>
        <div className="relative flex items-center justify-center">
          <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='team' id="team" value={team} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-8">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 text-sm font-semibold leading-none text-white focus:outline-none bg-cyan-500 border rounded hover:bg-cyan-600 py-4 w-full" type="submit" onClick={handleSubmit}>Sign Up</button>
      </div>
      <div className={`${showSnack ? 'opactity-100': 'opacity-0'} transition-all duration-300 ease-in absolute top-2 right-2 space-x-2 justify-center`}>
        <div className="shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" role="alert">
          <div className=" bg-red-500 flex justify-between items-center py-2 px-3 bg-clip-padding rounded-lg">
            <p className="font-bold text-white">{message}</p>
            <div className="flex items-center">
              <button type="button" className="box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" onClick={() => setShowSnack(false)}>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;