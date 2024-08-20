// @ts-nocheck
// @ts-ignore
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/postSlice';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

const Write = () => {

  // @ts-ignore
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/800x300");
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState('');
  // @ts-ignore
  const user = useSelector((state) => state.auth.user);
  const updatedUser = useSelector((state) => state.acc.user)
  console.log("user id: " + user.id , "updated user id: " + updatedUser._id);
  let username = user.username? user.username : updatedUser.username;
  let userId = user.id? user.id : updatedUser._id;
  
  console.log("testing username", username)
  console.log("user from write page", user)
  console.log("user idddddddd", userId)
  const dispatch = useDispatch();
  // @ts-ignore
  const { status, error} = useSelector((state) => state.post);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagePath = imageUrl;
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", selectedFile.name);
  
      try {
        const res = await axios.post("http://localhost:8000/api/upload", formData);
        imagePath = res.data.imageUrl; // Assuming your server returns the full URL
      } catch (err) {
        console.error("Error uploading image:", err);
        return; // Exit if the image upload fails
      }
    }
  
    dispatch(createPost({ title, desc, username, categories, imageUrl: imagePath , userId }));
  };
  
  
  

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
  
    try {
      const response = await axios.post("http://localhost:8000/api/posts", formData);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  
  useEffect( () => {
    if (status === 'succeeded') {
      setTitle('');
      setDesc('');
      setCategories('');
      setImageUrl("https://via.placeholder.com/800x300");
      setSelectedFile(null);
      alert('Post created successfully!');
      window.location.replace("/");
    }
  }, [status]);

  useEffect(() => {
    tippy('#fileInputButton', {
      content: 'Add an image',
      placement: 'top',
    });

    return () => {
      if (imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className=''>
      <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
        {/* Image Section */}
        <div className="w-full">
          <img src={imageUrl} alt="Blog Image" className="w-full h-auto rounded-lg" />
        </div>
        
        {/* Title and Content Section */}
        <div className="mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <label htmlFor="fileInput" className="cursor-pointer">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setImageUrl(url);
                  }
                }}
              />
              <button 
                id="fileInputButton"
                className="bg-teal-600 hover:bg-teal-700 rounded-full p-2 border-2 border-gray-300"
                onClick={() => document.getElementById('fileInput').click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </label>
            <input 
              type="text" 
              placeholder="Title" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-teal-500 text-xl md:text-2xl text-gray-900 dark:text-white placeholder-gray-400 p-2" 
            />
          </div>
          <textarea 
           value={desc}
           onChange={e => setDesc(e.target.value)}
            placeholder="Write your recommendation..." 
            className="w-full bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-teal-500 text-base md:text-lg text-gray-600 placeholder-gray-400 dark:text-white h-32 md:h-48 resize-none p-2"
          ></textarea>
        </div>
        
        {/* Categories Section */}
        <div className="mt-3">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <input
            type="text"
            onChange={e => setCategories(e.target.value)}
            id="categories"
            name="categories"
            className="mt-1 block h-10 w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter categories (comma-separated)"
          />
        </div>

        
        {/* Publish Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            type='submit'
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            disabled={status === 'loading'}>
            {status === 'loading' ? 'Posting...' : 'post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Write
