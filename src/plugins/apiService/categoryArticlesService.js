import axiosUtil from '../axios.util'

export default {
  list: function (categoryId, params, success, error) {
    let uri = '/api1/categories/' + categoryId + '/articles'
    axiosUtil.get(uri, params, response => {
      success(response.data)
    }, err => {
      error(err)
    })
  }
}
