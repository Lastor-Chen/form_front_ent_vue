<template>
   <div class="container py-5">
    <form class="w-100" @submit.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
          v-focus
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        >
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI  from '../apis/authorization.js'
import { Toast } from '../utils/helpers.js'

export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  created() {
    const from = this.$route.params.from
    if (from === 'signUp') {
      Toast.fire('成功註冊!', '', 'success')
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        if (!this.email || !this.password) {
          throw { msg: '請輸入 Email 與 Password' }
        }

        this.isProcessing = true
        const { data } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        // 處理 user data
        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)

        this.$router.push('/restaurants')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: err.msg || 'Email 或 Password 錯誤'
        })
      }
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
}
</script>