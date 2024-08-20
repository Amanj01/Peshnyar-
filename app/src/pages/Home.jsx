import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Posts from '../components/Posts';

const apiUrl = 'http://localhost:8000/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/posts${search}`);
        setPosts(res.data);
       } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [search]); 

  return (
    <>
    <Header />
    <div className="flex h-full bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col w-full lg:flex-row lg:space-x-4">
        <div className="lg:w-1/4 flex-shrink-0">
          <SideBar />
        </div>
        <div className="lg:w-3/4 flex-1">
          <Posts post={posts} />
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
