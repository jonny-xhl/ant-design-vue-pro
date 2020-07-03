import request from '@/utils/request'

export const getPermissions = ({ providerName, providerKey }) => request({ method: 'get', url: '/api/abp/permissions', params: { providerName: providerName, providerKey: providerKey } })

export const updatePermissions = () => request({ method: 'put', url: '/api/abp/permissions' })
