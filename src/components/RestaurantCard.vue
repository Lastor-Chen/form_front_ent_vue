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
        >
          移除最愛
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.prevent="addFavorite(restaurant.id)"
        >
          加到最愛
        </button>
        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-2"
          @click.prevent="deleteLike(restaurant.id)"
        >
          Unlike
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary like mr-2"
          @click.prevent="addLike(restaurant.id)"
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
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法加入最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取消最愛，請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法加入喜歡，請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      try {
        const { data } = await usersAPI.deleteLike(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取消喜歡，請稍後再試'
        })
      }
    }
  }
}
</script>