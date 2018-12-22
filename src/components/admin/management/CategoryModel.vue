<template>
  <q-modal v-model="openedModal" minimized no-backdrop-dismiss >
    <div class="q-pa-lg">
      <div class="q-headline q-mb-md">{{ tipsInfo.title }}</div>
      <q-input v-model="category.name" float-label="分类名称" placeholder="输入分类名称" />
      <q-input v-model="category.description" type="textarea" float-label="分类描述" placeholder="输入分类详细描述" :max-height="50" rows="2" />
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
    title: '添加分类',
    ok: '添加'
  },
  update: {
    title: '修改分类',
    ok: '修改'
  }
}
export default {
  name: 'CateGoryModel',
  data () {
    return {
      openedModal: false,
      category: {},
      add: false,
      tipsInfo: info.update
    }
  },
  methods: {
    show: function (category) {
      if (category !== undefined) {
        this.category = category
        this.add = false
        this.tipsInfo = info.update
      } else {
        this.category = {}
        this.add = true
        this.tipsInfo = info.add
      }
      this.openedModal = true
    },
    clickOK: function () {
      if (this.add) {
        let parans = {
          name: this.category.name,
          description: this.category.description
        }
        this.$apiService.categories.add(parans, () => {
          this.$emit('success')
          this.openedModal = false
        }, () => {})
      } else {
        let parans = {
          id: this.category.id,
          name: this.category.name,
          description: this.category.description
        }
        this.$apiService.categories.update(parans, () => {
          this.$emit('success')
          this.openedModal = false
        }, () => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
