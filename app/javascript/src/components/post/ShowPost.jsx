import React, {useState, useEffect} from 'react'
import postApi from '../../api/posts';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ShowPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  useEffect(()=>{
    const fetchPost = async()=>{
      try {
        const res = await postApi.show(id)
        setPost(res.data);
        setLoading(false);
      } catch (error) {
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50 ">{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-80 object-cover rounded-xl shadow mb-6"
      />
      <div className="prose prose-lg max-w-none  text-gray-900 dark:text-gray-50">
        <p className='whitespace-pre-wrap'>{post.content}</p>
      </div>
    </div>
  );
};

export default ShowPost;