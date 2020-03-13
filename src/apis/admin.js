import { apiHelper } from '../utils/helpers.js'

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories', getHeaders())
    },
    create(data) {
      return apiHelper.post('/admin/categories', data, getHeaders())
    },
    delete(id) {
      return apiHelper.delete(`/admin/categories/${id}`, getHeaders())
    },
    update(id, data) {
      return apiHelper.put(`/admin/categories/${id}`, data, getHeaders())
    }
  },
  restaurants: {
    get() {
      return apiHelper.get('/admin/restaurants', getHeaders())
    },
    getOne(restaurantId) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, getHeaders())
    },
    create(formData) {
      return apiHelper.post('/admin/restaurants', formData, getHeaders())
    },
    update(restaurantId, formData) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, getHeaders())
    },
    delete(restaurantId) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, getHeaders())
    }
  }
}