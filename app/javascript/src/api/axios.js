import axios from 'axios'
// Get CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Set up Axios to include the CSRF token in every request
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
const api = axios.create({
  baseURL: 'http://localhost:3000', // Rails server
  withCredentials: true,            // ⬅️ Sends the session cookie
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
