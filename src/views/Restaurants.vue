<template>
  <div class="container py-5">
    <NavTabs/>
    <!-- Pills -->
    <RestaurantsNavPills :categories="categories" />
    <div class="row">
      <!-- Card -->
      <RestaurantsCard 
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>
    <!-- Pagination -->
    <RestaurantsPagination
      :category-id="categoryId"
      :current-page="currentPage"
      :total-page="totalPage"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantsCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills.vue'
import RestaurantsPagination from '../components/RestaurantsPagination.vue'
import restaurantAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  data () {
    return {
      restaurants: [],
      categories: [],
      categoryId: 0,
      currentPage: 1,
      totalPage: 0,
    }
  },
  components: {
    NavTabs,
    RestaurantsCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  created () {
    this.fetchRestaurants({ page: 1, categoryId: '' })
  },
  methods: {
    async fetchRestaurants({ page, categoryId }) {
      try {
        const { data } = await restaurantAPI.getRestaurants({ page, categoryId })

        this.restaurants = data.restaurants
        this.categories = data.categories
        this.categoryId = data.categoryId
        this.currentPage = data.page
        this.totalPage = data.totalPage.length
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  }
}

</script>

