<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <UserProfileCard 
        :user="user"
        :is-current-user="currentUser.id === user.id"
        :initial-is-followed="isFollowed"
      />
      <div class="row">
        <div class="col-md-4">
          <UserFollowingsCard :followings="followings" />
          <br>
          <UserFollowersCard :followers="followers" />
        </div>
        <div class="col-md-8">
          <UserCommentsCard :comments="comments"/>
          <br>
          <UserFavoritedRestaurantsCard :favRestaurants="favoritedRestaurants" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import UserProfileCard from '@/components/UserProfileCard.vue'
import UserFollowingsCard from '@/components/UserFollowingsCard.vue'
import UserFollowersCard from '@/components/UserFollowersCard.vue'
import UserCommentsCard from '@/components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '@/components/UserFavoritedRestaurantsCard.vue'
import Spinner from '@/components/Spinner.vue'
import { mapState } from 'vuex'
import usersAPI from '@/apis/users.js'
import { Toast } from '@/utils/helpers.js'

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner
  },
  data() {
    return {
      user: {},
      isFollowed: false,
      comments: [],
      favoritedRestaurants: [],
      followers: [],
      followings: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    // 如果從 UserEdit 返回
    const flash = this.$session.flash.get('editResult')
    if (flash) { Toast.fire(flash.title, '', flash.icon) }

    const userId = this.$route.params.id
    this.fetchUser(userId)
  },
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true
    const userId = to.params.id
    this.fetchUser(userId)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getOne(userId)
        const profile = data.profile

        // 去除重複 restaurant.id，去除空的 restaurant
        const commentSet = new Set()
        this.comments = profile.Comments.filter(
          comment => comment.Restaurant &&
            !commentSet.has(comment.Restaurant.id) &&
            commentSet.add(comment.Restaurant.id)
        )

        // update Vue data
        this.user = {
          id: profile.id,
          image: profile.image,
          name: profile.name,
          email: profile.email,
          commentsCount: this.comments.length,
          favRestaurantsCount: profile.FavoritedRestaurants.length,
          followersCount: profile.Followers.length,
          followingsCount: profile.Followings.length
        }

        this.favoritedRestaurants = profile.FavoritedRestaurants
        this.followers = profile.Followers
        this.followings = profile.Followings
        this.isFollowed = data.isFollowed
        this.isLoading = false

      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    }
  }
}
</script>