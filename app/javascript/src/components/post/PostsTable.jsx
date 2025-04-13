import React from 'react';

const PostsTable = ({ posts, onEdit, onDelete }) => {
       console.log(posts)
  return (
    <div className="overflow-x-auto m-10">
      <table className="min-w-full table-auto border-collapse border border-gray-700 bg-gray-50">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">Title</th>
            <th className="px-4 py-2 text-left border-b">Created At</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">{new Date(post.date).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => onEdit(post.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
