import axiosUtil from './axios.util'
import apiService from './apiService/index'

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosUtil
  Vue.prototype.$apiService = apiService
}
