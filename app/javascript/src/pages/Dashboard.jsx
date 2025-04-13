import React, { useEffect, useState } from 'react'
import postApi from '../api/posts'
import { toast } from 'react-toastify';
import { PostCard } from '../components/post';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPost = async ()=>{
      try {
        const response = await postApi.fetch();
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
        console.log(error)
      }
    }
    fetchPost();
  },[]);

  if (loading) {
    return( 
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }
  return (
    <div className="justify-items-center m-14">
      {posts.map((post, key) => (
        <Link to={`/post/${post.id}`} key={key}>
          <PostCard post={post}/>
        </Link>
      ))}
    </div>
  );
  
}

export default Dashboard