import api from "./axios";

const fetch = () => api.get("/posts");

const createPost = (payload) => api.post("/posts", payload, 
	{
		headers:
		{
			'Content-Type': 'multipart/form-data'
		}
	});

const show = (id)=> api.get(`/posts/${id}`);

const edit = (id, payload) => api.put(`/posts/${id}`, payload);

const deletePost = (id) => api.delete(`/posts/${id}`);

const myPosts = ()=> api.get("/posts/my_posts");
const postApi = {fetch, createPost, show, myPosts, edit, deletePost};

export default postApi;