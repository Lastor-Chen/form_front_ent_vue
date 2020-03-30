import { apiHelper } from '../utils/helpers.js'

export default {
  create(data) {
    return apiHelper.post('/comments', data)
  },
  delete(id) {
    return apiHelper.delete(`/comments/${id}`)
  }
}