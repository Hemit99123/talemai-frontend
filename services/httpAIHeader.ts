import axios from 'axios';

const baseURL = import.meta.env.VITE_AI_MIRCOSERVICE_URL || "http://localhost:8000";
const httpAIHeader = axios.create({
  baseURL, 
  withCredentials: true, 
});

export default httpAIHeader;