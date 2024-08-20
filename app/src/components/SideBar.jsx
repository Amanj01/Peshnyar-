import { useState, useEffect } from 'react';
// @ts-ignore
import image1 from '../assets/rsm4.jpg';
// @ts-ignore
import image2 from '../assets/plane.jpg';
// @ts-ignore
import image3 from '../assets/thinking.jpg';
// @ts-ignore
import image4 from '../assets/question.jpg';


const SideBar = () => {
  const [currentImage, setCurrentImage] = useState(image1);

  useEffect(() => {
    const images = [image1, image2, image3, image4]; // Add more images to the array
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 8000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='sidebar' className='SideBar flex-1 min-h-120 w-full pt-24'>
      <div className="container px-4 py-6 rounded-lg shadow-2xl w-full bg-white dark:bg-gray-900">
        <div className="img bg-gray-300 rounded-lg h-60 bg-cover bg-center bg-no-repeat transition-all duration-1000" 
             style={{ backgroundImage: `url(${currentImage})` }}>
          <img src={currentImage} alt="Image" className="w-full h-full object-cover rounded-lg opacity-0" />
        </div>
        <div className="info">
          <h1 className='text-xl font-semibold pt-4 pb-2'>Welcome to Peshnyar</h1>
          <hr className='border-1 pb-2 rounded-lg border-gray-400 dark:border-white' />
          <p className='text-justify text-gray-700 dark:text-white'>
            Discover and share the best recommendations with Peshnyar,
            your go-to app for personalized suggestions on everything
            from books and movies to restaurants and travel destinations.
          </p>
        </div>
        <hr className='border-1 mt-2 rounded-lg border-gray-400 dark:border-white' />
        <div className="category">
          <h2 className='text-xl font-semibold pt-4 pb-2'>Popular Categories</h2>
          <hr className='border-1 pb-2 rounded-lg border-gray-400 dark:border-white' />
          <div className="flex flex-wrap justify-center">
            <div className="category-item w-1/3 text-center">
              <i className="fa-solid fa-book text-2xl text-gray-600 dark:text-white"></i>
              <h3 className='text-xs font-semibold py-2'>Books</h3>
            </div>
            <div className="category-item w-1/3 text-center">
              <i className="fa-solid fa-film text-2xl text-gray-600 dark:text-white"></i>
              <h3 className='text-xs font-semibold py-2'>Movies</h3>
            </div>
            <div className="category-item w-1/3 text-center">
              <i className="fa-solid fa-heart-pulse text-2xl text-gray-600 dark:text-white"></i>
              <h3 className='text-xs font-semibold py-2'>Health</h3>
            </div>
            <div className="category-item w-1/3 text-center">
              <i className="fa-solid fa-plane text-2xl text-gray-600 dark:text-white"></i>
              <h3 className='text-xs font-semibold py-2'>Traveling</h3>
            </div>
            <div className="category-item w-1/3 text-center">
              <i className="fa-solid fa-futbol text-2xl text-gray-600 dark:text-white"></i>
              <h3 className='text-xs font-semibold py-2'>Sports</h3>
            </div>
            <div className="category-item w-1/3 text-center">
              <i className="fa-solid fa-gamepad text-2xl text-gray-600 dark:text-white"></i>
              <h3 className='text-xs font-semibold py-2'>Games</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
