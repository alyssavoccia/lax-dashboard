import { useState } from "react";
import { Link } from 'react-router-dom';
import SignUp from "../components/SignUp";
import SignUpHs from "../components/SignUpHs";

function SignUpPage() {
  const [hsUser, setHsUser] = useState(false);

  const handleUserChange = () => {
    setHsUser(!hsUser);
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-cyan-600 to-cyan-400 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <Link to='/'>
          <img className="cursor-pointer w-14 h-14 mb-4" src="https://hotemoji.com/images/dl/5/lacrosse-emoji-by-twitter.png" alt="logo" />
        </Link>
        <div className="bg-white shadow-lg rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-10">
          {!hsUser
            ? <SignUp handleUserChange={handleUserChange} />
            : <SignUpHs handleUserChange={handleUserChange} />
          }
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
