import axios from 'axios'

/**
 * Axios instance for future backend integration.
 * Set VITE_API_URL in `.env` when the API is available.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (payload) => api.post('/auth/register', payload),
  logout: () => api.post('/auth/logout'),
}

export const profileApi = {
  get: () => api.get('/profile'),
  update: (payload) => api.patch('/profile', payload),
}

export const workoutApi = {
  list: (params) => api.get('/workouts', { params }),
  create: (payload) => api.post('/workouts', payload),
  getById: (id) => api.get(`/workouts/${id}`),
}

export const progressApi = {
  summary: () => api.get('/progress/summary'),
}

export default api
