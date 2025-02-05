import i18n from 'i18n-js'
import request from '@/utils/request'

export const getApplicationConfiguration = () =>
request({
  url: '/api/abp/application-configuration',
  method: 'get'
}).then(async config => {
      const { cultureName } = config.localization.currentCulture
      i18n.locale = cultureName

      Object.keys(config.localization.values).forEach(key => {
        const resource = config.localization.values[key]

        if (typeof resource !== 'object') return

        Object.keys(resource).forEach(key2 => {
          if (/'{|{/g.test(resource[key2])) {
            resource[key2] = resource[key2].replace(/'{|{/g, '{{').replace(/}'|}/g, '}}')
          }
        })
      })

      i18n.translations[cultureName] = {
        ...config.localization.values,
        ...(i18n.translations[cultureName] || {})
      }
      console.info('getApplicationConfiguration-->', config)
      return config
    })
