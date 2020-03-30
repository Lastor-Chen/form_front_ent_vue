<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title mb-0">{{restaurant.name}}</h2>
        <h6 class="card-subtitle mb-2 py-3 border-bottom">[{{restaurant.categoryName}}]</h6>
        <ul>
          <li>評論數： {{restaurant.commentCounts}}</li>
          <li>瀏覽次數：{{restaurant.viewCounts}}</li>
          <li>收藏數：{{restaurant.favoriteCounts}}</li>
        </ul>
        <router-link
          :to="`/restaurants/${restaurant.id}`"
          class="card-link"
        >
          回上一頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'

export default {
  data () {
    return {
      restaurant: {
        id: 0,
        name: '',
        categoryName: '',
        commentCounts: 0,
        viewCounts: 0,
        favoriteCounts: 0
      }
    }
  },
  created () {
    const restaurantId = this.$route.params.id
    this.fetchDashboard(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    const restaurantId = to.params.id
    this.fetchDashboard(restaurantId)
    next()
  },
  methods: {
    async fetchDashboard (restaurantId) {
      try {
        const { data } = await restaurantsAPI.getRestaurant(restaurantId)
 
        this.restaurant = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          categoryName: data.restaurant.Category && data.restaurant.Category.name,
          commentCounts: data.restaurant.Comments.length,
          viewCounts: data.restaurant.viewCounts,
          favoriteCounts: data.restaurant.FavoritedUsers.length
        }

      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>