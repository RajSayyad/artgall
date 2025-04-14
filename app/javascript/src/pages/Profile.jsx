import React, { useState, useEffect } from 'react'
import postApi from '../api/posts'
import userApi from '../api/user';
import { PostsTable } from '../components/post';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';


const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const res = await postApi.myPosts();
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

const onDownload = async (e) => {
  e.preventDefault();

  try {
    const res = await userApi.generate();
    toast.success(res.data.message); 
    try {
      setTimeout(async () => {
        const response = await userApi.downloadPdf({ responseType: "blob" });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const fileName = 'user_posts.pdf';
        saveAs(blob, fileName);
        toast.success('PDF downloaded successfully!');
      }, 10000);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Error downloading PDF!');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Error generating PDF!');
  }
};


  useEffect(() => {
    fetchMyPosts();
  }, [])

  const onDelete = async (e ,id) => {
    e.preventDefault();
    try {
      const res = await postApi.deletePost(id)
      toast.success(res.data.message);
      fetchMyPosts();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

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
		<PostsTable posts={posts} onDelete={onDelete}/>

    <div className="flex justify-end m-5">
      <div>
        <button
          type="button"
          className="m-5 text-white ml-4 bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-center dark:bg-green-900 dark:hover:bg-green-700 dark:focus:ring-blue-800"
          onClick={onDownload}
        >
          Download Report
        </button>
      </div>
    </div>

	</div>
  )
}

export default Profile;
