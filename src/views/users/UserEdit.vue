<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text"
            id="name"
            v-model="user.name"
            name="name"
            class="form-control"
            placeholder="Enter name"
            required
          >
        </div>

        <div class="form-group">
          <label for="image">Image</label>
          <img
            v-if="user.image"
            :src="user.image"
            class="d-block img-thumbnail mb-3"
            width="200" height="200"
          >
          <input type="file"
            id="image"
            name="image"
            class="form-control-file"
            accept="image/*"
            @change="handleFileChange"
          >
        </div>

        <button type="submit"
            class="btn btn-primary"
            :disabled="isProcessing"
          >
          Submit
        </button>
        <button type="button"
            class="btn btn-primary ml-3"
            @click="$router.back()"
          >
          回上頁
        </button>
      </form>
    </template>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import usersAPI from '../../apis/users.js'
import { Toast } from '@/utils/helpers.js'
import { mapState } from 'vuex'

export default {
  components: {
    Spinner
  },
  data() {
    return {
      user: {},
      isLoading: true,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const id = +this.$route.params.id
    this.checkUser(id)  // 阻擋非本人進入
    this.fetchUser(id)
  },
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true
    const id = to.params.id

    this.checkUser(id)  // 阻擋非本人進入
    this.fetchUser(id)
    next()
  },
  methods: {
    checkUser(userId) {
      if (this.currentUser.id === (+userId)) return

      this.$session.flash.set('editResult', {
        icon: 'warning',
        title: '沒有操作權限'
      })
      this.$router.push(`/users/${userId}`)
    },
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getOne(userId)

        const user = data.profile
        this.user = {
          id: userId,
          name: user.name,
          image: user.image
        }
        this.isLoading = false

      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者，請稍後再試'
        })
      }
    },
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return false

      const image = window.URL.createObjectURL(files[0])
      this.user.image = image
    },
    async handleSubmit(e) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const form = e.target
        const formData = new FormData(form)
        const userId = this.user.id

        // API request
        const { data } = await usersAPI.update(userId, formData)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vuex data
        this.$store.commit('updateUser', {
          name: this.user.name,
          image: this.user.image
        })
        this.isProcessing = false

        // 跳轉頁面
        this.$session.flash.set('editResult', {
          icon: 'success',
          title: '成功更新使用者資料'
        })
        this.$router.push(`/users/${userId}`)

      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法更新使用者資料，請稍後再試'
        })
      }
    }
  }
}
</script>