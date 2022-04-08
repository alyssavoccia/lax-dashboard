import React, { useState } from 'react';
import env from 'react-dotenv';
import { loadStripe } from '@stripe/stripe-js';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const stripePromise = loadStripe(env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

function SignUpHS() {
  const [stripeError, setStripeError] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
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
  
  const {displayName, email, password, confirmPassword, grad, position} = formData;

  let formRef = React.createRef();

  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      team: 'highschool',
      grad: '',
      position: '',
      isAdmin: false,
    })
  };

  const handleSubmit = async () => {
    setLoading(true);

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: env.PUBLIC_STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      mode: 'payment',
      cancelUrl: window.location.origin,
      successUrl: window.location.href = 'http://localhost:3000/'
    });

    if (error) {
      setLoading(false);
      setStripeError(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (formRef.current.reportValidity() && formRef.current.reportValidity() !== null) {
      if (password !== confirmPassword) {
        alert('Password DO NOT match.');
        return;
      }

      if (password.length < 6) {
        alert('Password must be AT LEAST 6 characters long.');
        return;
      }

      // if (currentUsers !== null && currentUsers.length > 0) {
      //   if (currentUsers.indexOf(email) >= 0) {
      //     alert('That email address has already been used, please use a different one.');
      //     return;
      //   } else {
      //     this.setState({
      //       activeStep: activeStep + 1
      //     });
      //   }
      // }
    }
  }

  const gradYears = [
    {
      value: '2023',
      label: '2023'
    },
    {
      value: '2024',
      label: '2024'
    },
    {
      value: '2025',
      label: '2025'
    },
    {
      value: '2026',
      label: '2026'
    }
  ];

  const positions = [
    {
      value: 'A',
      label: 'A'
    },
    {
      value: 'M',
      label: 'M'
    },
    {
      value: 'D',
      label: 'D'
    }
  ];

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        High School Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogTitle>High School Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 1}}>
            To sign up, please fill out the required information below.
          </DialogContentText>
          <form ref={formRef}>
            <TextField
              required
              autoFocus
              margin="dense"
              label="Full Name"
              name="displayName"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={displayName}
            />
            <TextField
              required
              margin="dense"
              label="Email Address"
              type="email"
              name='email'
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={email}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={handleChange}
              value={password}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="standard"
              onChange={handleChange}
              value={confirmPassword}
            />
            <TextField
              required
              select
              fullWidth
              label="Grad Year"
              name="grad"
              value={grad}
              onChange={handleChange}
              helperText="Please select your grad year"
              variant="standard"
            >
              {gradYears.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              select
              fullWidth
              label="Position"
              name="position"
              value={position}
              onChange={handleChange}
              helperText="Please select your position"
              variant="standard"
            >
              {positions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='filled' onClick={handleSubmit}>Checkout & Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SignUpHS;