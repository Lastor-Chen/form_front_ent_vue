<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="180">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users"
          :key="user.id"
        >
          <th>{{user.id}}</th>
          <td>{{user.email}}</td>
          <td>
            {{user.isAdmin ? 'admin' : 'user'}}
          </td>
          <td>
            <button class="btn btn-link"
              v-if="currentUser.id !== user.id"
              @click="toggleAdmin(index)"
              >
              {{user.isAdmin ? 'set as user' : 'set as admin'}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'

const dummyData = {
  "users": [
      {
          "id": 1,
          "name": "root",
          "email": "root@example.com",
          "password": "$2a$10$J9pLpJJ1Tzfe/ZcjdYwXdumyh.3F5E.w/HTxRcH./cl3azhgekgQe",
          "isAdmin": true,
          "image": null,
          "createdAt": "2020-02-28T14:38:32.000Z",
          "updatedAt": "2020-02-28T14:38:32.000Z"
      },
      {
          "id": 2,
          "name": "user1",
          "email": "user1@example.com",
          "password": "$2a$10$NyaAtgRuHx3i7hHlnb5IXOC4Uk4.q1J1iQs3op.ymdCEh7.tOwcH2",
          "isAdmin": false,
          "image": null,
          "createdAt": "2020-02-28T14:38:32.000Z",
          "updatedAt": "2020-02-28T14:38:32.000Z"
      },
      {
          "id": 3,
          "name": "user2",
          "email": "user2@example.com",
          "password": "$2a$10$VHKmtPqbcUzK46qxLllqj.w506U2N2TObMmnpdlNG2CLZPa1xzuTi",
          "isAdmin": false,
          "image": null,
          "createdAt": "2020-02-28T14:38:32.000Z",
          "updatedAt": "2020-02-28T14:38:32.000Z"
      },
      {
          "id": 62,
          "name": "AC",
          "email": "ac@ac.com",
          "password": "$2a$10$yB01LxQAujWjRQ0WaprYV.t5SDx6kool5Cmrt0F7TRSXGRk.W8z1m",
          "isAdmin": false,
          "image": null,
          "createdAt": "2020-02-29T15:41:09.000Z",
          "updatedAt": "2020-02-29T15:41:09.000Z"
      },
      {
          "id": 72,
          "name": "mohammad akhbarati",
          "email": "makhbarati@gmail.com",
          "password": "$2a$10$ljaWKqtQwgLA5BdTEhBTHeJK/Ku4ow3IHM4S5OJYmr7.anBAIl7NW",
          "isAdmin": false,
          "image": null,
          "createdAt": "2020-02-29T23:24:32.000Z",
          "updatedAt": "2020-02-29T23:24:32.000Z"
      }
  ]
}

const dummyUser = {
  currentUser: {
    id: 1,
    name: 'administrator',
    email: 'root@example.com',
    image: 'http://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  data() {
    return {
      currentUser: dummyUser.currentUser,
      users: []
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users
    },
    toggleAdmin(index) {
      const user = this.users[index]
      user.isAdmin = !user.isAdmin
    }
  }
}
</script>