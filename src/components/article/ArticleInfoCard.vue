<template>
  <q-card color="white" text-color="tertiary">
    <q-card-title>
      <router-link :to="'/articles/' + article.id">
        {{ article.title }}
        <q-chip v-if="article.top" dense square pointing="left" color="red">
          置顶
        </q-chip>
      </router-link>
      <p slot="subtitle">
        {{ article.category.name }}
      </p>
    </q-card-title>
    <q-card-main>
      <p class="text-faded">{{ article.summary }}</p>
    </q-card-main>
    <q-card-separator />
    <q-card-actions>
      <q-btn flat :label="'阅读量：' + article.traffic" />
      <q-btn flat :label="'创建时间：' + formatDate" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'ArticleInfoCard',
  props: {
    article: {
      type: Object
    }
  },
  data () {
    return {
      stars: 3
    }
  },
  computed: {
    formatDate: function () {
      return date.formatDate(new Date(this.article.created), 'YYYY-MM-DD')
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
</style>
