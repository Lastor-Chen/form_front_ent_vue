<template>
  <div class="container py-5">
    <!-- AdminNav -->
    <AdminNav/>
    <router-view/>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'

export default {
  components: {
    AdminNav
  }
}
</script>