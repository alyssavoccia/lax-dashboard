import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-violet-700 to-violet-500 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <Link to='/'>
          <img className="cursor-pointer w-14 h-14 mb-4" src="https://hotemoji.com/images/dl/5/lacrosse-emoji-by-twitter.png" alt="logo" />
        </Link>
        <div className="bg-white shadow-lg rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-10">
          <h1 tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">Login to your account</h1>
          <p className="text-sm my-4 font-medium leading-none text-gray-500">
            Dont have account?{" "}
            <span tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
              <Link to='/sign-up'>Sign up here</Link>
            </span>
          </p>
          <div>
            <lable className="text-md font-medium leading-none text-gray-800">Email</lable>
            <input aria-label="enter email adress" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='email' autoComplete="email" autoFocus value={email} onChange={handleChange} />
          </div>
          <div className="mt-6  w-full">
            <lable className="text-md font-medium leading-none text-gray-800">Password</lable>
            <div className="relative flex items-center justify-center">
              <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='password' autoComplete="current-password" value={password} onChange={handleChange} />
            </div>
          </div>
          <div className="mt-8">
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 text-sm font-semibold leading-none text-white focus:outline-none bg-violet-700 border rounded hover:bg-violet-600 py-4 w-full" type="submit" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
