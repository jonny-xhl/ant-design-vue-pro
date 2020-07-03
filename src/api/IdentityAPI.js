import request from '@/utils/request'

export const getProfileDetail = () => request({ url: '/api/identity/my-profile', method: 'get' })

export const getAllRoles = () => request({ url: '/api/identity/roles/all', method: 'get' })

export const getUserRoles = id => request({ url: `/api/identity/users/${id}/roles`, method: 'get' })

export const getUsers = (params = { maxResultCount: 10, skipCount: 0 }) => request({ url: '/api/identity/users', method: 'get', params: params })

export const getUserById = id => request({ url: `/api/identity/users/${id}`, method: 'get' })

export const getUserByName = name => request({ url: `/api/identity/users/by-username/${name}`, method: 'get' })

export const createUser = body => request({ url: '/api/identity/users', method: 'post', data: body })

export const updateUser = (body, id) => request({ url: `/api/identity/users/${id}`, method: 'put', data: body })

export const removeUser = id => request({ url: `/api/identity/users/${id}`, method: 'delete' })

export const updateProfileDetail = body => request({ url: '/api/identity/my-profile', method: 'put', data: body })

export const changePassword = body => request({ url: '/api/identity/my-profile/change-password', method: 'post', data: body })

export const getServiceList = () => request({})
