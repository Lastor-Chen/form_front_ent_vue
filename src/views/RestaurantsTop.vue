<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <hr>
      <RestaurantTopCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </template>
  </div>
</template>

<script>
import RestaurantTopCard from '../components/RestaurantTopCard.vue'
import Spinner from '../components/Spinner.vue'
import restaurantsAPI from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'

export default {
  data () {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  components: {
    RestaurantTopCard,
    Spinner
  },
  created () {
    this.fetchTopRestaurants()
  },
  methods: {
    async fetchTopRestaurants () {
      try {
        const { data, statusText } = await restaurantsAPI.getTopRestaurants()
        if (statusText !== 'OK') throw 'serverError'

        this.restaurants = data.restaurants
        this.isLoading = false

      } catch(err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得人氣餐廳，請稍後再試'
        })
      }
    }
  }
}
</script>