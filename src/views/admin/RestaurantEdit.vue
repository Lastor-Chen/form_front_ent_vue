<template>
  <AdminRestaurantForm
    :initial-restaurant="restaurant"
    :is-processing="isProcessing"
    @after-submit="handleAfterSubmit"
  />
</template>

<script>
import AdminRestaurantForm from '@/components/AdminRestaurantForm.vue'
import adminAPI from '@/apis/admin.js'
import { Toast } from '@/utils/helpers.js'

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      restaurant: {
        id: 0,
        name: '',
        categoryId: 0,
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getOne(restaurantId)

        const { restaurant } = data
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryId: restaurant.CategoryId,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
          image: restaurant.image,
          openingHours: restaurant.opening_hours
        }

      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true

        const { id } = this.restaurant
        const { data } = await adminAPI.restaurants.update(id, formData)
        if (data.status !== 'success') throw { msg: data.message }

        this.$router.push('/admin/restaurants')

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法編輯餐廳，請稍後再試'
        })
      }
    }
  }
}
</script>