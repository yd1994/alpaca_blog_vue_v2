<template>
  <q-page :padding="true">
    <div class="row items-end q-mb-md">
      <q-search no-icon color="secondary" v-model="searchInfo.content" placeholder="搜索"/>
      <q-btn icon="search" color="primary" size="md" push @click="clickSearch" />
    </div>
    <q-btn-group class="q-mb-md" push>
      <q-btn label="添加" icon="map" color="green" push @click="clickAddArticleTag"/>
      <q-btn label="刷新" icon="map" color="warning" push @click="clickRefresh"/>
    </q-btn-group>
    <q-table
      title="标签管理"
      :data="articleTagList"
      :columns="columns"
      :selected.sync="selected"
      :pagination.sync="serverPagination"
      :visible-columns="visibleColumns"
      selection="single"
      row-key="id"
      @request="request"
    >
      <template slot="top-selection" slot-scope="props">
        <div class="col" />
        <q-btn-group push>
          <q-btn label="修改" color="warning" :icon="$q.screen.lt.md ? '' : 'edit'" push @click="clickUpdateArticleTag"/>
          <q-btn label="删除" color="negative" :icon="$q.screen.lt.md ? '' : 'delete'" push @click="clickDeleteArticleTag"/>
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
          <q-td key="name" :props="props"><q-btn :label="props.row.name" flat/></q-td>
          <q-td key="created" :props="props">{{ formatDate(props.row.created) }}</q-td>
          <q-td key="modified" :props="props">{{ formatDate(props.row.modified) }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" style="word-wrap:break-word; word-break:break-all;">
            <p>标签描述：{{ props.row.description }}</p>
            <div v-show="showMoreExpand">
              <p>创建时间：{{ formatDate(props.row.created) }}</p>
              <p>最后修改时间：{{ formatDate(props.row.modified) }}</p>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <article-tag-model ref="articleTagModel" @success="reLoadArticleTagList"></article-tag-model>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import ArticleTagModel from '../../../components/admin/management/ArticleTagModel'
export default {
  name: 'ArticleTagManagement',
  components: { ArticleTagModel },
  data () {
    return {
      articleTagList: [],
      columns: [
        { name: 'id', label: 'id', field: 'id', align: 'left' },
        { name: 'name', label: '名称', field: 'name', align: 'left' },
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
      selected: [],
      searchInfo: {
        content: ''
      }
    }
  },
  computed: {
    showMoreExpand: function () {
      return this.$q.screen.lt.md
    },
    visibleColumns: function () {
      if (this.$q.screen.lt.md) {
        return ['id', 'name']
      }
      return ['id', 'name', 'created', 'modified']
    }
  },
  methods: {
    clickSearch: function () {
      this.reLoadArticleTagList()
    },
    clickRefresh: function () {
      this.loadArticleTagList(this.serverPagination)
    },
    clickAddArticleTag: function () {
      this.$refs.articleTagModel.show()
    },
    clickUpdateArticleTag: function () {
      let selectRow = this.selected[0]
      this.$refs.articleTagModel.show(selectRow)
    },
    clickDeleteArticleTag: function () {
      let selectRow = this.selected[0]
      this.$q.dialog(
        { title: '确认删除？', message: `确认删除 [${selectRow.name}]？`, ok: true, cancel: true }
      ).then(() => {
        this.$apiService.articleTags.delete(selectRow.id, () => {
          this.reLoadArticleTagList()
        })
      })
    },
    request: function ({ pagination, filter }) {
      this.selected = []
      this.loadArticleTagList(pagination)
    },
    reLoadArticleTagList: function () {
      this.serverPagination.descending = true
      this.serverPagination.page = 1
      this.serverPagination.sortBy = 'created'
      this.loadArticleTagList(this.serverPagination)
    },
    loadArticleTagList: function (pagination) {
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
      if (this.searchInfo.content !== '' && this.searchInfo.content !== null) {
        params.view = this.searchInfo.content
      }
      this.$apiService.articleTags.list(params, data => {
        this.articleTagList = data.data
        this.serverPagination = pagination
        this.serverPagination.rowsNumber = data.total
      })
    },
    formatDate: function (dateTimeStr) {
      return date.formatDate(new Date(dateTimeStr), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.loadArticleTagList(this.serverPagination)
  }
}
</script>

<style lang="stylus">
</style>
