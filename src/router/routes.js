import AppLayout from '../views/Layout/AppLayout.vue'
import HomeView from '../views/HomeView.vue'

export default [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue')
    },
    {
        path: '/',
        name: 'app',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: HomeView,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/AboutView.vue'),
                meta: {
                    requiresAuth: true
                },
              },
        ]
    },
]