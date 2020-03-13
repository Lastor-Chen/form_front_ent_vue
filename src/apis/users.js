import { apiHelper } from '../utils/helpers.js'

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user', getHeaders())
  },
  getOne(userId) {
    return apiHelper.get(`/users/${userId}`, getHeaders())
  },
  addFavorite(restaurantId) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, getHeaders())
  },
  deleteFavorite(restaurantId) {
    return apiHelper.delete(`/favorite/${restaurantId}`, getHeaders())
  },
  addLike(restaurantId) {
    return apiHelper.post(`/like/${restaurantId}`, null, getHeaders())
  },
  deleteLike(restaurantId) {
    return apiHelper.delete(`/like/${restaurantId}`, getHeaders()) 
  },
  getTopUsers() {
    return apiHelper.get(`/users/top`, getHeaders())
  },
  addFollowing(userId) {
    return apiHelper.post(`/following/${userId}`, null, getHeaders())
  },
  deleteFollowing(userId) {
    return apiHelper.delete(`/following/${userId}`, getHeaders())
  },
}