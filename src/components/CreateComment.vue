<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="text">留下評論：</label>
      <textarea
        v-model="text"
        class="form-control"
        rows="3"
        name="text"
      />
    </div>
    <div class="text-right">
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import commentsAPI from '../apis/comments.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      text: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        // check user input
        const text = this.text.trim()
        if (!text) return Toast.fire('評論不得為空白', '', 'warning')
        this.isProcessing = true

        // API request
        const commentData = {
          restaurantId: this.restaurantId,
          text
        }
        const { data } = await commentsAPI.create(commentData)
        if (data.status !== 'success') throw { msg: data.message}

        // add new comment to Vue data
        commentData.commentId = data.commentId
        this.$emit('after-create-comment', commentData)
        Toast.fire('成功建立新評論', '', 'success')

        // reset textarea
        this.text = ''
        this.isProcessing = false

      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法新增評論，請稍後再試'
        })
      }
    }
  }
}
</script>