const ENV = {
  dev: {
    apiUrl: 'http://localhost:44341',
    oAuthConfig: {
      issuer: 'http://192.168.3.221:44371',
      clientId: 'Call_App',
      clientSecret: '1q2w3e*',
      scope: 'address Call email offline_access openid phone profile role'
    },
    localization: {
      defaultResourceName: 'Call'
    }
  },
  prod: {
    apiUrl: 'http://localhost:44341',
    oAuthConfig: {
      issuer: 'http://192.168.3.221:44371',
      clientId: 'Call_App',
      clientSecret: '1q2w3e*',
      scope: 'address Call email offline_access openid phone profile role'
    },
    localization: {
      defaultResourceName: 'Call'
    }
  }
}

export const getEnvVars = () => {
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'development' ? ENV.dev : ENV.prod
}
