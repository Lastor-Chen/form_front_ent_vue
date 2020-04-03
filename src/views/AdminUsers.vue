<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="180">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users"
          :key="user.id"
        >
          <th>{{user.id}}</th>
          <td>{{user.email}}</td>
          <td>
            {{user.isAdmin ? 'admin' : 'user'}}
          </td>
          <td>
            <button class="btn btn-link"
                v-if="currentUser.id !== user.id"
                @click="toggleAdmin(index)"
                :disabled="isProcessing"
              >
              {{user.isAdmin ? 'set as user' : 'set as admin'}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      users: [],
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await adminAPI.users.get()

        this.users = data.users
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    async toggleAdmin(index) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true
        
        const user = this.users[index]

        // API request (axios can't pass Boolean)
        const newIsAdmin = (!user.isAdmin).toString()
        const { data } = await adminAPI.users.update(user.id, newIsAdmin)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        user.isAdmin = !user.isAdmin
        Toast.fire('成功修改用戶資料', '', 'success')
        this.isProcessing = false

      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法修改用戶資料，請稍後再試'
        })
      }
    }
  }
}
</script>