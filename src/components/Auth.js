import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/home');  // Redirect to home page after successful auth
    } catch (error) {
      console.error('Authentication Error: ', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleAuth}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
