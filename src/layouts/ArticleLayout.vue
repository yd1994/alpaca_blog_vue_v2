<template>
  <q-layout view="lHh LpR lff">
    <q-layout-header :reveal="true">
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
      <q-toolbar inverted color="dark">
        <q-btn flat round dense icon="arrow_back" @click="$router.go(-1)"></q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'ArticleLayout',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  created () {}
}
</script>

<style lang="stylus">
</style>
