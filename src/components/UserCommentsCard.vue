<template>
  <div class="card">
  <div class="card-header">
    <strong>{{comments.length}}</strong> 已評論餐廳
  </div>
  <div class="card-body">
    <router-link class="mr-1 mb-1 d-inline-block"
      v-for="comment in comments"
      :key="comment.id"
      :to="`/restaurants/${comment.Restaurant.id}`"
    >
      <img :src="comment.Restaurant.image" class="avatar" width="60" height="60">
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>