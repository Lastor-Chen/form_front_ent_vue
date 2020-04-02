import RestaurantsIndex from '../views/RestaurantsIndex.vue'
import NavTabs from '../components/NavTabs.vue'

export default [
  {
    path: '/restaurants',
    component: RestaurantsIndex,
    children: [
      {
        path: '',
        name: 'restaurants',
        components: {
          default: () => import('../views/Restaurants.vue'),
          nav: NavTabs
        }
      },
      {
        path: 'feeds',
        name: 'restaurants-feeds',
        components: {
          default: () => import('../views/RestaurantsFeeds.vue'),
          nav: NavTabs
        }
      },
      {
        path: 'top',
        name: 'restaurants-tops',
        components: {
          default: () => import('../views/RestaurantsTop.vue'),
          nav: NavTabs
        }
      },
      {
        path: ':id',
        name: 'restaurant',
        component: () => import('../views/Restaurant.vue')
      },
      {
        path: ':id/dashboard',
        name: 'dashboard',
        component: () => import('../views/RestaurantDashboard.vue')
      },
    ]
  },
]