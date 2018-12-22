import axiosUtil from '../axios.util'
import { Notify } from 'quasar'

export default {
  get: {
    baseUri: '/api1/system/information/',
    siteName: function (success, error) {
      let uri = this.baseUri + 'site_name'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    },
    siteAddress: function (success, error) {
      let uri = this.baseUri + 'site_address'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    },
    siteDescription: function (success, error) {
      let uri = this.baseUri + 'site_description'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalName: function (success, error) {
      let uri = this.baseUri + 'personal_name'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalEmail: function (success, error) {
      let uri = this.baseUri + 'personal_email'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalSummary: function (success, error) {
      let uri = this.baseUri + 'personal_summary'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalGithub: function (success, error) {
      let uri = this.baseUri + 'personal_github'
      axiosUtil.get(uri, {}, response => {
        success(response.data)
      }, err => {
        error(err)
      })
    }
  },
  update: {
    baseUri: '/api1/system/information/',
    siteName: function (value, version, success, error) {
      let uri = this.baseUri + 'site_name'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改站点名称成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    },
    siteAddress: function (value, version, success, error) {
      let uri = this.baseUri + 'site_address'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改站点地址成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    },
    siteDescription: function (value, version, success, error) {
      let uri = this.baseUri + 'site_description'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改站点描述成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalName: function (value, version, success, error) {
      let uri = this.baseUri + 'personal_name'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改昵称成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalEmail: function (value, version, success, error) {
      let uri = this.baseUri + 'personal_email'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改电子邮箱成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalSummary: function (value, version, success, error) {
      let uri = this.baseUri + 'personal_summary'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改简介成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    },
    personalGithub: function (value, version, success, error) {
      let uri = this.baseUri + 'personal_github'
      axiosUtil.put(uri, {value: value, version: version}, response => {
        Notify.create({
          message: `修改github成功!`,
          type: 'positive',
          color: 'positive',
          position: 'top'
        })
        success(response.data)
      }, err => {
        error(err)
      })
    }
  }
}
