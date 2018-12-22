<template>
  <q-modal v-model="openedModal" minimized no-backdrop-dismiss >
    <div class="q-pa-lg">
      <div class="q-headline q-mb-md">{{ tipsInfo.title }}</div>
      <q-input v-model="articleTag.name" float-label="标签名称" placeholder="输入标签名称" />
      <q-input v-model="articleTag.description" type="textarea" float-label="标签描述" placeholder="输入标签详细描述" :max-height="50" rows="2" />
      <div class="row q-mt-md">
        <q-btn color="green" @click="openedModal = false" label="取消" />
        <div class="col" />
        <q-btn color="primary" @click="clickOK" :label="tipsInfo.ok" />
      </div>
    </div>
  </q-modal>
</template>

<script>
const info = {
  add: {
    title: '添加标签',
    ok: '添加'
  },
  update: {
    title: '修改标签',
    ok: '修改'
  }
}
export default {
  name: 'articleTagModel',
  data () {
    return {
      openedModal: false,
      articleTag: {},
      add: false,
      tipsInfo: info.update
    }
  },
  methods: {
    show: function (articleTag) {
      if (articleTag !== undefined) {
        this.articleTag = articleTag
        this.add = false
        this.tipsInfo = info.update
      } else {
        this.articleTag = {}
        this.add = true
        this.tipsInfo = info.add
      }
      this.openedModal = true
    },
    clickOK: function () {
      if (this.add) {
        let parans = {
          name: this.articleTag.name,
          description: this.articleTag.description
        }
        this.$apiService.articleTags.add(parans, () => {
          this.openedModal = false
          this.$emit('success')
        }, () => {})
      } else {
        let parans = {
          id: this.articleTag.id,
          name: this.articleTag.name,
          description: this.articleTag.description
        }
        this.$apiService.articleTags.update(parans, () => {
          this.openedModal = false
          this.$emit('success')
        }, () => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
