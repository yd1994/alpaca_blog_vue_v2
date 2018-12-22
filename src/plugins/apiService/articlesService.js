import axiosUtil from '../axios.util'
import { Notify } from 'quasar'

export default {
  baseUri: '/api1/articles/',
  list: function (params, success, error) {
    let uri = this.baseUri
    axiosUtil.get(uri, params, response => {
      success(response.data)
    }, err => {
      error(err)
    })
  },
  get: function (id, success, error) {
    let uri = this.baseUri + id.toString()
    axiosUtil.get(uri, {}, response => {
      success(response.data)
    }, err => {
      error(err)
    })
  },
  add: function (params, success, error) {
    let uri = this.baseUri
    axiosUtil.post(uri, params, response => {
      Notify.create({
        message: `添加[ 名称: ${params.title} ]成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success(response.headers.location)
    }, err => {
      error(err)
    })
  },
  update: function (params, success, error) {
    let uri = this.baseUri + params.id.toString()
    axiosUtil.put(uri, params, response => {
      Notify.create({
        message: `修改[ 名称: ${params.title} ]成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success(response.headers.location)
    }, err => {
      error(err)
    })
  }
}
