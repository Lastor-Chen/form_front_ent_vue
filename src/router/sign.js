import Main from '@/views/layouts/Main.vue'

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'root',
        redirect: 'signin'
      },
      {
        path: 'signin',
        name: 'sign-in',
        component: () => import('../views/SignIn.vue')
      },
      {
        path: 'signup',
        name: 'sign-up',
        component: () => import('../views/SignUp.vue')
      },
    ]
  },
]