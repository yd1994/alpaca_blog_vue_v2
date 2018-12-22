<template>
  <q-layout view="lHh LpR fff">
    <q-layout-header :reveal="true">
      <!-- logo 处 -->
      <q-toolbar inverted color="dark">
        <q-btn flat round dense @click="showLeft = !showLeft" icon="menu">
        </q-btn>
        <q-toolbar-title>
          {{ $store.state.info.siteName.value }}
          <span slot="subtitle">{{ $store.state.info.siteDescription.value }}</span>
        </q-toolbar-title>
        <q-btn v-if="showFullScreenBtn" flat round dense @click="clickFullscreenBtn"
               :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'">
        </q-btn>
        <q-btn flat round dense @click="showRight = !showRight" icon="widgets">
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer side="left" v-model="showLeft" :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"
                     :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true">
      <q-list no-border link>
        <q-list-header>{{ $store.state.info.siteName.value }}</q-list-header>
        <q-item to="/home">
          <q-item-side icon="account_balance" />
          <q-item-main label="欢迎页" />
        </q-item>
        <q-item to="/index">
          <q-item-side icon="list" />
          <q-item-main label="主页" sublabel="最新博文" />
        </q-item>
        <q-item to="/about">
          <q-item-side icon="assignment_late" />
          <q-item-main label="关于" sublabel="关于本博客" />
        </q-item>
        <q-item to="/admin">
          <q-item-side icon="vertical_split" />
          <q-item-main label="后台管理" sublabel="后台内容管理" />
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-layout-drawer side="right" v-model="showRight" content-class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list no-border link separator>
          <q-list-header>分类</q-list-header>
          <q-item to="/index">
            <q-item-main label="全部" sublabel="全部文章" />
          </q-item>
          <q-item v-for="category in categoryList" :key="category.id" :to="'/categories/' + category.id + '/articles'">
            <q-item-main :label="category.name" :sublabel="category.description" />
          </q-item>
        </q-list>
      </q-scroll-area>
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
      showRight: false, // this.$q.platform.is.desktop,
      miniState: this.$q.platform.is.desktop,
      showFullScreenBtn: !this.$q.platform.is.cordova,
      categoryList: []
    }
  },
  computed: {
  },
  methods: {
    openURL,
    clickFullscreenBtn: function () {
      this.$q.fullscreen.toggle()
    },
    loadCategoryList: function () {
      let params = {
        page: 1,
        size: 30,
        sortByDescs: 'created'
      }
      this.$apiService.categories.list(params, data => {
        this.categoryList = data.data
      })
    }
  },
  created () {
    this.loadCategoryList()
  }
}
</script>

<style lang="stylus">
</style>
