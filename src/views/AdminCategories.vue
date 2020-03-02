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
        <tr v-for="(cate, index) in categories"
          :key="cate.id"
        >
          <th scope="row">{{cate.id}}</th>
          <td class="position-relative">
            <div class="category-name"
              v-show="!cate.isEditing"
              >
              {{cate.name}}
            </div>

            <input type="text"
              class="form-control"
              v-show="cate.isEditing"
              v-model="cate.name"
            >
            <span class="cancel"
              v-show="cate.isEditing"
              @click="handleCancel(index)"
              >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button class="btn btn-link mr-2"
              v-show="!cate.isEditing"
              @click="toggleIsEditing(index)"
              >
              Edit
            </button>
            <button class="btn btn-link mr-2"
              v-show="cate.isEditing"
              @click="updateCategory(index)"
              >
              Save
            </button>

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
      this.categories = dummyData.categories.map(cate => ({
        ...cate,
        isEditing: false
      }))
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
    },
    toggleIsEditing(index) {
      const category = this.categories[index]
      category.isEditing = !category.isEditing
      category.nameCached = category.name
    },
    updateCategory(index) {
      // API request

      // toggle status
      this.toggleIsEditing(index)
    },
    handleCancel(index) {
      const category = this.categories[index]
      category.name = category.nameCached
      this.toggleIsEditing(index)
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>