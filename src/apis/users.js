import { apiHelper } from '../utils/helpers.js'

function getToken() {
  return localStorage.getItem('token')
}

const config = {
  headers: { Authorization: `Bearer ${getToken()}` }
}

export default {
  addFavorite(restaurantId) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, config)
  },
  deleteFavorite(restaurantId) {
    return apiHelper.delete(`/favorite/${restaurantId}`, config)
  },
  addLike(restaurantId) {
    return apiHelper.post(`/like/${restaurantId}`, null, config)
  },
  deleteLike(restaurantId) {
    return apiHelper.delete(`/like/${restaurantId}`, config) 
  },
  getTopUsers() {
    return apiHelper.get(`/users/top`, config)
  },
  addFollowing(userId) {
    return apiHelper.post(`/following/${userId}`, null, config)
  },
  deleteFollowing(userId) {
    return apiHelper.delete(`/following/${userId}`, config)
  }
}