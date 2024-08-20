// @ts-ignore
import aboutImage from '../assets/ab.png';

const About = () => {
  return (
    <div className=''>
      <div className="about-section bg-white dark:bg-gray-900 min-h-screen flex items-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 w-full p-8">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              About Our Peshnyar App
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Welcome to our Peshnyar app, your ultimate destination for discovering personalized suggestions. Whether you're looking for a new book, movie, restaurant, or any other experience, our app has got you covered.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Our mission is to simplify your decision-making process by providing accurate and personalized recommendations. We believe that everyone deserves to enjoy the best experiences life has to offer, and we're here to help make that happen.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Key Features
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-6">
              <li>Personalized recommendations based on your preferences.</li>
              <li>User reviews and ratings to help you make informed decisions.</li>
              <li>Community interaction through forums and discussions.</li>
              <li>Regular updates with new and trending recommendations.</li>
            </ul>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Meet the Team
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Our dedicated team of experts and enthusiasts is passionate about helping you find the best experiences. With a blend of technology and creativity, we strive to bring you the most accurate and enjoyable recommendations.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Technologies We Use
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I utilize React.js and Tailwind CSS to create responsive, efficient user interfaces. On the backend, I employ Node.js with Express.js for scalable server-side applications. MongoDB serves as my flexible, NoSQL database, ensuring robust data management. These technologies together streamline full-stack web development.
            </p>
          </div>
          <div className="lg:w-1/2 w-80 p-8">
            <img src={aboutImage} alt="About Us" className="w-full " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
