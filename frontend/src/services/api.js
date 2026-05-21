import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitlab-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  login: (credentials) => api.post('/user/login', credentials),
  register: (payload) => api.post('/user/register', payload),
}

export const profileApi = {
  get: () => api.get('/user'),
  update: (payload) => api.put('/user/profile', payload),
}

export const workoutApi = {
  list: (params) => api.get('/workout/getall', { params }),
  create: (payload) => api.post('/workout/create', payload),
  update: (id, payload) => api.put(`/workout/update/${id}`, payload),
  delete: (id) => api.delete(`/workout/delete/${id}`),
}

export const progressApi = {
  summary: () => api.get('/progress/getall'),
  add: (payload) => api.post('/progress/add', payload),
}

export const reminderApi = {
  list: () => api.get('/reminder/getall'),
  create: (payload) => api.post('/reminder/create', payload),
  delete: (id) => api.delete(`/reminder/delete/${id}`),
}

export const scheduleApi = {
  list: (params) => api.get('/schedule/getall', { params }),
  create: (payload) => api.post('/schedule/create', payload),
  update: (id, payload) => api.put(`/schedule/update/${id}`, payload),
  delete: (id) => api.delete(`/schedule/delete/${id}`),
}

export default api
