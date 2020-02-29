<template>
  <div>
    <h2 class="my-4">所有評論：</h2>
    <div
      v-for="comment in restaurantComments"
      :key="comment.id"
    >
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          @click="deleteComment(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link :to="`/users/${comment.User.id}`">{{comment.User.name}}</router-link>
        </h3>
        <p>{{comment.text}}</p>
        <footer class="blockquote-footer">
          {{comment.createdAt | fromNow}}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fromNowFilter } from '../utils/mixins.js'

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
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentUser: dummyUser.currentUser
    }
  },
  mixins: [fromNowFilter],
  methods: {
    deleteComment (commentId) {
      this.$emit('after-delete-comment', commentId)
    }
  }
}
</script>