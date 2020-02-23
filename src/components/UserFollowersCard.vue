<template>
  <div class="card">
    <div class="card-header">
      <strong>{{followers.length}}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link class="mr-1 mb-1 d-inline-block"
        v-for="user in followers"
        :key="user.id"
        :to="`/users/${user.id}`"
      >
        <img :src="user.image" width="60" height="60" class="avatar">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    followers: {
      type: Array,
      required: true
    }
  }
}
</script>