import api from "./axios";

const generate = () => api.post("/pdfs");

const downloadPdf = (config) => api.get("/pdfs/download", config);

const userApi = {generate, downloadPdf};

export default userApi;