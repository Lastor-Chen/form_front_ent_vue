import { apiHelper } from '../utils/helpers'

function getToken() {
  return localStorage.getItem('token')
}

const config = {
  headers: { Authorization: `Bearer ${getToken()}` }
}

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, config)
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds', config)
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top', config)
  }
}