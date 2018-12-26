<template>
  <q-modal v-model="openedModal" minimized no-backdrop-dismiss >
    <div class="q-pa-lg">
      <div class="q-headline q-mb-md">{{ tipsInfo.title }}</div>
      <q-input v-model="category.name" float-label="分类名称" placeholder="输入分类名称"
               @blur="$v.category.name.$touch" :error="$v.category.name.$error" />
      <q-input v-model="category.description" type="textarea" float-label="分类描述" placeholder="输入分类详细描述" :max-height="50" rows="2"
               @blur="$v.category.description.$touch" :error="$v.category.description.$error" />
      <div class="row q-mt-md">
        <q-btn color="green" @click="openedModal = false" label="取消" />
        <div class="col" />
        <q-btn color="primary" @click="clickOK" :label="tipsInfo.ok" />
      </div>
    </div>
  </q-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
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
      category: {
        name: '',
        description: ''
      },
      add: false,
      tipsInfo: info.update
    }
  },
  validations: {
    category: {
      name: { required },
      description: { required }
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
      this.$v.$touch()
      if (this.$v.$error) {
        this.$q.notify({
          message: '输入有误，请检查后重试。',
          position: 'top'
        })
        return
      }
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
