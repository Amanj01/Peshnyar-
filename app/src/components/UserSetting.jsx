// @ts-nocheck
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { updateProfile, deleteUser } from '../redux/accSlice';

const UserSetting = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
   const updatedUser = useSelector((state) => state.acc.user._id)
   console.log("Updated user id:", updatedUser);
  const status = useSelector((state) => state.acc.status);
  const error = useSelector((state) => state.acc.error);
  let userId = user.id? user.id : updatedUser;
  

  const [formData1, setFormData] = useState({
    profilePicture: '',
    username: '',
    email: '',
    password: '',
    userId: user.id? user.id : updatedUser
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData1, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await axios.post('http://localhost:8000/api/upload', formData);
        setFormData({ ...formData1, profilePicture: response.data.imageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new object that only includes changed fields
    const updatedFields = { userId }; // Start with userId included

    if (formData1.profilePicture && formData1.profilePicture !== user.profilePicture) {
        updatedFields.profilePicture = formData1.profilePicture;
    }
    if (formData1.username && formData1.username !== user.username) {
        updatedFields.username = formData1.username;
    }
    if (formData1.email && formData1.email !== user.email) {
        updatedFields.email = formData1.email;
    }
    if (formData1.password) { // Password should always be updated if filled
        updatedFields.password = formData1.password;
    }

    // Dispatch the update action only if there's something to update
    if (Object.keys(updatedFields).length > 1) { // Check if more than just userId is present
        dispatch(updateProfile({userId , updatedFields}));
    } else {
        alert('No changes made to update.');
    }
};




  console.log("user data after submission: ", formData1);
 const updateClick = () => {
     if (status === 'succeeded') {
      alert('Profile updated successfully!');
    }
  }

  return (
    <div id='update' className='flex-3 pt-24'>
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Update Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Profile Picture</label>
            <div className="flex items-center">
              <img
                src={formData1.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-16 h-16 border-2 border-gray-300 rounded-full mr-4 object-cover"
              />
              <button type="button" onClick={triggerFileInput} className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Change</button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData1.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:text-black"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData1.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:text-black"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData1.password}
              onChange={handleChange}
              className="w-full p-3 border dark:text-black rounded-lg"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={updateClick}
              disabled={status === 'loading'}
              type="submit"
              className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg">
              {status === 'loading' ? 'Updating...' : 'Update'}
            </button>
            <button type="button" className="py-2 px-4 text-red-500 hidden">Delete Account</button>
            {error && <p className="text-red-500"> Username or email is valid try other one</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSetting
