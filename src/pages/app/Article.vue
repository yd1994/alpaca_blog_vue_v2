<template>
  <q-page :padding="true">
    <div class="q-mt-md non-selectable">
      <small>
        <q-breadcrumbs color="light">
          <q-breadcrumbs-el label="首页" to="/index" />
          <q-breadcrumbs-el :label="category.name" :to="`/categories/${category.id}/articles`"/>
          <q-breadcrumbs-el :label="article.title" :to="'/articles/' + articleId" />
        </q-breadcrumbs>
      </small>
      <q-card class="q-my-md q-pa-md">
        <q-card-title>
          {{ article.title }}
          <span slot="subtitle">{{ article.traffic }} ・ {{ createdTime }}</span>
        </q-card-title>
        <q-card-main>{{ article.summary }}</q-card-main>
        <q-card-actions>
          <q-btn v-for="tag in article.articleTagSet" :key="tag.id" color="secondary" size="xs" :label="tag.name" />
        </q-card-actions>
      </q-card>
      <mavon-editor v-model="article.content"
                    :toolbarsFlag="false" :editable="false" :subfield="false" defaultOpen="preview"/>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 2000">
      <q-btn color="primary" fab v-back-to-top.animate="{offset: 200, duration: 500}" class="animate-pop">
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ArticleInfoCard from '../../components/article/ArticleInfoCard'
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
import { date } from 'quasar'
export default {
  name: 'Article',
  components: { mavonEditor, ArticleInfoCard },
  props: {
    articleId: {
      type: String
    }
  },
  data () {
    return {
      article: {},
      category: {}
    }
  },
  computed: {
    createdTime: function () {
      return date.formatDate(new Date(this.article.created), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    loadArticle: function () {
      this.$apiService.articles.get(this.articleId, data => {
        this.article = data
        this.category = data.category
      })
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style lang="stylus">
</style>
