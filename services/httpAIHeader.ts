import axios from 'axios';

// Create an Axios instance
const baseURL = import.meta.env.AI_MIRCOSERVICE_URL
const httpAIHeader = axios.create({
  baseURL, 
  withCredentials: true, // Ensure cookies are sent with each request (for session handling)
});

export default httpAIHeader;