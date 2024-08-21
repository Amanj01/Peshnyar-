// @ts-nocheck
import image from '../assets/post.jpg';
import { useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { updatePost , deletePost } from '../redux/postSlice';


const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState('');
  const [username, setUsername] = useState('');
  const { user } = useSelector((state) => state.auth);
   const updatedUser = useSelector((state) => state.acc.user)
   const userId = updatedUser._id
  console.log(user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${id}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCategories(res.data.categories);
        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const dispatch = useDispatch();
  const { status, error} = useSelector((state) => state.post);
  const handleSaveClick =  () => {
      dispatch(updatePost({ id, postData: { title, desc, categories, username , userId } }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setTitle('');
      setDesc('');
      setCategories('');
      setUsername('');
      alert('Post updated successfully!');
      window.location.replace("/");
    }
  }, [status]);

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}`, {
        data: { userId },
      });
      alert('Post deleted successfully!');
      window.location.replace("/");
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };
  
  

 

  return (
    <div className='flex-3 pt-24 pr-5 h-full'>
      <div className='h-screen'>
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full">
          {/* Header */}
          <header className="mb-2 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">Post Title:</h1>
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:text-white dark:bg-gray-900"
                />
              ) : (
                <p className="text-gray-500 dark:text-white">{post.title}</p>
              )}
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <input
                  type="text"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:text-white dark:bg-gray-900"
                />
              ) : (
                <span className="text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:text-blue-700">{post.categories}</span>
              )}
            </div>
          </header>

          {/* Image */}
          <div className="mb-6">
            <img src={post.imageUrl || image} alt="Post Image" className="w-full rounded-lg" />
          </div>

          {/* Content */}
          <article className="prose lg:prose-xl mb-6">
            {isEditing ? (
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-3 py-2 dark:text-white dark:bg-gray-900 border rounded-lg h-32 resize-none"
              ></textarea>
            ) : (
              <p>{post.desc}</p>
            )}
            <hr className='mt-2 border-gray-300' />
          </article>

          {/* Footer */}
          <footer className="flex items-center justify-between text-gray-600">
            <div className="flex items-center">
              <div>
                <p className="font-bold dark:text-white">{post.username}</p>
                <p className="text-sm dark:text-gray-200">{new Date(post.updatedAt).toDateString()}</p>
              </div>
            </div>
            <div className='icons space-x-4 flex'>
              {updatedUser._id === post.userId && (
                <>
                  <Tippy className='dark:text-white' content="Edit Post">
                    <i
                      className="fa-regular fa-pen-to-square text-xl text-green-600 cursor-pointer"
                      onClick={handleEditClick}
                    ></i>
                  </Tippy>
                  {isEditing && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={handleSaveClick}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Updating' : 'Update'}
                    </button>
                  )}
                  <Tippy className='dark:text-white' content="Delete Post">
                    <i
                    onClick={handleDeleteClick}
                    className="fa-solid fa-trash-can text-xl text-red-600 cursor-pointer"></i>
                  </Tippy>
                </>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
