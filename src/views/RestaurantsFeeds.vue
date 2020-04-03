<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">最新動態</h1>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NewestRestaurants from '../components/NewestRestaurants.vue'
import NewestComments from '../components/NewestComments.vue'
import Spinner from '../components/Spinner.vue'
import restaurantsAPI from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'

export default {
  data () {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  components: {
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  created () {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds () {
      try {
        const { data } = await restaurantsAPI.getFeeds()

        this.restaurants = data.restaurants
        this.comments = data.comments
        this.isLoading = false

      } catch(err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得最新動態，請稍後再試'
        })
      }
      
    }
  },
}
</script>