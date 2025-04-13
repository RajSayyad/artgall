import React, { useState, useEffect } from 'react'
import postApi from '../api/posts'
import { PostsTable } from '../components/post';

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await postApi.myPosts();
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyPosts();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
	<div>
		<h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50 ">My Posts</h1>
		<PostsTable posts={posts}/>
	</div>
  )
}

export default Profile;
