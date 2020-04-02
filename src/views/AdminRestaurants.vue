<template>
  <div>
    <router-link class="btn btn-primary mb-4"
      to="/admin/restaurants/new"
    >
      New Restaurant
    </router-link>
    <!-- AdminRestaurantsTable -->
    <AdminRestaurantsTable/>
  </div>
</template>

<script>
import AdminRestaurantsTable from '../components/AdminRestaurantsTable.vue'

export default {
  components: {
    AdminRestaurantsTable
  }
}
</script>