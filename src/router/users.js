export default [
  {
    path: '/users',
    component: () => import('@/views/layouts/Main.vue'),
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