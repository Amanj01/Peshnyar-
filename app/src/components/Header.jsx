// @ts-ignore
import image from '../assets/rsm2.jpg'
// @ts-ignore
import image2 from '../assets/h1.jpg'
// @ts-ignore
import image3 from '../assets/h2.jpg'
// @ts-ignore
import image4 from '../assets/h3.jpg'

import { useEffect, useState } from 'react';

const images = [image, image2, image3, image4];

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lines = document.querySelectorAll('.line');

    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('animate-slideDown');
      }, index * 700);
    });
  }, []);
  
  return (
    <div 
      className="flex justify-center h-screen bg-cover bg-bottom rounded-b-xl transition-all duration-1000 ease-in-out" 
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="h-2/4 content-center">
        <div className="line opacity-0 transform -translate-y-8"><h1 className='text-white text-2xl'>Welcome to Peshnyar application</h1></div>
        <div className="line opacity-0 transform -translate-y-8"><h1 className='text-white text-2xl'>Share Your recommendation</h1></div>
        <div className="line opacity-0 transform -translate-y-8"><h1 className='text-white text-2xl cursor-pointer'>Start</h1></div>
      </div>
    </div>
  )
}

export default Header
