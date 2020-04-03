<template>
  <div class="container py-5">
    <NavTabs />
    <!-- content -->
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">美食達人</h1>
      <hr>
      <div class="row text-center">
        <!-- component -->
        <UserTopCard
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserTopCard from '../components/UserTopCard.vue'
import Spinner from '../components/Spinner.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  data () {
    return {
      users: [],
      isLoading: true
    }
  },
  components: {
    NavTabs,
    UserTopCard,
    Spinner
  },
  created () {
    this.fetchUsers() 
  },
  methods: {
    async fetchUsers() {
      try {
        const { data, statusText } = await usersAPI.getTopUsers()
        if (statusText !== 'OK') throw 'serverError'

        this.users = data.users
        this.isLoading = false

      } catch(err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，請稍後再試'
        })
      }
    }
  }
}
</script>