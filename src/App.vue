<template>
  <div id="restaurant-forum">
    <Navbar/>
    <main role="main" class="bg-white">
      <router-view/>
    </main>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style scoped>
main {
  margin-top: 65px;
}
</style>