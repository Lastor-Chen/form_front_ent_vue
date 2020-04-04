import Main from '@/views/layouts/Main.vue'

export default [
  {
    path: '/users',
    component: Main,
    children: [
      {
        path: ':id',
        name: 'user',
        component: () => import('@/views/users/User.vue')
      },
      {
        path: ':id/edit',
        name: 'user-edit',
        component: () => import('@/views/users/UserEdit.vue')
      }
    ]
  }
]