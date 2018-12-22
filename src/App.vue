<template>
  <div id="q-app">
    <router-view />
    <q-ajax-bar size="2px" color="green" delay="0" />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    init: function () {
      this.$utils.systemInfo.init(this.$store)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus">
  a
    text-decoration none
    color #2a5caa
</style>
