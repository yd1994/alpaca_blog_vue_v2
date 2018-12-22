import axios from 'axios'
import Qs from 'qs'
import { Notify, LocalStorage } from 'quasar'
import VueRouter from '../router'

let http = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    // p判断是否是 FormData 类型
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      return data
    }
    return Qs.stringify(data)
  }]
})

let apiAxios = function (method, url, params, response, error) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    error(err)
  })
}

// 请求拦截
http.interceptors.request.use(
  config => {
    let url = config.url
    if (url !== '' && url.indexOf('/oauth/token') === -1 && config.method !== 'get') {
      // 如果不是登录或者get请求，请求头添加Authorization
      const token = LocalStorage.get.item('tokenAccessToken')
      if (token) {
        let tokenExpiresTime = LocalStorage.get.item('tokenExpiresTime')
        // 如果token未过期
        if (tokenExpiresTime !== undefined && tokenExpiresTime > new Date().getTime()) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    }
    return config
  }
)

let hasNotifyOf504 = true
// 响应拦截
http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.response) {
      let status = error.response.status
      switch (status) {
        case 401:
          Notify.create({
            message: `需要登录!`,
            type: 'positive',
            color: 'positive',
            position: 'top'
          })
          VueRouter().push({ path: '/admin/login' })
          break
        case 403:
          Notify.create({
            message: `该用户没有操作权限!`,
            type: 'warning',
            color: 'warning',
            position: 'top'
          })
          break
        case 404:
          Notify.create({
            message: '网络连接失败!',
            position: 'top'
          })
          break
        case 500:
          Notify.create({
            message: '网络连接失败!',
            position: 'top'
          })
          break
        case 504:
          if (hasNotifyOf504) {
            hasNotifyOf504 = false
            setTimeout(() => {
              hasNotifyOf504 = true
            }, 3000)
            Notify.create({
              message: '网络连接失败!',
              position: 'top'
            })
          }
          break
      }
    }
    return Promise.reject(error)
  }
)

export default {
  get: function (url, params, response, error) {
    return apiAxios('GET', url, params, response, error)
  },
  post: function (url, params, response, error) {
    return apiAxios('POST', url, params, response, error)
  },
  put: function (url, params, response, error) {
    return apiAxios('PUT', url, params, response, error)
  },
  delete: function (url, params, response, error) {
    return apiAxios('DELETE', url, params, response, error)
  }
}
