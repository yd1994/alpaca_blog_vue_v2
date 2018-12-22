import axiosUtil from '../axios.util'
import { Notify } from 'quasar'

export default {
  baseUri: '/api1/categories/',
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
        message: `添加[ 名称: ${params.name} ]成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success(response.headers.location)
    }, err => {
      Notify.create({
        message: `添加[ 名称: ${params.name} ]失败!`,
        type: 'negative',
        color: 'negative',
        position: 'top'
      })
      error(err)
    })
  },
  update: function (params, success, error) {
    let uri = this.baseUri + '/' + params.id.toString()
    axiosUtil.put(uri, params, response => {
      Notify.create({
        message: `修改[ 名称: ${params.name} ]成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success()
    }, err => {
      Notify.create({
        message: `修改[ 名称: ${params.name} ]失败!`,
        type: 'negative',
        color: 'negative',
        position: 'top'
      })
      error(err)
    })
  },
  delete: function (id, success, error) {
    let uri = this.baseUri + '/' + id.toString()
    axiosUtil.delete(uri, {}, response => {
      Notify.create({
        message: `删除[id: ${id} ]成功!`,
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success()
    }, err => {
      Notify.create({
        message: `删除[ id: ${id} ]失败!`,
        type: 'negative',
        color: 'negative',
        position: 'top'
      })
      error(err)
    })
  }
}
