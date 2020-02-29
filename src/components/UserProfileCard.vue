<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image" width="300px" height="300px">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>
          <ul class="list-unstyled list-inline">
            <li><strong>{{commentsCount}}</strong> 已評論餐廳</li>
            <li><strong>{{favRestaurantsCount}}</strong> 收藏的餐廳</li>
            <li><strong>{{followersCount}}</strong> followings (追蹤者)</li>
            <li><strong>{{followingsCount}}</strong> followers (追隨者)</li>
          </ul>
          <!-- button group -->
          <router-link class="btn btn-primary"
            v-if="currentUser.id === user.id"
            :to="`/users/${user.id}/edit`"
          >
            edit
          </router-link>
          <button class="btn btn-danger"
            v-else-if="user.isFollowed"
            @click="toggleFollow"
          >
            取消追蹤
          </button>
          <button class="btn btn-primary"
            v-else
            @click="toggleFollow"
          >
            追蹤
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    commentsCount: {
      type: Number,
      required: true
    },
    favRestaurantsCount: {
      type: Number,
      required: true
    },
    followersCount: {
      type: Number,
      required: true
    },
    followingsCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentUser: dummyUser.currentUser
    }
  },
  methods: {
    toggleFollow() {
      this.$emit('afterToggleFollow')
    }
  }
}
</script>