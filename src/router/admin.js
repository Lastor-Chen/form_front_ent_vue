import store from '../store/index.js'

function authorizeIsAdmin(to, from, next) {
  const currentUser = store.state.currentUser
  if (!currentUser.isAdmin) return next('/404')

  next()
}

export default [
  // 嵌套共用 AdminNav.vue
  {
    path: '/admin',
    component: () => import('../views/AdminIndex.vue'),
    exact: true,
    beforeEnter: authorizeIsAdmin,
    children: [
      {
        path: '',
        name: 'admin',
        redirect: 'restaurants'
      },
      {
        path: 'restaurants',
        name: 'admin-restaurants',
        component: () => import('../views/AdminRestaurants.vue')
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: () => import('../views/AdminCategories.vue')
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../views/AdminUsers.vue')
      },
    ]
  },
  // 無共用組件
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
]