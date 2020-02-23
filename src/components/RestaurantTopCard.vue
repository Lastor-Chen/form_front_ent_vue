<template>
  <div class="card mb-3 top-card">
    <div class="row no-gutters">
      <div class="col-md-4">
        <router-link :to="`/restaurants/${restaurant.id}`">
          <img
            class="card-img"
            :src="restaurant.image"
          >
        </router-link>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{restaurant.name}}
          </h5>
          <span class="badge badge-secondary">收藏數：{{restaurant.FavoriteCount}}</span>
          <p class="card-text">
            {{restaurant.description}}
          </p>
          <router-link
            :to="`/restaurants/${restaurant.id}`"
            class="btn btn-primary mr-2"
          >
            Show
          </router-link>

          <button
            v-if="restaurant.isFavorited"
            type="button"
            class="btn btn-danger mr-2"
            @click="toggleFavorite"
          >
            移除最愛
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="toggleFavorite"
          >
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .top-card {
    max-width: 540px;
    margin: auto;
  }
</style>

<script>
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    toggleFavorite () {
      // 打 API
      // 傳遞父層
      this.$emit('afterToggleFavorite', this.restaurant.id)
    }
  }
}
</script>