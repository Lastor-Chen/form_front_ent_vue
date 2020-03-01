<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text"
        id="name"
        v-model="restaurant.name"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      >
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select id="categoryId"
          v-model="restaurant.categoryId"
          class="form-control"
          name="categoryId"
          required
        >
        <option value="0" selected disabled>--請選擇--</option>
        <option v-for="cate in categories"
          :key="cate.id"
          :value="cate.id"
        >{{cate.name}}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input type="text"
        id="tel"
        v-model="restaurant.tel"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      >
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input type="text"
        id="address"
        v-model="restaurant.address"
        class="form-control"
        name="address"
        placeholder="Enter address"
      >
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input type="time"
        id="opening-hours"
        v-model="restaurant.openingHours"
        class="form-control"
        name="opening_hours"
      >
    </div>

    <div class="from-group">
      <label for="description">Description</label>
      <textarea class="form-control"
        id="description"
        v-model="restaurant.description"
        name="description"
        rows="3"
      >
      </textarea>
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumbnail mb-3"
        width="200" height="200"
      >
      <input type="file"
        id="image"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      >
    </div>

    <button type="submit" class="btn btn-primary">送出</button>
  </form>
</template>

<script>
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
  data() {
    return {
      restaurant: {
        name: '',
        categoryId: 0,
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      categories: []
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      this.categories = dummyData.categories
    },
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return false

      const imageURL = window.URL.createObjectURL(files[0])
      this.restaurant.image = imageURL
    },
    handleSubmit(e) {
      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  }
}
</script>