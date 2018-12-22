<template>
  <q-page :padding="true">
    <q-card flat>
      <q-card-title>
        概要
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <p>共有文章：{{ articleTotal }}</p>
      </q-card-main>
      <q-card-actions>
        <q-btn color="indigo" label="撰写新博文" push to="/admin/write/article" />
        <q-btn color="teal" label="博文管理" push to="/admin/management/article" />
        <q-btn color="faded" label="系统设置" push to="/admin/option/general" />
      </q-card-actions>
    </q-card>
    <div class="row q-mt-md">
      <div class="col-md-6 col-xs-12 q-pa-sm">
        <q-card>
          <q-card-title>
            最新
          </q-card-title>
          <q-card-main>
            <q-list highlight class="no-border" separator>
              <q-item v-for="article in newArticleList" :key="article.id" :to="'/articles/' + article.id">
                <q-item-main :label="article.title" />
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-md-6 col-xs-12 q-pa-sm">
        <q-card>
          <q-card-title>
            热门
          </q-card-title>
          <q-card-main>
            <q-list highlight class="no-border" separator>
              <q-item v-for="article in hostArticleList" :key="article.id" :to="'/articles/' + article.id">
                <q-item-main :label="article.title" />
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AdminIndex',
  data () {
    return {
      newArticleList: [],
      hostArticleList: [],
      articleTotal: 0
    }
  },
  methods: {
    loadNewArticle: function () {
      let params = {
        page: 1,
        size: 10,
        sortByDescs: 'created'
      }
      this.$apiService.articles.list(params, data => {
        this.newArticleList = data.data
        this.articleTotal = data.total
      })
    },
    loadHostArticle: function () {
      let params = {
        page: 1,
        size: 10,
        sortByDescs: 'traffic'
      }
      this.$apiService.articles.list(params, data => {
        this.hostArticleList = data.data
      })
    }
  },
  created () {
    this.loadNewArticle()
    this.loadHostArticle()
  }
}
</script>

<style lang="stylus">

</style>
