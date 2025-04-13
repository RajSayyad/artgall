import React from "react";

const PostCard = ({ post }) => {
  return (
	<div className="mt-4">
       <a
       href="/"
       className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300"
       >
       <img
              className="object-cover w-full md:w-96 h-auto rounded-t-lg md:rounded-none md:rounded-s-lg"
              src={post.image}
              alt={post.title}
       />
       <div className="flex flex-col justify-between p-4 max-w-[900px] ml-10">
              <h5 className="mb-2  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
              </h5>
              <p className="mb-3 mt-2 font-normal text-gray-700 dark:text-gray-400 line-clamp-5">
              {post.content}
              </p>
			  <p className="mt-16 font-normal text-gray-700 dark:text-gray-300 ">
              {" "+post.user.name}
              </p>
       </div>
       </a>
    </div>
  );
};

export default PostCard;
