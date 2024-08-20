// @ts-ignore
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

// @ts-ignore
const LoginForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { status, error, user, isLogin } = useSelector((state) => state.auth);
  console.log('User is login:', isLogin);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(loginUser({ username, password }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'succeeded') {
      setUsername('');
      setPassword('');
      console.log('User state:', user);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Logged in successfully!');
      window.location.replace("/");
      navigate('/');
      
    }
  }, [status, user, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-black"
          required
        />
        <button type="submit" disabled={status === 'loading'} className='bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white'>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {status === 'failed' && <p className='pt-2 text-red-500'>Error: {error}</p>}
      {isLogin && <p>Welcome, you are logged in!</p>}
    </div>
  );
};

const Login = () => {
  const handleLogin = (credentials) => {
    console.log('Login attempt:', credentials);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          You need to login to access the <span className='text-green-600 font-semibold'>write</span> section and create new posts.
        </p>
        <LoginForm onSubmit={handleLogin} />
        <div className="text-center mt-6">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline cursor-pointer">
              Register here
            </Link>
          </p>
        </div>
      </div> 
    </div>

  );
};

export default Login;
