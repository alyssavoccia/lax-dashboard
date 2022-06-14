import React, { useState } from 'react';
import env from 'react-dotenv';
import { loadStripe } from '@stripe/stripe-js';
import { db } from '../firebase.config';

const stripePromise = loadStripe(env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

function SignUpHs({ handleUserChange }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: 'highschool',
    grad: '',
    position: '',
    isAdmin: false,
  });
  const currentUsers = [];

  db.collection('users').onSnapshot((snapshot) => {
    snapshot.docs.map((user) => currentUsers.push(user.data().email));
  });
  
  const {displayName, email, password, confirmPassword, grad, position} = formData;

  let formRef = React.createRef();

  const handleSubmit = async () => {
    if (formRef.current.reportValidity() !== null) {
      if (password !== confirmPassword) {
        setMessage('Passwords DO NOT match.');
        setShowSnack(true);
        setTimeout(() => {
          setShowSnack(false);
        }, 3000);
        return;
      }

      if (password.length < 6) {
        setMessage('Password must be AT LEAST 6 characters long.');
        setShowSnack(true);
        setTimeout(() => {
          setShowSnack(false);
        }, 3000);
        return;
      }

      if (currentUsers !== null && currentUsers.length > 0) {
        if (currentUsers.indexOf(email) >= 0) {
          setMessage('The email address has already been used, please use a different one.');
          setShowSnack(true);
          setTimeout(() => {
            setShowSnack(false);
          }, 3000);
          return;
        }
      }
    }

    localStorage.setItem("hsUser", JSON.stringify(formData));
    
    setLoading(true);

    const stripe = await stripePromise;

    const successfulPaymentUrl = 'http://localhost:3000/successful-payment';

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: env.PUBLIC_STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      mode: 'payment',
      cancelUrl: window.location.origin,
      successUrl: successfulPaymentUrl
    });

    setLoading(false);

    if (error) {
      setMessage('Error creating account. Please try again.');
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <h1 tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">Highschool Sign Up</h1>
      <p className="text-sm my-4 font-medium leading-none text-gray-500 mb-8">
        Not a Highschool User?
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
        <label className="text-md font-medium leading-none text-gray-800">Grad Year</label>
        <div className="relative flex items-center justify-center">
          <select className="form-select
            block
            w-full
            px-3
            py-3
            text-base
            font-normal
            text-gray-700
            bg-gray-200 bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mt-2
            focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none" id="grad" value={grad} aria-label="Default select example
          " onChange={handleChange}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>
      <div className="mt-6  w-full">
        <label className="text-md font-medium leading-none text-gray-800">Position</label>
        <div className="relative flex items-center justify-center">
          <select className="form-select
            block
            w-full
            px-3
            py-3
            text-base
            font-normal
            text-gray-700
            bg-gray-200 bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mt-2
            focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none" id='position' value={position} aria-label="Default select example
          " onChange={handleChange}>
            <option value="A">A</option>
            <option value="M">M</option>
            <option value="D">D</option>
            <option value="G">G</option>
          </select>
        </div>
      </div>
      <div className="mt-8">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 text-sm font-semibold leading-none text-white focus:outline-none bg-cyan-500 border rounded hover:bg-cyan-600 py-4 w-full" type="submit" onClick={handleSubmit} disabled={loading}>Checkout & Sign Up</button>
      </div>
      <div className={`${showSnack ? 'opactity-100': 'opacity-0'} transition-all duration-300 ease-in absolute top-2 right-2 space-x-2 justify-center`}>
        <div className="shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" role="alert">
          <div className=" bg-red-500 flex justify-between items-center py-2 px-3 bg-clip-padding rounded-lg">
            <p className="font-bold text-white">{message}</p>
            <div className="flex items-center">
              <button type="button" className="box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" onClick={() => setShowSnack(false)}>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpHs;