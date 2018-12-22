<template>
  <q-card class="q-my-md">
    <q-card-title>
      {{ article.title }}
      <p slot="subtitle">{{ article.category.name }}</p>
    </q-card-title>
    <q-card-main>
      {{ '创建时间：' + formatDate }}
    </q-card-main>
    <q-card-actions>
      <q-btn flat label="修改" icon="map" color="green" />
      <q-btn flat label="删除" icon="map" color="green" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'ArticleManagementCard',
  props: {
    article: {
      type: Object
    }
  },
  computed: {
    formatDate: function () {
      return date.formatDate(new Date(this.article.created), 'YYYY-MM-DD')
    }
  }
}
</script>

<style lang="stylus">
</style>
