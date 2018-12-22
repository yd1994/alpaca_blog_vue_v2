<template>
  <q-page :padding="true">
    <q-card class="q-mb-md">
      <q-card-title>
        筛选
      </q-card-title>
      <q-card-main>
        <q-search no-icon color="secondary" v-model="articleSearchInfo.content" float-label="标题、简介、内容" placeholder="按标题、简介、内容筛选"/>
        <q-select v-model="articleSearchInfo.categoryId" :options="categorySelect" float-label="分类" placeholder="选择所属分类分类" />
        <q-datetime v-model="articleSearchInfo.startDate" type="date" float-label="开始时间" placeholder="博文创建时间"  />
        <q-datetime v-model="articleSearchInfo.endDate" type="date" float-label="结束时间" placeholder="博文创建时间" />
        <q-btn icon="search" color="primary" class="full-width q-mt-md" @click="reLoadArticleList" />
      </q-card-main>
    </q-card>
    <q-table
      title="博文管理"
      :data="articleList"
      :columns="columns"
      :visible-columns="visibleColumns"
      :pagination.sync="serverPagination"
      selection="single"
      :selected.sync="selected"
      row-key="id"
      @request="request"
    >
      <template slot="top-selection" slot-scope="props">
        <div class="col" />
        <q-btn-group >
          <q-btn label="查看" color="positive" :icon="$q.screen.lt.md ? '' : 'remove_red_eye'" @click="clickShowArticle"/>
          <q-btn label="修改" color="warning" :icon="$q.screen.lt.md ? '' : 'edit'" @click="clickUpdateArticle"/>
          <q-btn label="删除" color="negative" :icon="$q.screen.lt.md ? '' : 'delete'" @click="clickDeleteArticle"/>
        </q-btn-group>
      </template>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox color="primary" v-model="props.selected" />
            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-ml-md" />
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="title" :props="props"><q-btn :label="props.row.title" :to="'/articles/' + props.row.id" flat></q-btn></q-td>
          <q-td key="traffic" :props="props">{{ props.row.traffic }}</q-td>
          <q-td key="top" :props="props">{{ props.row.top ? '是' : '否' }}</q-td>
          <q-td key="created" :props="props">{{ formatDate(props.row.created) }}</q-td>
          <q-td key="modified" :props="props">{{ formatDate(props.row.modified) }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <p>简介：{{ props.row.summary }}</p>
            <div v-show="showMoreExpand">
              <p>点击量：{{ props.row.traffic }}</p>
              <p>置顶：{{ props.row.top ? '是' : '否' }}</p>
              <p>创建时间：{{ formatDate(props.row.created) }}</p>
              <p>最后修改时间：{{ formatDate(props.row.modified) }}</p>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'ArticleManagement',
  components: { },
  data () {
    return {
      articleList: [],
      categorySelect: [],
      articleTagSet: [],
      articleSearchInfo: {
        content: '',
        categoryId: 0,
        startDate: null,
        endDate: null
      },
      loading: false,
      columns: [
        { name: 'id', label: 'id', field: 'id', align: 'left' },
        { name: 'title', label: '标题', field: 'title', align: 'left' },
        { name: 'traffic', label: '点击量', field: 'traffic', align: 'left' },
        { name: 'top', label: '置顶', field: 'top', align: 'left' },
        { name: 'created', label: '创建时间', field: 'created', align: 'left', sortable: true },
        { name: 'modified', label: '最后修改时间', field: 'modified', align: 'left', sortable: true }
      ],
      serverPagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 28,
        sortBy: 'created'
      },
      selected: []
    }
  },
  computed: {
    showMoreExpand: function () {
      return this.$q.screen.lt.md
    },
    visibleColumns: function () {
      if (this.$q.screen.lt.md) {
        return ['id', 'title']
      }
      return ['id', 'title', 'traffic', 'top', 'created', 'modified']
    }
  },
  methods: {
    request: function ({ pagination, filter }) {
      this.selected = []
      this.loadArticleList(pagination)
    },
    reLoadArticleList: function () {
      this.serverPagination.page = 1
      this.loadArticleList(this.serverPagination)
    },
    loadArticleList: function (pagination) {
      // this.loading = true
      let params = {
        page: pagination.page,
        size: pagination.rowsPerPage !== 0 ? pagination.rowsPerPage : pagination.rowsNumber
      }
      if (pagination.sortBy !== null) {
        if (pagination.descending) {
          params.sortByDescs = pagination.sortBy
        } else {
          params.sortByAscs = pagination.sortBy
        }
      }
      if (this.articleSearchInfo.content !== '' && this.articleSearchInfo.content !== null) {
        params.view = this.articleSearchInfo.content
      }
      if (this.articleSearchInfo.categoryId > 0) {
        params.categoryId = this.articleSearchInfo.categoryId
      }
      if (this.articleSearchInfo.startDate != null) {
        params.afterBy = 'created'
        params.after = date.formatDate(date.startOfDate(this.articleSearchInfo.startDate, 'day'), 'YYYY-MM-DD HH:mm:ss')
      }
      if (this.articleSearchInfo.endDate != null) {
        params.beforeBy = 'created'
        params.before = date.formatDate(date.endOfDate(this.articleSearchInfo.endDate, 'day'), 'YYYY-MM-DD HH:mm:ss')
      }
      this.$apiService.articles.list(params, data => {
        this.articleList = data.data
        this.serverPagination = pagination
        this.serverPagination.rowsNumber = data.total
        // this.loading = false
      }, () => {
        // this.loading = false
      })
    },
    loadCategorySelect: function () {
      let params = {
        page: 1,
        size: 30,
        sortByDescs: 'created'
      }
      this.$apiService.categories.list(params, data => {
        let selectOptions = []
        selectOptions.push({label: '全部', value: 0})
        data.data.forEach(category => {
          selectOptions.push({
            label: category.name,
            value: category.id
          })
        })
        this.categorySelect = selectOptions
      })
    },
    clickShowArticle: function () {
      let selectRow = this.selected[0]
      this.$router.push({path: '/articles/' + selectRow.id.toString()})
    },
    clickUpdateArticle: function () {
      let selectRow = this.selected[0]
      this.$router.push({path: '/admin/write/article/' + selectRow.id.toString()})
    },
    clickDeleteArticle: function () {
      let selectRow = this.selected[0]
      this.$q.dialog({ title: '确认删除？', message: `确认删除 [${selectRow.title}]？`, ok: true, cancel: true })
        .then(() => {
        })
    },
    formatDate: function (dateTimeStr) {
      return date.formatDate(new Date(dateTimeStr), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  watch: {
  },
  created () {
    let newDate = new Date()
    this.articleSearchInfo.startDate = date.subtractFromDate(newDate, { hours: 24 * 30 * 12 })
    this.articleSearchInfo.endDate = newDate
    this.loadCategorySelect()
    this.loadArticleList(this.serverPagination)
  },
  mounted () {
  }
}
</script>

<style lang="stylus">

</style>
