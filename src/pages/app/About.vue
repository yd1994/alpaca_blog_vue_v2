<template>
  <q-page :padding="true">
    <q-card>
      <q-card-title>
        博主信息
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <p>昵称：{{ $store.state.info.personalName.value }}</p>
        <p>邮箱：{{ $store.state.info.personalEmail.value }}</p>
        <p>github：{{ $store.state.info.personalGithub.value }}</p>
        <p>简介：{{ $store.state.info.personalSummary.value }}</p>
      </q-card-main>
    </q-card>
    <q-stepper ref="stepper" vertical class="q-mt-md">
      <q-step default title="1.简介" subtitle="什么是 ALPACA BLOG">
        ALPACA BLOG是个人博客系统，包含前端与后端。
      </q-step>

      <q-step title="2.前端介绍" subtitle="vue + quasar">
        前端是适应vue + quasar框架实现的多平台应用，既可以自适应PC浏览器与手机浏览器，也支持打包成Android与ios应用。
      </q-step>

      <q-step title="3.后端介绍" subtitle="java + Spring">
        <p>后端系统包含三个服务：registry、auth-service、blog-service。</p>
        <p>registry：Spring Cloud Eureka注册中心服务。</p>
        <p>auth-service：Spring Cloud Security Oauth授权服务。</p>
        <p>blog-service：集成SpringBoot web、Mybatis plus、redis缓存、feign一体的博客系统。并规范使用restful风格api。</p>
      </q-step>

      <q-step title="4.github地址" subtitle="前端 + 后端">
        <a href="https://github.com/yd1994/alpaca_blog_vue_v2">前端</a>-<a href="https://github.com/yd1994/alpaca_blog_v2">后端</a>
      </q-step>

      <q-stepper-navigation>
        <q-btn flat @click="$refs.stepper.previous()" label="上一步" class="q-ml-md" />
        <q-btn @click="$refs.stepper.next()" label="下一步" />
      </q-stepper-navigation>
    </q-stepper>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'about',
  methods: {
    openURL
  }
}
</script>

<style lang="stylus">
</style>
