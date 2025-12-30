import Axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  async (config) => {

    const token = localStorage.getItem('token')

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
      JSON.parse(localStorage.getItem("user") || "null")?.token ||
      JSON.parse(localStorage.getItem("user") || "null")?.accessToken
    }

    return config

  },
  async (error) => {
    console.log({ msg: 'Axios Interceptor Error!', error })
    throw error
  }
)

export default Client
