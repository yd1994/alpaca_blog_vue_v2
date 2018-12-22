<template>
  <q-page :padding="true">
    <div class="row items-start gutter-lg">
      <div class="col-md-6 col-xs-12 q-mb-md">
        <q-card>
          <q-card-title>
            系统资料
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-input v-model="siteName" type="text" float-label="站点名称" placeholder="输入站点名称" />
            <q-input v-model="siteDescription" type="text" float-label="站点描述" placeholder="输入站点描述" />
            <q-input v-model="siteAddress" type="url" float-label="站点地址" placeholder="输入站点地址" />
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn label="确认修改" class="full-width" color="primary" @click="updateSite" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-card>
          <q-card-title>
            作者资料
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-input v-model="personalName" type="text" float-label="昵称" placeholder="输入昵称" />
            <q-input v-model="personalEmail" type="email" float-label="电子邮箱" placeholder="输入电子邮箱" />
            <q-input v-model="personalSummary" type="text" float-label="简介" placeholder="输入简介" />
            <q-input v-model="personalGithub" type="url" float-label="github" placeholder="github" />
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn label="确认修改" class="full-width" color="primary" @click="updatePerson" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'OptionGeneral',
  data () {
    return {
      siteNameData: '',
      siteAddressData: '',
      siteDescriptionData: '',
      personalNameData: '',
      personalEmailData: '',
      personalSummaryData: '',
      personalGithubData: ''
    }
  },
  computed: {
    siteName: {
      get: function () {
        return this.$store.state.info.siteName.value
      },
      set: function (siteName) {
        this.siteNameData = siteName
      }
    },
    siteAddress: {
      get: function () {
        return this.$store.state.info.siteAddress.value
      },
      set: function (siteAddress) {
        this.siteAddressData = siteAddress
      }
    },
    siteDescription: {
      get: function () {
        return this.$store.state.info.siteDescription.value
      },
      set: function (siteDescription) {
        this.siteDescriptionData = siteDescription
      }
    },
    personalName: {
      get: function () {
        return this.$store.state.info.personalName.value
      },
      set: function (personalName) {
        this.personalNameData = personalName
      }
    },
    personalEmail: {
      get: function () {
        return this.$store.state.info.personalEmail.value
      },
      set: function (personalEmail) {
        this.personalEmailData = personalEmail
      }
    },
    personalSummary: {
      get: function () {
        return this.$store.state.info.personalSummary.value
      },
      set: function (personalSummary) {
        this.personalSummaryData = personalSummary
      }
    },
    personalGithub: {
      get: function () {
        return this.$store.state.info.personalGithub.value
      },
      set: function (personalGithub) {
        this.personalGithubData = personalGithub
      }
    }
  },
  methods: {
    init: function () {
      this.$utils.systemInfo.init(this.$store)
    },
    updateSite: function () {
      this.$apiService.systemInformation.update.siteName(
        this.siteNameData || this.siteName,
        this.$store.state.info.siteName.version,
        () => { this.$utils.systemInfo.setSiteNameForStore(this.$store) },
        () => {}
      )
      this.$apiService.systemInformation.update.siteAddress(
        this.siteAddressData || this.siteAddress,
        this.$store.state.info.siteAddress.version,
        () => { this.$utils.systemInfo.setSiteAddressForStore(this.$store) },
        () => {}
      )
      this.$apiService.systemInformation.update.siteDescription(
        this.siteDescriptionData || this.siteDescription,
        this.$store.state.info.siteDescription.version,
        () => { this.$utils.systemInfo.setSiteDescriptionForStore(this.$store) },
        () => {}
      )
    },
    updatePerson: function () {
      this.$apiService.systemInformation.update.personalName(
        this.personalNameData || this.personalName,
        this.$store.state.info.personalName.version,
        () => { this.$utils.systemInfo.setPersonalNameForStore(this.$store) },
        () => {}
      )
      this.$apiService.systemInformation.update.personalEmail(
        this.personalEmailData || this.personalEmail,
        this.$store.state.info.personalEmail.version,
        () => { this.$utils.systemInfo.setPersonalEmailForStore(this.$store) },
        () => {}
      )
      this.$apiService.systemInformation.update.personalSummary(
        this.personalSummaryData || this.personalSummary,
        this.$store.state.info.personalSummary.version,
        () => { this.$utils.systemInfo.setPersonalSummaryForStore(this.$store) },
        () => {}
      )
      this.$apiService.systemInformation.update.personalGithub(
        this.personalGithubData || this.personalGithub,
        this.$store.state.info.personalGithub.version,
        () => { this.$utils.systemInfo.setPersonalGithubForStore(this.$store) },
        () => {}
      )
    }
  },
  mounted () {
    this.init(this.$store)
  }
}
</script>

<style lang="stylus">
</style>
