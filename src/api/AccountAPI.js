import request from '@/utils/request'
import { getEnvVars } from '../../Environment'

const { oAuthConfig } = getEnvVars()

export const login = ({ username, password }) => {
  // eslint-disable-next-line no-undef
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  formData.append('grant_type', 'password')
  formData.append('scope', oAuthConfig.scope)
  formData.append('client_id', oAuthConfig.clientId)
  formData.append('client_secret', oAuthConfig.clientSecret)

  return request({
    url: '/connect/token',
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: oAuthConfig.issuer,
    method: 'POST',
    data: formData
  })
}

export const logout = () => request({ method: 'GET', url: '/api/account/logout' })

export const getInfo = () => request({ method: 'GET', url: '/connect/userinfo' })

export const getTenant = tenantName => request({ method: 'GET', url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}` })

export const getTenantById = tenantId => request({ method: 'GET', url: `/api/abp/multi-tenancy/tenants/by-id/${tenantId}` })

export const getCurrentUserNav = (token) => request({})

export const getSmsCaptcha = () => {
  return {}
}

export const get2step = (body) => {
  return new Promise(resolve => {
    resolve({
    result: {
      stepCode: true
    }
  })
  })
}
