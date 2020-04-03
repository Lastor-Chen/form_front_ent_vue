<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{restaurant.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{restaurant.categoryName}}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block" 
        :src="restaurant.image || 'http://via.placeholder.com/320x240?text=No+Image'"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{restaurant.openingHours}}
          </li>
          <li>
            <strong>Tel:</strong>
            {{restaurant.tel}}
          </li>
          <li>
            <strong>Address:</strong>
            {{restaurant.address}}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{restaurant.description}}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="`/restaurants/${restaurant.id}/dashboard`"
      >
        Dashboard
      </router-link>

      <button
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click="deleteFavorite"
        :disabled="isProcessing"
      >
        移除最愛
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click="addFavorite"
        :disabled="isProcessing"
      >
        加到最愛
      </button>
      <button
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click="deleteLike"
        :disabled="isProcessing"
      >
        Unlike
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click="addLike"
        :disabled="isProcessing"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false
    }
  },
  watch: {
    initialRestaurant(newVal) {
      this.restaurant = newVal
    }
  },
  methods: {
    async addFavorite() {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const restaurantId = this.restaurant.id

        // API request
        const { data } = await usersAPI.addFavorite(restaurantId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.restaurant.isFavorited = true
        Toast.fire('成功加入最愛', '', 'success')
        this.isProcessing = false
        
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法加入最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite() {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const restaurantId = this.restaurant.id

        // API request
        const { data } = await usersAPI.deleteFavorite(restaurantId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.restaurant.isFavorited = false
        Toast.fire('成功刪除最愛', '', 'success')
        this.isProcessing = false
        
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法刪除最愛，請稍後再試'
        })
      }
    },
    async addLike() {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const restaurantId = this.restaurant.id

        // API request
        const { data } = await usersAPI.addLike(restaurantId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.restaurant.isLiked = true
        Toast.fire('成功加入喜歡', '', 'success')
        this.isProcessing = false
        
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法加入喜歡，請稍後再試'
        })
      }
    },
    async deleteLike() {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const restaurantId = this.restaurant.id

        // API request
        const { data } = await usersAPI.deleteLike(restaurantId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.restaurant.isLiked = false
        Toast.fire('成功刪除喜歡', '', 'success')
        this.isProcessing = false
        
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法刪除喜歡，請稍後再試'
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
%font {
  font-family: serif;
  font-size: 17px;  
}

.col-lg-8 {
  p {
    @extend %font;
  }
}

.contact-info-wrap {
  li, strong {
    @extend %font;
  }
}
</style>