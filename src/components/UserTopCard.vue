<template>
  <div class="col-3">
    <router-link :to="`/users/${user.id}`">
      <img
        :src="user.image | emptyImage('300')"
        width="140px"
        height="140px"
      >
    </router-link>
    <h2>{{user.name}}</h2>
    <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        type="button"
        class="btn btn-danger"
        @click="deleteFollowing(user.id)"
      >
        取消追蹤
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click="addFollowing(user.id)"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    toggleFollow(action) {
      this.user.isFollowed = !this.user.isFollowed

      if (action === 'add') { this.user.FollowerCount += 1 }
      if (action === 'delete') { this.user.FollowerCount -= 1 }
      
      this.$parent.users.sort((a, b) => b.FollowerCount - a.FollowerCount)
    },
    async addFollowing(userId) {
      try {
        if (this.isLoading) return false
        this.isLoading = true

        this.toggleFollow('add')

        const { data } = await usersAPI.addFollowing(userId)
        if (data.status !== 'success') throw 'serveError'
        this.isLoading = false
      
      } catch(err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollowing(userId) {
      try {
        if (this.isLoading) return false
        this.isLoading = true

        this.toggleFollow('delete')

        const { data } = await usersAPI.deleteFollowing(userId)
        if (data.status !== 'success') throw 'serveError'
        this.isLoading = false

      } catch(err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
      }
    }
  }
}
</script>