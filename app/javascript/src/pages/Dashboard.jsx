import React, { useEffect, useState } from 'react'
import postApi from '../api/posts'
import { toast } from 'react-toastify';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.image && (
            <img src={post.image} className='h-max' loading="lazy"/>
          )}
          <p><strong>Posted by:</strong> {post.name}</p>
        </div>
      ))}
    </div>
  );
  
}

export default Dashboard