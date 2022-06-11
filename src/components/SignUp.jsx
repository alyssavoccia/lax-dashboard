import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth, createUserProfileDocument } from '../firebase.config';

function SignUp({ handleUserChange }) {
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
      alert('Passwords DO NOT match.');
    }

    if (password.length < 6) {
      alert('Password must be AT LEAST 6 characters long.');
      return;
    }

    // Check if user's team exists
    const teamRef = db.collection(team);
    const teamSnapshot = await teamRef.get();

    if (teamSnapshot.size === 0) {
      alert('Team DOES NOT exist.');
      return;
    }

    // Try to create a new user
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, displayName, team);      

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">Sign Up</h1>
      <p className="text-sm my-4 font-medium leading-none text-gray-500 mb-8">
        Highschool User?
        <span className="text-violet-600 hover:text-violet-700 cursor-pointer" onClick={handleUserChange}> Sign up here</span>
      </p>
      <div>
        <lable className="text-md font-medium leading-none text-gray-800">Full Name</lable>
        <input aria-label="enter email adress" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='displayName' id="displayName" autoFocus value={displayName} onChange={handleChange} />
      </div>
      <div className="mt-6">
        <lable className="text-md font-medium leading-none text-gray-800">Email</lable>
        <input aria-label="enter email adress" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='email' id="email" autoComplete="email" autoFocus value={email} onChange={handleChange} />
      </div>
      <div className="mt-6  w-full">
        <lable className="text-md font-medium leading-none text-gray-800">Password</lable>
        <div className="relative flex items-center justify-center">
          <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='password' id="password" autoComplete="current-password" value={password} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-6  w-full">
        <lable className="text-md font-medium leading-none text-gray-800">Confirm Password</lable>
        <div className="relative flex items-center justify-center">
          <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='confirmPassword' id="confirmPassword" value={confirmPassword} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-6  w-full">
        <lable className="text-md font-medium leading-none text-gray-800">Team Code</lable>
        <div className="relative flex items-center justify-center">
          <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='team' id="team" value={team} onChange={handleChange} />
        </div>
      </div>
      <div className="mt-8">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 text-sm font-semibold leading-none text-white focus:outline-none bg-violet-700 border rounded hover:bg-violet-600 py-4 w-full" type="submit" onClick={handleSubmit}>Sign Up</button>
      </div>
    </>
  );
}

export default SignUp;