<template>
  <div class="container py-5">
    <!-- AdminNav -->
    <AdminNav/>
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
import AdminNav from '../components/AdminNav.vue'
import AdminRestaurantsTable from '../components/AdminRestaurantsTable.vue'

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
}
</script>