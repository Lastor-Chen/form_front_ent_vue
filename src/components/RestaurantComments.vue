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
          :disabled="isProcessing"
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
import commentsAPI from '../apis/comments.js'
import moment from 'moment'
import { fromNowFilter } from '../utils/mixins.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    restaurantComments: {
      type: Array,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    }
  },
  mixins: [fromNowFilter],
  methods: {
    async deleteComment (commentId) {
      try {
        this.isProcessing = true

        const { data } = await commentsAPI.delete(commentId)
        if (data.status !== 'success') throw { msg: data.message }

        Toast.fire('成功刪除評論', '', 'success')
        this.$emit('after-delete-comment', commentId)
        this.isProcessing = false

      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法刪除評論，請稍後再試'
        })
      }
    }
  }
}
</script>