<template>
  <div class="card">
    <div class="card-header">
      最新評論
    </div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant', params: { id: comment.Restaurant && comment.Restaurant.id } }"
          >
            {{comment.Restaurant && comment.Restaurant.name}}
          </router-link>
        </h4>
        <p>{{comment.text}}</p>by
        <a href="#">{{comment.User && comment.User.name}}</a>
        {{comment.createdAt | fromNow}}
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fromNowFilter } from '../utils/mixins.js'

export default {
  mixins: [fromNowFilter],
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>