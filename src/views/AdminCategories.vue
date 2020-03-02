<template>
  <div class="container py-5">
    <AdminNav/>

    <form class="my-4" @submit.prevent="createCategory">
      <div class="form-row">
        <div class="col-auto">
          <input type="text"
            class="form-control"
            v-model="newCategory"
            placeholder="New category"
          >
        </div>
        <div class="col-auto">
          <button class="btn btn-primary">新增</button>
        </div>
      </div>
    </form>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cate in categories"
          :key="cate.id"
        >
          <th scope="row">{{cate.id}}</th>
          <td class="position-relative">
            <div class="category-name">
              {{cate.name}}
            </div>
          </td>
          <td class="d-flex justify-content-between">
            <button class="btn btn-link mr-2">Edit</button>
            <button class="btn btn-link mr-2"
                @click="deleteCategory(cate.id)"
              >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'
import uuid from 'uuid/v4'

const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
}

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      categories: [],
      newCategory: ''
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      this.categories = dummyData.categories
    },
    createCategory() {
      this.categories.push({
        id: uuid(),
        name: this.newCategory
      })

      this.newCategory = ''
    },
    deleteCategory(cateId) {
      this.categories = this.categories.filter(
        cate => cate.id !== cateId
      )
    }
  }
}
</script>