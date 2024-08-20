// @ts-nocheck
import axios from 'axios';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { Link } from 'react-router-dom';

const Register = () => {

    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);
    const inputClasses = "w-full dark:text-black p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser({ username, password, email}));
    }

    useEffect(() => {
        if (status === 'succeeded') {
            setUsername('');
            setPassword('');
            setEmail('');
            alert('User registered successfully!');
            window.location.replace('/login');
            console.log('Status:', status);
        }
    }, [status]);

    return (
        <div className="flex justify-center bg-gray-100 dark:bg-gray-800 items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
            <div className="w-full max-w-sm bg-white bg-opacity-80 p-6 rounded-lg shadow-lg dark:bg-gray-900">
                <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={inputClasses}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className={inputClasses}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={inputClasses}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className={inputClasses}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                        disabled={status === 'loading'}>
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </button>
                    {error && <p className="text-red-500 text-sm pt-1">Registration failed. Please try again.</p>}
                </form>
                <div className="text-center mt-6">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Register;