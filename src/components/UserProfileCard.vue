<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="user.image | emptyImage('300')"
          width="300px"
          height="300px"
        >
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>
          <ul class="list-unstyled list-inline">
            <li><strong>{{user.commentsCount}}</strong> 已評論餐廳</li>
            <li><strong>{{user.favRestaurantsCount}}</strong> 收藏的餐廳</li>
            <li><strong>{{user.followingsCount}}</strong> followings (追蹤者)</li>
            <li><strong>{{user.followersCount}}</strong> followers (追隨者)</li>
          </ul>
          <!-- button group -->
          <router-link class="btn btn-primary"
            v-if="isCurrentUser"
            :to="`/users/${user.id}/edit`"
          >
            edit
          </router-link>
          <button class="btn btn-danger"
            v-else-if="isFollowed"
            @click="deleteFollowing(user.id)"
            :disabled="isProcessing"
          >
            取消追蹤
          </button>
          <button class="btn btn-primary"
            v-else
            @click="addFollowing(user.id)"
            :disabled="isProcessing"
          >
            追蹤
          </button>
        </div>
      </div>
    </div>
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
    },
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isFollowed: this.initialIsFollowed,
      isProcessing: false
    }
  },
  watch: {
    initialIsFollowed(newVal) {
      return this.isFollowed = newVal
    }
  },
  methods: {
    async addFollowing(userId) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        // API request
        const { data } = await usersAPI.addFollowing(userId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.isFollowed = true
        this.isProcessing = false
        Toast.fire('成功加入追蹤', '', 'success')

      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollowing(userId) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        // API request
        const { data } = await usersAPI.deleteFollowing(userId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.isFollowed = false
        this.isProcessing = false
        Toast.fire('成功取消追蹤', '', 'success')

      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法取消追蹤，請稍後再試'
        })
      }
    }
  }
}
</script>