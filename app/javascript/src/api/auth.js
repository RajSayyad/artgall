import axios from "./axios";

const login = (payload) => axios.post("/users/sign_in", payload)

const register = (payload) => axios.post("/users", payload)

const logout = () => axios.delete("/users/sign_out");

const getUser = () => axios.get("/current_user")

const authApi = {login, register, logout, getUser};

export default authApi;