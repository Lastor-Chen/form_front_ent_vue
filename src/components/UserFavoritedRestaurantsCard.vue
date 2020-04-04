<template>
  <div class="card">
    <div class="card-header">
      <strong>{{favRestaurants.length}}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link class="mr-1 mb-1 d-inline-block"
        v-for="restaurant in favRestaurants"
        :key="restaurant.id"
        :to="`/restaurants/${restaurant.id}`"
      >
        <img
          :src="restaurant.image | emptyImage('60', 'Image')"
          width="60"
          height="60"
          class="avatar"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favRestaurants: {
      type: Array,
      required: true
    }
  }
}
</script>