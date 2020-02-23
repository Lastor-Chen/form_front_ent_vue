<template>
  <div class="container py-5">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title mb-0">{{restaurant.name}}</h2>
        <h6 class="card-subtitle mb-2 py-3 border-bottom">[{{restaurant.categoryName}}]</h6>
        <ul>
          <li>評論數： {{restaurant.commentCounts}}</li>
          <li>瀏覽次數：{{restaurant.viewCounts}}</li>
          <li>收藏數：{{restaurant.favoriteCounts}}</li>
        </ul>
        <router-link
          :to="`/restaurants/${restaurant.id}`"
          class="card-link"
        >
          回上一頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  "restaurant": {
    "id": 1,
    "name": "123",
    "tel": "02-8888-0000",
    "address": "01313 ketlch deive",
    "opening_hours": "08:00",
    "description": "dsfsafdsadfasasdfasdf",
    "image": "https://loremflickr.com/320/240/restaurant,food/?random=22.148585495422335",
    "viewCounts": 18,
    "createdAt": "2019-11-20T06:25:42.921Z",
    "updatedAt": "2020-02-23T13:14:08.108Z",
    "CategoryId": null,
    "Category": null,
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
  }
}

export default {
  data () {
    return {
      restaurant: {
        id: 0,
        name: '',
        categoryName: '',
        commentCounts: 0,
        viewCounts: 0,
        favoriteCounts: 0
      }
    }
  },
  created () {
    this.fetchDashboard()
  },
  methods: {
    fetchDashboard () {
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category && dummyData.restaurant.Category.name,
        commentCounts: dummyData.restaurant.Comments.length,
        viewCounts: dummyData.restaurant.viewCounts,
        favoriteCounts: null
      }
    }
  }
}
</script>