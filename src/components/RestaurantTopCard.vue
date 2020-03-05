<template>
  <div class="card mb-3 top-card">
    <div class="row no-gutters">
      <div class="col-md-4">
        <router-link :to="`/restaurants/${restaurant.id}`">
          <img
            class="card-img"
            :src="restaurant.image"
          >
        </router-link>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{restaurant.name}}
          </h5>
          <span class="badge badge-secondary">收藏數：{{restaurant.FavoriteCount}}</span>
          <p class="card-text">
            {{restaurant.description}}
          </p>
          <router-link
            :to="`/restaurants/${restaurant.id}`"
            class="btn btn-primary mr-2"
          >
            Show
          </router-link>

          <button
            v-if="restaurant.isFavorited"
            type="button"
            class="btn btn-danger mr-2"
            @click="deleteFavorite(restaurant.id)"
          >
            移除最愛
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="addFavorite(restaurant.id)"
          >
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .top-card {
    max-width: 540px;
    margin: auto;
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
  }
}
</script>