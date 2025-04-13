import axios from "./axios";

const fetch = () => axios.get("/posts");

const createPost = (payload) => axios.post("/posts", payload, 
								{headers:
									{
										'Content-Type': 'multipart/form-data'
									}
								});

const postApi = {fetch, createPost};

export default postApi;