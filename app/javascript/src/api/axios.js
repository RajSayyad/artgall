import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // Rails server
  withCredentials: true,            // ⬅️ Sends the session cookie
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
