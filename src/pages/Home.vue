<template>
  <q-page :padding="true">
    <q-jumbotron>
      <div class="q-display-3" @click="clickTitle">{{ $store.state.info.siteName.value }}</div>
      <div class="q-subheading">
        {{ $store.state.info.siteDescription.value }}
      </div>
      <hr class="q-hr q-my-lg">
      <div class="q-title q-mb-md">全新的版本正在开发中，点击按钮开始查阅。</div>
      <q-btn color="primary" class="q-py-sm q-px-xl" label="开始查阅" to="/index" push />
    </q-jumbotron>
  </q-page>
</template>

<style lang="stylus">
</style>

<script>
import { Notify } from 'quasar'
export default {
  name: 'PageHome',
  data () {
    return {
      clickMeMsg: [
        {
          msg: '有什么需要吗？',
          type: 'positive',
          time: 3000
        },
        {
          msg: '怎么了？',
          type: 'positive',
          time: 3000
        },
        {
          msg: '？？？',
          type: 'info',
          time: 3000
        },
        {
          msg: '你点我干嘛？',
          type: 'warning',
          time: 3000
        },
        {
          msg: '好烦啊你。',
          type: 'info',
          time: 3000
        },
        {
          msg: '在点一个试试！',
          type: 'warning',
          time: 3000
        },
        {
          msg: '继续啊！',
          type: 'negative',
          time: 4000
        },
        {
          msg: '别停下！',
          type: 'negative',
          time: 4000
        },
        {
          msg: '继续！',
          type: 'negative',
          time: 4000
        },
        {
          msg: '真乖！',
          type: 'positive',
          time: 5000
        }
      ],
      clickMeCount: 0
    }
  },
  methods: {
    clickBeginBtn: function () {
      this.$router.push({path: '/index'})
    },
    clickTitle: function () {
      let index = 0
      if (this.clickMeCount < this.clickMeMsg.length) {
        index = this.clickMeCount++
      } else {
        index = this.clickMeMsg.length - 1
      }
      Notify.create({
        message: this.clickMeMsg[index].msg,
        type: this.clickMeMsg[index].type,
        timeout: this.clickMeMsg[index].time,
        position: 'right'
      })
    }
  }
}
</script>
