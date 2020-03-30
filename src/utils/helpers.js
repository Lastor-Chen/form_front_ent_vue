import axios from 'axios'
import Swal from 'sweetalert2'


// axios config
const axiosInstance = axios.create({
  baseURL: 'https://forum-express-api.herokuapp.com/api'
})

axiosInstance.interceptors.request.use(
  config => {
    // token 帶入 request headers
    const token = localStorage.getItem('token')
    if (token) { config.headers.Authorization = `Bearer ${token}` }
    return config
  },
  err => Promise.reject(err)
)

const apiHelper = axiosInstance

// SweetAlert2 config
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export { apiHelper, Toast }