<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row" class="align-middle">{{restaurant.id}}</th>
        <td class="align-middle">{{restaurant.Category && restaurant.Category.name}}</td>
        <td class="align-middle">{{restaurant.name}}</td>
        <td class="d-flex justify-content-between">
          <router-link class="btn btn-link"
            :to="`/admin/restaurants/${restaurant.id}`"
            >
            Show
          </router-link>
          <router-link class="btn btn-link"
            :to="`/admin/restaurants/${restaurant.id}/edit`"
            >
            Edit
          </router-link>
          <button href="#"
            class="btn btn-link"
            @click="deleteRestaurant(restaurant.id)"
            >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  data() {
    return {
      restaurants: [],
      isProcessing: false
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data, statusText } = await adminAPI.restaurants.get()
        if (statusText !== 'OK') throw 'serverError'
        this.restaurants = data.restaurants

      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳，請稍後再試'
        })
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        if (this.isProcessing) return false

        // API request
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.delete(restaurantId)
        if (data.status !== 'success') throw 'serverError'

        // change Vue data
        this.restaurants = this.restaurants.filter(
          rest => rest.id !== restaurantId
        )
        this.isProcessing = false

        // sent msg to client
        Toast.fire('刪除成功', '', 'success')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳，請稍後再試'
        })
      }
    }
  }
}
</script>