// import Axios from 'axios'

// // Get the backend api via the .env file
// const BASE_URL = import.meta.env.VITE_API_BASE_URL

// const Client = Axios.create({ baseURL: BASE_URL })

// export default Client

import Axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Client = Axios.create({ baseURL: BASE_URL });

// TEMP: attach token if it exists (no login UI needed)
Client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
})

export default Client;
