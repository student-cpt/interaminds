// import axios from "axios";
// import { useState } from "react";
// import { setTokenAndRedirect } from "../common";
// import React from "react";
// import { loginService } from "@/services";

// import "./style.css";
// import { Link } from "react-router-dom";
// import { showToast } from "@/utils/toast";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     const input = { email, password };

//     const { status, cls, msg, payload } = await loginService(input);

//     showToast(msg, cls);

//     if (!status) {
//       return;
//     }

//     setTimeout(() => {
//       setTokenAndRedirect(payload);
//     }, 2000);
//   };

//   return (
//     <div className="login-form">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <p className="text-secondary text-center">
//           Welcome back! Login to your account to access the dashboard.
//         </p>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button className="login-btn" type="submit">
//           Login
//         </button>

//         <Link className="forgot-password-link" to="/forget-password">
//           Forgot Password?
//         </Link>
//       </form>
//     </div>
//   );
// };

// const LoginPage = () => {
//   return (
//     <main className="login-page">
//       <LoginForm /> 
//     </main>
//   );
// };

// export default LoginPage;
// code
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { showToast } from '@/utils/toast';  

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
      });

      const { status, cls, msg, payload } = response.data;

      showToast(msg, cls);  

      if (status) {
        localStorage.setItem('token', payload);  

        
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 2000);
      }
    } catch (error) {
     
      showToast('Invalid credentials or server error', 'error');
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

        <Link className="forgot-password-link" to="/forget-password">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
