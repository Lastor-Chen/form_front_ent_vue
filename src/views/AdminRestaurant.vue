<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1>{{restaurant.name}}</h1>
        <p>{{restaurant.categoryName}}</p>
      </div>
      <div class="col-md-4">
        <img
          :src="restaurant.image | emptyImage"
          class="img-responsive center-block"
          style="width: 250px; margin-bottom: 25px;"
        >
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour:</strong>
              {{restaurant.openingHours}}
            </li>
            <li>
              <strong>Tel:</strong>
              {{restaurant.tel}}
            </li>
            <li>
              <strong>Address:</strong>
              {{restaurant.address}}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{restaurant.description}}</p>
      </div>
    </div>
    <hr>
    <button class="btn btn-link" @click="$router.back()">回上頁</button>
  </div>
</template>

<script>
import { emptyImageFilter } from '../utils/mixins.js'
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  name: 'AdminRestaurant',
  mixins: [emptyImageFilter],
  data() {
    return {
      restaurant: {
        id: 0,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: ''
      }
    }
  },
  created() {
    const restaurantId = this.$route.params.id
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from , next) {
    this.fetchRestaurant(to.params.id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data, statusText } = await adminAPI.restaurants.getOne(restaurantId)
        if (statusText !== 'OK') throw 'serverError'

        const { restaurant } = data
        this.restaurant = {
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          image: restaurant.image,
          openingHours: restaurant.opening_hours,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description
        }

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