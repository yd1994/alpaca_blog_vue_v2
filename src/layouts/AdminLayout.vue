<template>
  <q-layout view="lHh LpR lFf">
    <q-layout-header :reveal="true">
      <!-- logo 处 -->
      <q-toolbar inverted color="dark">
        <q-btn flat round dense @click="showLeft = !showLeft" icon="menu">
        </q-btn>
        <q-toolbar-title>
          {{ $store.state.info.siteName.value }} 后台管理
          <span slot="subtitle">{{ $store.state.info.siteDescription.value }}</span>
        </q-toolbar-title>
        <q-btn v-if="showFullScreenBtn" flat round dense @click="clickFullscreenBtn" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"/>
        <q-btn v-if="showFullScreenBtn" flat round dense icon="home" to="/index"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer side="left" v-model="showLeft" content-class="bg-grey-3"
                     :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true">
      <q-list no-border link>
        <q-list-header>{{ $store.state.info.siteName.value }}</q-list-header>
        <q-item to="/admin/outline">
          <q-item-side icon="equalizer" />
          <q-item-main label="概要" sublabel="系统情况" />
        </q-item>
      </q-list>
      <q-list no-border link>
        <q-list-header>撰写</q-list-header>
        <q-item to="/admin/write/article">
          <q-item-side icon="create" />
          <q-item-main label="撰写" sublabel="快速添加新博文" />
        </q-item>
      </q-list>
      <q-list no-border link>
        <q-list-header>管理</q-list-header>
        <q-item to="/admin/management/article">
          <q-item-side icon="import_contacts" />
          <q-item-main label="博文" sublabel="博文管理" />
        </q-item>
        <q-item to="/admin/management/category">
          <q-item-side icon="list_alt" />
          <q-item-main label="分类" sublabel="分类管理" />
        </q-item>
        <q-item to="/admin/management/articleTag">
          <q-item-side icon="label" />
          <q-item-main label="标签" sublabel="标签管理" />
        </q-item>
      </q-list>
      <q-list no-border link>
        <q-list-header>个人信息</q-list-header>
        <q-item to="/admin/person/updatePassword">
          <q-item-side icon="person" />
          <q-item-main label="修改密码" sublabel="修改登录密码" />
        </q-item>
      </q-list>
      <q-list no-border link>
        <q-list-header>设置</q-list-header>
        <q-item to="/admin/option/general">
          <q-item-side icon="settings" />
          <q-item-main label="基础设置" sublabel="基础设置" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',
  data () {
    return {
      showLeft: this.$q.platform.is.desktop,
      showRight: this.$q.platform.is.desktop,
      miniState: this.$q.platform.is.desktop,
      showFullScreenBtn: !this.$q.platform.is.cordova
    }
  },
  methods: {
    openURL,
    clickFullscreenBtn: function () {
      this.$q.fullscreen.toggle()
    },
    logout: function () {
      this.$apiService.users.logout(() => {
        this.$router.push({ path: '/admin/login' })
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
