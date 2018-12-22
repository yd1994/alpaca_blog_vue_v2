<template>
  <q-page :padding="true">
    <q-pull-to-refresh :handler="reLoadArticle" :inline="false" :distance="12"
                       pull-message="下拉刷新" release-message="释放更新" refresh-message="正在加载...">
      <div class="q-headline">{{ title }}</div>
      <hr class="q-hr q-my-lg">
      <q-infinite-scroll :handler="loadMoreArticle" ref="infiniteScroll">
        <div v-for="article in articleList" :key="article.id" class="q-pa-md">
          <article-info-card :article="article"></article-info-card>
        </div>
        <div slot="message" :style="{textAlign: 'center'}">
          <q-spinner-dots :size="40"/>
        </div>
        <p v-if="notMore" :style="{textAlign: 'center'}"><small>没有更多内容了</small></p>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn color="primary" fab v-back-to-top.animate="{offset: 200, duration: 500}" class="animate-pop">
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<style lang="stylus">
  @import '~variables'
  .spinner-dots
    margin 0 auto
  .not-more-content
    text-align center
    font-size small
    color $faded
</style>

<script>
import ArticleInfoCard from '../../components/article/ArticleInfoCard'
export default {
  name: 'PageIndex',
  components: { ArticleInfoCard },
  props: {
    categoryId: {
      type: String
    }
  },
  data () {
    return {
      title: '最新文章',
      articleList: [],
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      notMore: false,
      category: {}
    }
  },
  computed: {
  },
  methods: {
    loadArticle: function (done) {
      let params = {
        page: this.pageInfo.page,
        size: this.pageInfo.size,
        sortByDescs: 'top,created'
      }
      if (this.categoryId !== undefined) {
        this.$apiService.categoriesArticles.list(this.categoryId, params, data => {
          this.setArticle(data, done)
        })
      } else {
        this.$apiService.articles.list(params, data => {
          this.setArticle(data, done)
        })
      }
    },
    reLoadArticle: function (done) {
      this.pageInfo.page = 1
      this.notMore = false
      this.articleList.splice(0, this.articleList.length)
      this.$refs.infiniteScroll.resume()
      this.loadArticle(done)
    },
    loadMoreArticle: function (index, done) {
      setTimeout(() => {
        this.loadArticle(done)
      }, 1000)
    },
    setArticle: function (data, done) {
      if (data.data.length === 0) {
        if (typeof done === 'function') {
          done()
        }
        this.$refs.infiniteScroll.stop()
        this.notMore = true
        return
      }
      data.data.forEach(article => {
        this.articleList.push(article)
      })
      this.pageInfo.total = data.total
      this.pageInfo.page += 1
      if (typeof done === 'function') {
        done()
      }
    },
    init: function () {
      if (this.categoryId !== undefined) {
        this.loadCategory()
      } else {
        this.title = '最新文章'
      }
      // this.loadArticle()
    },
    loadCategory: function () {
      this.$apiService.categories.get(this.categoryId, data => {
        this.category = data
        this.title = this.category.name
      })
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  watch: {
    categoryId: function () {
      this.init()
      this.reLoadArticle()
    }
  }
}
</script>
