import storage from 'store'
import { login, getInfo, logout } from '@/api/AccountAPI'
import { getApplicationConfiguration } from '@/api/ApplicationConfigurationAPI'
import { getPermissions } from '@/api/PermissionsAPI'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          storage.set(ACCESS_TOKEN, result.access_token, result.expires_in)
          commit('SET_TOKEN', result.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          /**
           * 返回结构
           * {
                "sub": "09dac464-c573-1e7d-43ae-39f4843d1bda",
                "name": "admin",
                "role": "admin"
             }
          */
          const result = response
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getPermissions ({ commit }, user) {
      return new Promise((resolve, reject) => {
        var params = {}
        params.providerName = 'U'
        params.providerKey = user.sub
        // 后期考虑多个role的情况
        getPermissions(params).then(response => {
          resolve(response)
          // const data = {}
          // data.role = {
          //   id: user.role,
          //   name: user.role
          // }
          // response.groups.forEach(item => {
          //   item.permissions.forEach(permission => {
          //     data.role.permissions.push({
          //       roleId: user.role,
          //       permissionId: permission.name,
          //       permissionName: permission.displayName,
          //       actionEntitySet: [

          //       ]
          //     })
          //   })
          // })
        })
      })
    },
    getPermissionsByConfiguration ({ commit }) {
      return new Promise((resolve, reject) => {
        const data = {}
        data.roles = []
         getApplicationConfiguration().then(response => {
          const { auth: { grantedPolicies } } = response
          for (var role in grantedPolicies) {
            data.roles.push(role)
          }
          // if (!data.roles || data.roles.length <= 0) {
          //   reject(new Error('getInfo: roles must be a non-null array!'))
          // }
          commit('SET_ROLES', data.roles)
          resolve(data)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
