// @ts-ignore
import image from '../assets/post.jpg'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'


const Post = ({post}) => {

  const navigate = useNavigate();
 
  const handleUserTitleClick = () => {
    navigate(`/singlePost/${post._id}`);
   };

   // @ts-ignore
   const updatedUser = useSelector((state) => state.acc.user.username)
   let username;
   if(updatedUser){
     username = updatedUser
   } else {
     username = post.username
   }

  return (
    <div className=' pt-24 flex-3 px-1'>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full">
  {/* Header */}
  <header className="mb-2 flex justify-between items-start">
  <div>
    <h1 onClick={handleUserTitleClick} className="text-xl font-semibold cursor-pointer ">Post Title:</h1>  
    <p className="text-gray-500 dark:text-white">{post.title}</p>
  </div>
  <div className="flex space-x-2">
    <span className=" text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:text-blue-700">{post.categories}</span>
  </div>
  </header>

  {/* Image */}
  <div className="mb-6">
    <img src={post.imageUrl || image } alt="Post Image" className="w-full rounded-lg" />
  </div>

  {/* Content */}
  <article className="prose lg:prose-xl mb-6">
    <p>{post.desc}</p>
    <hr className='mt-2 border-gray-300'/>
  </article>

  {/* Footer */}
  <footer className="flex items-center justify-between text-gray-600">
    <div className="flex items-center">
      <div>
        <h4 onClick={()=>(navigate(`/?user=${post.username}`))}  
         className="font-bold dark:text-white cursor-pointer">{post.username}</h4> 
        <h4 className="text-sm dark:text-gray-200">{new Date(post.updatedAt).toDateString()}</h4>
      </div>
    </div>
    <div>
      <p className="text-blue-700 ">I hope you find great benefit from this.</p>
    </div>
  </footer>
</div>
    </div>
  )
}

export default Post
