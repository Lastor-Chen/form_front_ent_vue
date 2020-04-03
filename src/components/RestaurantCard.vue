<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <router-link
        :to="{ name: 'restaurant', params: { id: restaurant.id } }"
        class="link-img"
      >
        <img
          class="card-img-top"
          :src="restaurant.image"
          alt="Card image cap"
          width="286px"
          height="180px"
        >
      </router-link>
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{restaurant.name}}
          </router-link>
        </p>
        <span class="badge badge-secondary">
          {{restaurant.Category && restaurant.Category.name}}
        </span>
        <p class="card-text text-truncate">
          {{restaurant.description}}
        </p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          @click.prevent="deleteFavorite(restaurant.id)"
          :disabled="isProcessing"
        >
          移除最愛
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.prevent="addFavorite(restaurant.id)"
          :disabled="isProcessing"
        >
          加到最愛
        </button>
        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-2"
          @click.prevent="deleteLike(restaurant.id)"
          :disabled="isProcessing"
        >
          Unlike
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary like mr-2"
          @click.prevent="addLike(restaurant.id)"
          :disabled="isProcessing"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-img {
  width: 100%;
  height: 180px
}
</style>

<script>
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const { data } = await usersAPI.addFavorite(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant.isFavorited = true
        this.isProcessing = false
        Toast.fire('成功加入最愛', '', 'success')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法加入最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const { data } = await usersAPI.deleteFavorite(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant.isFavorited = false
        this.isProcessing = false
        Toast.fire('成功移除最愛', '', 'success')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取消最愛，請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const { data } = await usersAPI.addLike(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant.isLiked = true
        this.isProcessing = false
        Toast.fire('成功加入喜歡', '', 'success')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法加入喜歡，請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const { data } = await usersAPI.deleteLike(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant.isLiked = false
        this.isProcessing = false
        Toast.fire('成功取消喜歡', '', 'success')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法取消喜歡，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}
.card-img-top {
  background-color: #EFEFEF;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>