import { apiHelper } from '../utils/helpers.js'

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}

export default {
  delete(id) {
    return apiHelper.delete(`/comments/${id}`, getHeaders())
  }
}