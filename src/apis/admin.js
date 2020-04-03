import { apiHelper } from '../utils/helpers.js'

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories')
    },
    create(data) {
      return apiHelper.post('/admin/categories', data)
    },
    delete(id) {
      return apiHelper.delete(`/admin/categories/${id}`)
    },
    update(id, data) {
      return apiHelper.put(`/admin/categories/${id}`, data)
    }
  },
  restaurants: {
    get() {
      return apiHelper.get('/admin/restaurants')
    },
    getOne(restaurantId) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    create(formData) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    update(restaurantId, formData) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    },
    delete(restaurantId) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    }
  },
  users: {
    get() {
      return apiHelper.get('/admin/users')
    },
    update(userId, isAdmin) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin })
    }
  }
}