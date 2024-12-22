// Base url
import axios from 'axios'

const apiSendMail = axios.create({
  // baseURL: import.meta.env.VITE_API_CONTACT
  baseURL: 'https://jazzy-faun-44d6d7.netlify.app/.netlify/functions'
})

export default apiSendMail