<template>
  <q-page :padding="true">
    <q-card square style="max-width: 500px; margin: 64px auto">
      <q-card-title>
        登录
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-input v-model="user.username" type="text" float-label="账号" placeholder="请输入账号"
                 :before="[{icon: 'person_outline'}]" @blur="$v.user.username.$touch" :error="$v.user.username.$error" />
        <q-input v-model="user.password" type="password" float-label="密码" placeholder="请输入密码"
                 :before="[{icon: 'lock'}]" @blur="$v.user.password.$touch" :error="$v.user.password.$error" />
      </q-card-main>
      <q-card-actions>
        <q-btn color="primary" @click="clickSubmit" class="full-width q-mt-xs q-mb-md">登录</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'AdminLogin',
  data () {
    return {
      user: {
        username: 'tourist',
        password: '1234567'
      }
    }
  },
  validations: {
    user: {
      username: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    clickSubmit: function () {
      this.$v.user.$touch()
      if (this.$v.user.$error) {
        this.$q.notify({
          message: '输入有误，请检查后重试。',
          position: 'top'
        })
        return
      }
      let params = {
        username: this.user.username,
        password: this.user.password
      }
      this.$apiService.users.login(params, () => {
        this.$router.push({ path: '/admin' })
      }, err => {
        const status = err.response.status
        console.info(err.response)
        switch (status) {
          case 400:
            this.$q.notify({
              message: `账号或者密码错误!`,
              position: 'top'
            })
            break
          case 500:
            break
        }
      })
    }
  }
}
</script>

<style lang="stylus">

</style>
