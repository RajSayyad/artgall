import api from "./axios";

const login = (payload) => api.post("/users/sign_in", payload)

const register = (payload) => api.post("/users", payload)

const logout = () => api.delete("/users/sign_out");

const getUser = () => api.get("/current_user")

const authApi = {login, register, logout, getUser};

export default authApi;