<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue'
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.create(formData)
        if (data.status !== 'success') throw 'serverError'

        this.$router.push({ name: 'admin-restaurants' })

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法建立餐廳，請稍後再試'
        })
      }
    }
  }
}
</script>