import axios, { AxiosRequestHeaders } from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
})

api.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    req.headers = {
      ...req.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders
  }

  return req
})

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 3000)),
  )

  return config
})
