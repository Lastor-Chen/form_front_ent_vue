<template>
  <div class="card">
    <div class="card-header">
      <strong>{{followings.length}}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link class="mr-1 mb-1 d-inline-block"
        v-for="user in followings"
        :key="user.id"
        :to="`/users/${user.id}`"
      >
        <img
          :src="user.image || 'http://via.placeholder.com/60?text=Image'"
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
    followings: {
      type: Array,
      required: true
    }
  }
}
</script>