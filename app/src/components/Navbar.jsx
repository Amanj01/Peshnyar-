import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/modeSlice';
import { logout } from '../redux/authSlice';


// @ts-ignore
import img from '../assets/avatar.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
7
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  // @ts-ignore
  const user = useSelector((state) => state.acc.user);
  console.log('User:', user);

  // @ts-ignore
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    setActive('Home');
    navigate('/');
  }; 
  const menu = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Write', path: isLogin? '/write' : '/login' },
    { name: isLogin ? 'Logout' : 'Login', path: isLogin ? '/logout' : '/login' },
  ];
  
  
  const [active, setActive] = useState('Home');

  const image = img;
  const dispatch = useDispatch();
  // @ts-ignore
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode !== null) {
      dispatch(toggleDarkMode(JSON.parse(storedDarkMode)));
    }
  }, [dispatch]);
  

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);
  

  const symbol = isDarkMode ? (
    <i className="fa-regular cursor-pointer fa-moon text-2xl text-gray-700 dark:text-white dark:hover:text-gray-300" onClick={() => dispatch(toggleDarkMode())}></i>
  ) : (
    <i className="fa-regular cursor-pointer fa-sun text-2xl text-gray-700 dark:text-white dark:hover:text-gray-300" onClick={() => dispatch(toggleDarkMode())}></i>
  );

  return (
<div className="navbar z-50 animate-slideDown flex fixed w-full h-16 bg-gray-100 drop-shadow-xl dark:bg-gray-900 dark:drop-shadow-xl object-center">
      <div className="container flex justify-between content-end h-full items-center px-4">
        <div className="icons flex space-x-4 align-middle">
          <Link to={"/"}>
            <h1 onClick={handleLogoClick} id='logo' className="cursor-pointer text-2xl font-semibold sm:text-md dark:text-white pt-1">PESHNYAR</h1>
          </Link>
          {symbol}
        </div>

        {/* Toggle Button for Small and Medium Screens */}
        <button
          className="lg:hidden block text-gray-600 dark:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>

        {/* Menu for Large Screens */}
        <div className={`menu hidden lg:flex space-x-16 align-middle ${isOpen ? 'block' : 'hidden'}`}>
          {menu.map((item) => (
            <Link to={item.path} key={item.name}>
              <li
                className={`list-none text-gray-600 dark:text-white font-semibold cursor-pointer hover:text-black dark:hover:text-gray-300 text-2xl transition ease-in-out duration-300 ${
                  (item.name.toLowerCase() === 'home' && location.pathname === '/') || location.pathname === `/${item.name.toLowerCase()}` ? 'border-b-2 border-black dark:border-white' : ''
                }`}
                onClick={() => {
                  setActive(item.name);
                  if (item.name === "Logout") {
                    dispatch(logout());
                  }
                }}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </div>

        {/* Vertical Menu for Small and Medium Screens */}
        <div className={`menu lg:hidden flex flex-col absolute top-16 left-0 w-full bg-gray-100 dark:bg-gray-900 shadow-lg z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {menu.map((item) => (
            <Link to={item.path} key={item.name}>
              <li
                className={`list-none p-4 text-gray-600 dark:text-white font-semibold cursor-pointer hover:text-black dark:hover:text-gray-300 text-xl transition ease-in-out duration-300 ${
                  (item.name.toLowerCase() === 'home' && location.pathname === '/') || location.pathname === `/${item.name.toLowerCase()}` ? 'border-l-4 border-black dark:border-white' : ''
                }`}
                onClick={() => {
                  setActive(item.name);
                  if (item.name === "Logout") {
                    dispatch(logout());
                  }
                  setIsOpen(false); // Close menu on item click
                }}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </div>

        <div className="search flex space-x-4 justify-end items-center">
          {isLogin && <Link to="/setting"> <i className="text-black dark:text-white cursor-pointer text-lg transition ease-in-out duration-300">{user.username}</i> </Link>}
          {user && isLogin ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400 cursor-pointer">
              <Link to="/setting">
                <img className="w-full h-full object-cover" src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Avatar" />
              </Link>
            </div>
          ) : ""}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
