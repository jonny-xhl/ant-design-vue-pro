import request from '@/utils/request'

export function getTenants (params = {}) {
  return request({ url: '/multi-tenancy/tenants', method: 'get', params: params })
}

export function createTenant (body) {
 return request({ url: '/multi-tenancy/tenants', method: 'post', data: body })
}

export function getTenantById (id) {
  return request({ url: `/multi-tenancy/tenants/${id}`, method: 'get' })
}

export function updateTenant (body, id) {
  return request({ url: `/api/multi-tenancy/tenants/${id}`, method: 'put', data: body })
}

export function removeTenant (id) {
  return request({ url: `/api/multi-tenancy/tenants/${id}`, method: 'delete' })
}
