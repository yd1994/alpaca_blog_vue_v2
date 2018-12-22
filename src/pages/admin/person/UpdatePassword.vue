<template>
  <q-page :padding="true">
    <q-card :style="{maxWidth: '600px', margin: '32px auto'}">
      <q-card-title>
        修改密码
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-input v-model="oldPassword" type="password" float-label="原密码" placeholder="输入原来的密码"
                 @blur="$v.oldPassword.$touch" :error="$v.oldPassword.$error" />
        <q-input v-model="newPassword" type="password" float-label="新密码" placeholder="输入新的密码"
                 @blur="$v.newPassword.$touch" :error="$v.newPassword.$error" />
        <q-input v-model="confirmPassword" type="password" float-label="确认密码" placeholder="再次输入新的密码"
                 @blur="$v.confirmPassword.$touch" :error="$v.confirmPassword.$error" />
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn label="确认修改" class="full-width" color="primary" @click="changePassword" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'UpdatePassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  validations: {
    oldPassword: { required, minLength: minLength(6) },
    newPassword: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs('newPassword') }
  },
  methods: {
    changePassword: function () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$q.notify({
          message: '输入有误，请检查后重试。',
          position: 'top'
        })
        return
      }
      let params = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }
      this.$apiService.users.changePassword(params, () => {
        this.$router.push({ path: '/admin/login' })
      }, () => {})
    }
  }
}
</script>

<style lang="stylus">

</style>
