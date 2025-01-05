// Base url
import axios from 'axios'

const apiURL = axios.create({
  baseURL: import.meta.env.VITE_API_URL
  // baseURL: "http://localhost:4000/api"
})

export default apiURL