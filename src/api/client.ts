import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_API_TOKEN

    if (token) {
      config.headers.Authorization =token
    }

    return config
  },
  (error) => Promise.reject(error)
)