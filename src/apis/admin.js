import { apiHelper } from '../utils/helpers.js'

function getToken() {
  return localStorage.getItem('token')
}

const config = {
  headers: { Authorization: `Bearer ${getToken()}` }
}

export default {
  categories: {
    get() {
      return apiHelper.get('admin/categories', config)
    }
  },
  restaurants: {
    create(formData) {
      return apiHelper.post('admin/restaurants', formData, config)
    }
  }
}