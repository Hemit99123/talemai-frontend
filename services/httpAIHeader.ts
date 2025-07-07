import axios from 'axios';

const baseURL = import.meta.env.AI_MIRCOSERVICE_URL
const httpAIHeader = axios.create({
  baseURL, 
  withCredentials: true, 
});

export default httpAIHeader;