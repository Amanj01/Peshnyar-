import { Link } from "react-router-dom";

 
 const Logout = () => {
 
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">You have been logged out</h1>
        <p className="mt-4 text-gray-600 dark:text-white">We hope to see you again soon!</p>
      <Link to={"/login"}>  <button
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login Again
        </button> </Link>
      </div>
    </div>
  );
};

export default Logout;
