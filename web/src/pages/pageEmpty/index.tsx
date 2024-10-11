// import React from "react";

// import "./style.css";

// const PageNotImplemented = () => {
//   return (
//     <section className="page-404">
//       <h1>Page not implemented</h1>
//       <p>kaam karo bhai.</p>
//     </section>
//   );
// };

// export default PageNotImplemented;

// new code for forgetpassword:----------------------->


import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { showToast } from '@/utils/toast';  

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); 

    try {
      const response = await axios.post('http://127.0.0.1:5000/forget-password', {
        email,
      });

      const { status, cls, msg } = response.data;

      showToast(msg, cls);  

      if (status) {
        setEmail(''); 
      }
    } catch (error) {
      showToast('Error sending reset email or server issue', 'error');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="forget-password-form">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <div className="form-group">
          <label htmlFor="email">Enter your email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="reset-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <Link className="login-link" to="/login">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgetPassword;

