<template>
  <q-page :padding="true">
    <q-card flat class="q-mb-md">
      <q-card-title>
        撰写文章
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-input v-model="article.title" type="text" float-label="标题" placeholder="输入文章标题" />
        <q-input v-model="article.summary" type="textarea" rows="3" float-label="简介" placeholder="主页面显示内容"/>
        <q-toggle v-model="article.top" label="置顶" left-label class="q-mt-md" />
        <q-select v-model="article.category" :options="categorySelect"
                  radio toggle no-icon float-label="分类" placeholder="选择所属分类" class="q-mt-md"/>
        <q-select v-model="article.articleTags" :options="articleTagSelect"
                  multiple no-icon float-label="标签" placeholder="选择标签" class="q-mt-md"/>
      </q-card-main>
    </q-card>
    <mavon-editor ref="mavonEditor" v-model="article.content" :toolbars="toolbars" :subfield="!$q.screen.lt.md"
                  @imgAdd="imgAdd" @save="clickSaveBtn"/>
    <q-btn color="secondary" label="保存" class="full-width q-mt-md" push @click="clickSaveBtn" ></q-btn>
  </q-page>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
export default {
  name: 'WriteArticle',
  components: { mavonEditor },
  props: {
    articleId: {
      type: String
    }
  },
  data () {
    return {
      article: {
        title: '',
        summary: '',
        top: false,
        content: '',
        version: 0,
        category: '',
        articleTags: []
      },
      categorySelect: [],
      articleTagSelect: []
    }
  },
  computed: {
    toolbars: function () {
      if (this.$q.screen.lt.md) {
        return {
          bold: true,
          italic: true,
          header: true,
          underline: true,
          strikethrough: true,
          mark: true,
          quote: true,
          ol: true,
          ul: true,
          imagelink: true,
          code: true,
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          preview: true // 预览
        }
      }
      return {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        // fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    imgAdd: function (pos, $file) {
      this.$apiService.images.add($file, location => {
        let baseUri = this.$store.state.info.siteAddress.value
        this.$refs.mavonEditor.$img2Url(pos, `${baseUri}/api1/${location}`)
      })
    },
    clickSaveBtn: function () {
      if (this.articleId === undefined) {
        this.saveArticle()
      } else {
        this.updateArticle()
      }
    },
    loadArticleTagSelect: function () {
      let params = {
        page: 1,
        size: 30,
        sortByDescs: 'created'
      }
      this.$apiService.articleTags.list(params, data => {
        let articleTagSelect = []
        data.data.forEach(articleTag => {
          articleTagSelect.push({ label: articleTag.name, value: articleTag.id })
        })
        this.articleTagSelect = articleTagSelect
      })
    },
    loadCategorySelect: function () {
      let params = {
        page: 1,
        size: 30,
        sortByDescs: 'created'
      }
      this.$apiService.categories.list(params, data => {
        let categorySelect = []
        data.data.forEach(articleTag => {
          categorySelect.push({ label: articleTag.name, value: articleTag.id })
        })
        this.categorySelect = categorySelect
      })
    },
    saveArticle: function () {
      let articleParans = {
        title: this.article.title,
        summary: this.article.summary,
        top: this.article.top,
        content: this.article.content
      }
      if (this.article.category !== '') {
        articleParans['category.id'] = this.article.category
      }
      if (this.article.articleTags.length > 0) {
        this.article.articleTags.forEach((articleTagId, index) => {
          articleParans[`articleTagSet[${index}].id`] = articleTagId
        })
      }
      this.$apiService.articles.add(articleParans, () => {
        this.$router.push({path: '/admin/management/article'})
      }, () => {})
    },
    updateArticle: function () {
      let articleParans = {
        id: this.articleId,
        title: this.article.title,
        summary: this.article.summary,
        top: this.article.top,
        content: this.article.content,
        version: this.article.version
      }
      if (this.article.category !== '') {
        articleParans['category.id'] = this.article.category
      }
      if (this.article.articleTags.length > 0) {
        this.article.articleTags.forEach((articleTagId, index) => {
          articleParans[`articleTagSet[${index}].id`] = articleTagId
        })
      }
      this.$apiService.articles.update(articleParans, () => {
        this.$router.push({path: '/admin/management/article'})
      }, () => {})
    },
    loadArticle: function () {
      this.$apiService.articles.get(this.articleId, data => {
        this.article.title = data.title
        this.article.summary = data.summary
        this.article.top = data.top
        this.article.content = data.content
        this.article.version = data.version
        this.article.category = data.category.id
        let articleTags = []
        data.articleTagSet.forEach(articleTag => {
          articleTags.push(articleTag.id)
        })
        this.article.articleTags = articleTags
      })
    }
  },
  created () {
    this.loadArticleTagSelect()
    this.loadCategorySelect()
    if (this.articleId !== undefined) {
      this.loadArticle()
    }
  }
}
</script>

<style lang="stylus">

</style>
