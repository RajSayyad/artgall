import axios from "./axios";

const fetch = () => axios.get("/posts");

const createPost = (payload) => axios.post("/posts", payload, 
	{
		headers:
		{
			'Content-Type': 'multipart/form-data'
		}
	});

const show = (id)=> axios.get(`/posts/${id}`);

const edit = (id, payload) => axios.put(`/posts/${id}`, payload);

const deletePost = (id) => axios.delete(`/posts/${id}`);

const myPosts = ()=> axios.get("/posts/my_posts");
const postApi = {fetch, createPost, show, myPosts, edit, deletePost};

export default postApi;