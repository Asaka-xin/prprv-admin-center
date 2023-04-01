import api from '@/api'

const createRole = (data) => api.post('/api/v1/role/create', {
  role: data.role,
  name: data.name,
  description: data.description,
  permission: data.permission
})

const queryRoleAll = () => api.get('/api/v1/role/query/all')
export { createRole, queryRoleAll }
