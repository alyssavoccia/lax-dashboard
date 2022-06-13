import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

function Login() {
  const [showSnack, setShowSnack] = useState(false);
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
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tl from-cyan-600 to-cyan-400 w-full py-16 px-4">
        <div className="flex flex-col items-center justify-center">
          <Link to='/'>
            <img className="cursor-pointer w-14 h-14 mb-4" src="https://hotemoji.com/images/dl/5/lacrosse-emoji-by-twitter.png" alt="logo" />
          </Link>
          <div className="bg-white shadow-lg rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-10">
            <h1 tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">Login to your account</h1>
            <p className="text-sm my-4 font-medium leading-none text-gray-500">
              Dont have account?{" "}
              <span tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-cyan-500 hover:text-cyan-600 cursor-pointer">
                <Link to='/sign-up'>Sign up here</Link>
              </span>
            </p>
            <div>
              <label className="text-md font-medium leading-none text-gray-800">Email</label>
              <input aria-label="enter email adress" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='email' autoComplete="email" autoFocus value={email} onChange={handleChange} />
            </div>
            <div className="mt-6  w-full">
              <label className="text-md font-medium leading-none text-gray-800">Password</label>
              <div className="relative flex items-center justify-center">
                <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" name='password' autoComplete="current-password" value={password} onChange={handleChange} />
              </div>
            </div>
            <div className="mt-8">
              <button className="focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 text-sm font-semibold leading-none text-white focus:outline-none bg-cyan-500 border rounded hover:bg-cyan-600 py-4 w-full" type="submit" onClick={handleSubmit}>Login</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${showSnack ? 'opactity-100': 'opacity-0'} transition-all duration-300 ease-in absolute top-2 right-2 space-x-2 justify-center`}>
        <div className="shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" role="alert">
          <div className=" bg-red-500 flex justify-between items-center py-2 px-3 bg-clip-padding rounded-lg">
            <p className="font-bold text-white">Error logging in. Please try again.</p>
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

export default Login;
