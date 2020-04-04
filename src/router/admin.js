import store from '../store/index.js'
import Main from '@/views/layouts/Main.vue'

// admin checker
function authorizeIsAdmin(to, from, next) {
  const currentUser = store.state.currentUser
  if (!currentUser.isAdmin) return next('/404')

  next()
}

export default [
  {
    path: '/admin',
    component: Main,
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
          default: () => import('@/views/admin/Restaurants.vue'),
          nav: () => import('@/components/AdminNav.vue')
        }
      },
      {
        path: 'restaurants/new',
        name: 'admin-restaurant-new',
        component: () => import('@/views/admin/RestaurantNew.vue')
      },
      {
        path: 'restaurants/:id',
        name: 'admin-restaurant',
        component: () => import('@/views/admin/Restaurant.vue')
      },
      {
        path: 'restaurants/:id/edit',
        name: 'admin-restaurant-edit',
        component: () => import('@/views/admin/RestaurantEdit.vue')
      },
      {
        path: 'categories',
        name: 'admin-categories',
        components: {
          default: () => import('@/views/admin/Categories.vue'),
          nav: () => import('@/components/AdminNav.vue')
        }
      },
      {
        path: 'users',
        name: 'admin-users',
        components: {
          default: () => import('@/views/admin/Users.vue'),
          nav: () => import('@/components/AdminNav.vue')
        }
      },
    ]
  }
]