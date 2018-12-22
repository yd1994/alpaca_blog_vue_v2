import axiosUtil from '../axios.util'
import { Notify, LocalStorage } from 'quasar'

export default {
  login: function (params, success, error) {
    let uri = '/api2/oauth/token'
    let loginParams = {
      username: params.username,
      password: params.password,
      grant_type: 'password',
      scope: 'client',
      client_id: 'alpaca_blog_vue',
      client_secret: 'client_vue_password'
    }
    axiosUtil.post(uri, loginParams, response => {
      // 保存到 LocalStorage
      LocalStorage.set('tokenAccessToken', response.data.access_token)
      LocalStorage.set('tokenRefreshToken', response.data.refresh_token)
      LocalStorage.set('tokenExpiresIn', response.data.expires_in)
      LocalStorage.set('tokenExpiresTime', new Date().getTime() + response.data.expires_in * 1000)
      LocalStorage.set('tokenScope', response.data.scope)
      LocalStorage.set('tokenTokenType', response.data.token_type)
      success()
    }, err => {
      error(err)
    })
  },
  logout: function (success, error) {
    let uri = '/api2/oauth/logout'
    axiosUtil.delete(uri, {}, response => {
      LocalStorage.remove('tokenAccessToken')
      LocalStorage.remove('tokenRefreshToken')
      LocalStorage.remove('tokenExpiresIn')
      LocalStorage.remove('tokenExpiresTime')
      LocalStorage.remove('tokenScope')
      LocalStorage.remove('tokenTokenType')
      Notify.create({
        message: `登录成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success()
    }, err => {
      error(err)
    })
  },
  changePassword: function (params, success, error) {
    let uri = '/api2/users/current'
    let changeParams = {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword
    }
    axiosUtil.put(uri, changeParams, response => {
      success(response.data)
      Notify.create({
        message: `修改成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
    }, err => {
      error(err)
    })
  },
  checkLogin: function (success, error) {
    const token = LocalStorage.get.item('tokenAccessToken')
    if (token !== undefined) {
      let tokenExpiresTime = LocalStorage.get.item('tokenExpiresTime')
      if (tokenExpiresTime !== undefined && new Date().getTime() < tokenExpiresTime) {
        let uri = '/api2/oauth/check_token'
        axiosUtil.get(uri, {token: token}, () => {
          success()
        }, () => {
          error()
        })
      }
    } else {
      error()
    }
  }
}
