import apiService from '../apiService'

export default {
  init: function (store) {
    this.setSiteNameForStore(store)
    this.setSiteAddressForStore(store)
    this.setSiteDescriptionForStore(store)
    this.setPersonalNameForStore(store)
    this.setPersonalEmailForStore(store)
    this.setPersonalSummaryForStore(store)
    this.setPersonalGithubForStore(store)
  },
  setSiteNameForStore: function (store) {
    apiService.systemInformation.get.siteName(data => {
      store.commit('info/changeSiteName', data)
    }, () => {})
  },
  setSiteAddressForStore: function (store) {
    apiService.systemInformation.get.siteAddress(data => {
      store.commit('info/changeSiteAddress', data)
    }, () => {})
  },
  setSiteDescriptionForStore: function (store) {
    apiService.systemInformation.get.siteDescription(data => {
      store.commit('info/changeSiteDescription', data)
    }, () => {})
  },
  setPersonalNameForStore: function (store) {
    apiService.systemInformation.get.personalName(data => {
      store.commit('info/changePersonalName', data)
    }, () => {})
  },
  setPersonalEmailForStore: function (store) {
    apiService.systemInformation.get.personalEmail(data => {
      store.commit('info/changePersonalEmail', data)
    }, () => {})
  },
  setPersonalSummaryForStore: function (store) {
    apiService.systemInformation.get.personalSummary(data => {
      store.commit('info/changePersonalSummary', data)
    }, () => {})
  },
  setPersonalGithubForStore: function (store) {
    apiService.systemInformation.get.personalGithub(data => {
      store.commit('info/changePersonalGithub', data)
    }, () => {})
  }
}
