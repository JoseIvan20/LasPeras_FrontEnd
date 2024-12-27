// Base url
import axios from 'axios'

const apiURL = axios.create({
  baseURL: import.meta.env.VITE_API_URL
  // baseURL: 'https://jazzy-faun-44d6d7.netlify.app/.netlify/functions'
})

export default apiURL