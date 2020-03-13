<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent="handelSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          v-focus
        >
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
          autocomplete="new-password"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
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
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization.js'
import { Toast } from '../utils/helpers.js'

export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handelSubmit (e) {
      try {
        this.isProcessing = true

        // check required
        const input = { ...this.$data }
        delete input.isProcessing

        for (const key in input) {
          input[key] = input[key].trim()
          if (!input[key]) throw `請填寫 ${key}`
        }
        
        // check password
        if (input.password !== input.passwordCheck) throw 'password check 不一致'

        const { data } = await authorizationAPI.signUp(input)
        if (data.status !== 'success') throw data.message

        this.$router.push({ name: 'sign-in', params: { from: 'signUp' } })

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err
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