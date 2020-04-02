import store from '../store/index.js'

// admin checker
function authorizeIsAdmin(to, from, next) {
  const currentUser = store.state.currentUser
  if (!currentUser.isAdmin) return next('/404')

  next()
}

export default [
  {
    path: '/admin',
    component: () => import('../views/AdminIndex.vue'),
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
        components: {
          default: () => import('../views/AdminRestaurants.vue'),
          nav: () => import('../components/AdminNav.vue')
        }
      },
      {
        path: 'restaurants/new',
        name: 'admin-restaurant-new',
        component: () => import('../views/AdminRestaurantNew.vue')
      },
      {
        path: 'restaurants/:id',
        name: 'admin-restaurant',
        component: () => import('../views/AdminRestaurant.vue')
      },
      {
        path: 'restaurants/:id/edit',
        name: 'admin-restaurant-edit',
        component: () => import('../views/AdminRestaurantEdit.vue')
      },
      {
        path: 'categories',
        name: 'admin-categories',
        components: {
          default: () => import('../views/AdminCategories.vue'),
          nav: () => import('../components/AdminNav.vue')
        }
      },
      {
        path: 'users',
        name: 'admin-users',
        components: {
          default: () => import('../views/AdminUsers.vue'),
          nav: () => import('../components/AdminNav.vue')
        }
      },
    ]
  }
]