// Base url
import axios from 'axios'

const apiSendMail = axios.create({
  baseURL: import.meta.env.VITE_API_CONTACT
})

export default apiSendMail