import api from '@/api'

const createUser = (data) => api.post('/api/v1/user/create', {
  username: data.username,
  password: data.password,
  email: data.email,
})
