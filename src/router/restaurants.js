import Index from '@/views/restaurants/Index.vue'
import NavTabs from '@/components/NavTabs.vue'

export default [
  {
    path: '/restaurants',
    component: Index,
    children: [
      {
        path: '',
        name: 'restaurants',
        components: {
          default: () => import('@/views/restaurants/Restaurants.vue'),
          nav: NavTabs
        }
      },
      {
        path: 'feeds',
        name: 'restaurants-feeds',
        components: {
          default: () => import('@/views/restaurants/Feeds.vue'),
          nav: NavTabs
        }
      },
      {
        path: 'top',
        name: 'restaurants-tops',
        components: {
          default: () => import('@/views/restaurants/Top.vue'),
          nav: NavTabs
        }
      },
      {
        path: 'users_top',
        name: 'users-top',
        components: {
          default: () => import('@/views/restaurants/UsersTop.vue'),
          nav: NavTabs
        }
      },
      {
        path: ':id',
        name: 'restaurant',
        component: () => import('@/views/restaurants/Restaurant.vue')
      },
      {
        path: ':id/dashboard',
        name: 'dashboard',
        component: () => import('@/views/restaurants/Dashboard.vue')
      },
    ]
  },
]