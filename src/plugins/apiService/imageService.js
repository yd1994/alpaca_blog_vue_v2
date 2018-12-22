import axiosUtil from '../axios.util'
import { Notify } from 'quasar'

export default {
  baseUri: '/api1/images',
  get: function (id, success, error) {
    let uri = this.baseUri + id.toString()
    axiosUtil.get(uri, {}, response => {
      success(response.data)
    }, err => {
      error(err)
    })
  },
  add: function ($file, success, error) {
    let uri = this.baseUri
    let formData = new FormData()
    formData.append('image', $file)
    axiosUtil.post(uri, formData, response => {
      Notify.create({
        message: '图片上传成功!',
        type: 'positive',
        color: 'positive',
        position: 'top'
      })
      success(response.headers.location)
    }, err => {
      Notify.create({
        message: '图片上传失败!',
        position: 'top'
      })
      error(err)
    })
  }
}
