import Restaurants from '../views/RestaurantsIndex.vue'

export default {
  path: '/restaurants',
  component: Restaurants,
  children: [
    {
      path: '',
      name: 'restaurants',
      component: () => import('../views/Restaurants.vue')
    },
    {
      path: 'feeds',
      name: 'restaurants-feeds',
      component: () => import('../views/RestaurantsFeeds.vue')
    },
    {
      path: 'top',
      name: 'restaurants-tops',
      component: () => import('../views/RestaurantsTop.vue')
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
}