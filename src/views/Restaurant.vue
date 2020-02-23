<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant"/>
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments 
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue'
import RestaurantComments from '../components/RestaurantComments.vue'
import CreateComment from '../components/CreateComment.vue'

const dummyData = {
  "restaurant": {
      "id": 1,
      "name": "123",
      "tel": "02-8888-0000",
      "address": "01313 ketlch deive",
      "opening_hours": "08:00",
      "description": "dsfsafdsadfasasdfasdf",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=22.148585495422335",
      "viewCounts": 17,
      "createdAt": "2019-11-20T06:25:42.921Z",
      "updatedAt": "2020-02-23T12:48:38.190Z",
      "CategoryId": null,
      "Category": null,
      "FavoritedUsers": [
          {
              "id": 1,
              "name": "root1",
              "email": "root@example.com",
              "password": "$2a$10$alLLwv1Kn0tC9euHs6Llwen8uif7jQfU9DPaybXRuGn83ZfKzW56G",
              "isAdmin": true,
              "image": null,
              "createdAt": "2019-11-20T06:25:42.456Z",
              "updatedAt": "2019-11-25T06:53:28.542Z",
              "Favorite": {
                  "UserId": 1,
                  "RestaurantId": 1,
                  "createdAt": "2020-01-06T13:45:36.866Z",
                  "updatedAt": "2020-01-06T13:45:36.866Z"
              }
          }
      ],
      "LikedUsers": [
          {
              "id": 1,
              "name": "root1",
              "email": "root@example.com",
              "password": "$2a$10$alLLwv1Kn0tC9euHs6Llwen8uif7jQfU9DPaybXRuGn83ZfKzW56G",
              "isAdmin": true,
              "image": null,
              "createdAt": "2019-11-20T06:25:42.456Z",
              "updatedAt": "2019-11-25T06:53:28.542Z",
              "Like": {
                  "UserId": 1,
                  "RestaurantId": 1,
                  "createdAt": "2019-11-22T07:47:34.897Z",
                  "updatedAt": "2019-11-22T07:47:34.897Z"
              }
          }
      ],
      "Comments": [
          {
              "id": 1,
              "text": "Voluptas omnis laudantium et non ut quia unde.",
              "UserId": 2,
              "RestaurantId": 1,
              "createdAt": "2019-11-20T06:25:42.942Z",
              "updatedAt": "2019-11-20T06:25:42.942Z",
              "User": {
                  "id": 2,
                  "name": "user1",
                  "email": "user1@example.com",
                  "password": "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
                  "isAdmin": false,
                  "image": null,
                  "createdAt": "2019-11-20T06:25:42.685Z",
                  "updatedAt": "2019-11-21T09:55:30.970Z"
              }
          },
          {
              "id": 51,
              "text": "Distinctio laborum explicabo quasi.",
              "UserId": 2,
              "RestaurantId": 1,
              "createdAt": "2019-11-20T06:25:42.944Z",
              "updatedAt": "2019-11-20T06:25:42.944Z",
              "User": {
                  "id": 2,
                  "name": "user1",
                  "email": "user1@example.com",
                  "password": "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
                  "isAdmin": false,
                  "image": null,
                  "createdAt": "2019-11-20T06:25:42.685Z",
                  "updatedAt": "2019-11-21T09:55:30.970Z"
              }
          },
          {
              "id": 101,
              "text": "Nihil iure quas.",
              "UserId": 2,
              "RestaurantId": 1,
              "createdAt": "2019-11-20T06:25:42.946Z",
              "updatedAt": "2019-11-20T06:25:42.946Z",
              "User": {
                  "id": 2,
                  "name": "user1",
                  "email": "user1@example.com",
                  "password": "$2a$10$ESv6iQjQ8oEe3/XGjw00PuSh1kjmG6Dkhd4YXa50boTlncJDxljAy",
                  "isAdmin": false,
                  "image": null,
                  "createdAt": "2019-11-20T06:25:42.685Z",
                  "updatedAt": "2019-11-21T09:55:30.970Z"
              }
          }
      ]
  },
  "isFavorited": false,
  "isLiked": false
}

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
  data () {
    return {
      restaurant: {
        id: 0,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      currentUser: dummyUser.currentUser
    }
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  created () {
    const restaurantId = this.$route.params.id
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    fetchRestaurant (restaurantId) {
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category && dummyData.restaurant.Category.name,
        image: dummyData.restaurant.image,
        openingHours: dummyData.restaurant.opening_hours,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        description: dummyData.restaurant.description,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked,
      }

      this.restaurantComments = dummyData.restaurant.Comments
    },
    afterDeleteComment (commentId) {
      const index = this.restaurantComments.findIndex(
        item => item.id === commentId
      )
      this.restaurantComments.splice(index, 1)
    },
    afterCreateComment (payload) {
      this.restaurantComments.push({
        id: payload.commentId,
        text: payload.text,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        createdAt: new Date()
      })
    }
  }
}
</script>