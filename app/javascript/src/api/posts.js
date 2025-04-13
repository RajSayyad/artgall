import axios from "./axios";

const fetch = () => axios.get("/posts");

const createPost = (payload) => axios.post("/posts", payload, 
	{
		headers:
		{
			'Content-Type': 'multipart/form-data'
		}
	});

const show = (id)=> axios.get(`/posts/${id}`)
const postApi = {fetch, createPost, show};

export default postApi;