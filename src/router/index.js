import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

function authorizeIsAdmin(to, from, next) {
  const currentUser = store.state.currentUser
  if (!currentUser.isAdmin) return next('/404')

  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  require('./restaurants.js').default,
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants'
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  try {
    const localToken = localStorage.getItem('token')
    const storedToken = store.state.token
    let isAuthenticated = store.state.isAuthenticated

    // Vuex 未持有 token && 與 localToken 不一致時，才向 Server 核對
    if (storedToken && (storedToken !== localToken)) {
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    }

    // 不需驗證的 routes
    const openPaths = ['/signin', '/signup']
    const isOpenPaths = openPaths.includes(to.path)

    // 登入註冊頁之跳轉動線，openPaths 防無限 loop
    if (!isAuthenticated && !isOpenPaths) return next('/signin')
    if (isAuthenticated && isOpenPaths) return next('/restaurants')

    next()

  } catch(err) {
    console.log(err)
  }
})

export default router
