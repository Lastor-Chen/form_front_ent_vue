import { apiHelper } from '../utils/helpers'

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, getHeaders())
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds', getHeaders())
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top', getHeaders())
  }
}