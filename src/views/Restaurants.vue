<template>
  <div>
    <!-- NavPills -->
    <RestaurantsNavPills :categories="categories" />

    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- Restaurants -->
      <div class="row">
        <RestaurantsCard 
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>
      <!-- Pagination -->
      <RestaurantsPagination v-if="restaurants.length"
        :category-id="categoryId"
        :current-page="currentPage"
        :total-page="totalPage"
      />

      <div v-if="!restaurants.length">
        沒有符合條件的餐廳。
      </div>
    </template>
  </div>
</template>

<script>
import RestaurantsCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills.vue'
import RestaurantsPagination from '../components/RestaurantsPagination.vue'
import Spinner from '../components/Spinner.vue'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  components: {
    RestaurantsCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner
  },
  data () {
    return {
      restaurants: [],
      categories: [],
      categoryId: 0,
      currentPage: 1,
      totalPage: 0,
      isLoading: true
    }
  },
  created () {
    const { page, categoryId } = this.$route.query
    this.fetchRestaurants({ page, categoryId })
  },
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true
    const { page, categoryId } = to.query
    this.fetchRestaurants({ page, categoryId })
    next()
  },
  methods: {
    async fetchRestaurants({ page = 1, categoryId = '' }) {
      try {
        const { data } = await restaurantsAPI.getRestaurants({ page, categoryId })

        this.restaurants = data.restaurants
        this.categories = data.categories
        this.categoryId = data.categoryId
        this.currentPage = data.page
        this.totalPage = data.totalPage.length
        this.isLoading = false

      } catch(err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>