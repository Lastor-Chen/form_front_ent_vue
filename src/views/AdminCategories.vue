<template>
  <div>
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
              @keyup.enter="updateCategory(index)"
              @keyup.esc="handleCancel(index)"
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
              :disabled="isProcessing"
              @click="updateCategory(index)"
              >
              Save
            </button>

            <button class="btn btn-link mr-2"
                @click="deleteCategory(index)"
                :disabled="isProcessing"
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
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  data() {
    return {
      categories: [],
      newCategory: '',
      isProcessing: false
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await adminAPI.categories.get()

        this.categories = data.categories.map(cate => ({
          id: cate.id,
          name: cate.name,
          isEditing: false
        }))

      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳分類，請稍後再試'
        })
      }
    },
    async createCategory() {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        // check input
        const name = this.newCategory.trim()
        if (!name) throw { msg: '餐廳分類不得為空白' }

        // API request
        const { data } = await adminAPI.categories.create({ name })
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.categories.push({
          id: data.categoryId,
          name,
          isEditing: false
        })

        this.newCategory = ''

        // show alert msg
        Toast.fire('成功建立分類', '', 'success')
        this.isProcessing = false

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法建立分類，請稍後再試'
        })
      }
    },
    async deleteCategory(index) {
      try {
        if (this.isProcessing) return false
        this.isProcessing = true

        const { id: categoryId, name } = this.categories[index]

        // API request
        const { data } = await adminAPI.categories.delete(categoryId)
        if (data.status !== 'success') throw { msg: data.message }

        // update Vue data
        this.categories = this.categories.filter(
          cate => cate.id !== categoryId
        )

        // show alert msg
        Toast.fire(`成功刪除分類 ${name}`, '', 'success')
        this.isProcessing = false

      } catch(err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: err.msg || '無法刪除餐廳，請稍後再試'
        })
      }
    },
    toggleIsEditing(index) {
      const category = this.categories[index]
      category.isEditing = !category.isEditing
      category.nameCached = category.name
    },
    async updateCategory(index) {
      if (this.isProcessing) return false
      const category = this.categories[index]

      try {
        this.isProcessing = true

        // check input
        const { id, name } = category
        if (!name.trim()) throw { msg: '餐廳分類不得為空白' }

        // API request
        const { data } = await adminAPI.categories.update(id, { name })
        if (data.status !== 'success') throw { msg: data.message }

        // toggle status
        this.toggleIsEditing(index)

        // show alert msg
        Toast.fire('成功更新餐廳分類', '', 'success')
        this.isProcessing = false

      } catch(err) {
        this.isProcessing = false
        category.name = category.nameCached

        Toast.fire({
          icon: 'error',
          title: err.msg || '無法更新餐廳分類，請稍後再試'
        })
      }
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