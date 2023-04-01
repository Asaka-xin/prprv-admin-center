import api from '@/api'

const createPermission = (data) => {
  return api.post('/api/v1/permission/create', {
    permission: data.permission,
    description: data.description
  })
}

const queryPermissionAll = () => api.get('/api/v1/permission/query/all')
const deletePermission = (permission) => api.delete('/api/v1/permission/delete', { params: { permission } })

export { createPermission, queryPermissionAll, deletePermission }

