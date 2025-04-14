import axios from 'axios'
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,            
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;
