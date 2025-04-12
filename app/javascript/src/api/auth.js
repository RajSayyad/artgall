import axios from "./axios";

const login = (payload) => axios.post("/users/sign_in", payload)

const register = (payload) => axios.post("/users", payload)

const authApi = {login, register};

export default authApi;