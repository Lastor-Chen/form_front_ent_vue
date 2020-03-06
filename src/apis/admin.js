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
      return apiHelper.get('/admin/categories', config)
    }
  },
  restaurants: {
    get() {
      return apiHelper.get('/admin/restaurants', config)
    },
    getOne(restaurantId) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, config)
    },
    create(formData) {
      return apiHelper.post('/admin/restaurants', formData, config)
    },
    update(restaurantId, formData) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, config)
    },
    delete(restaurantId) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, config)
    }
  }
}