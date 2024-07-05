import { createWebHistory, createRouter } from "vue-router";
import routes from './routes';
import jwt_decode from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const isTokenValid = () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    return false
  }

  const decoded = jwt_decode(token)
  const currentTime = Date.now() / 1000
  return decoded.exp > currentTime
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isTokenValid()) {
    console.log('token not valid')
    return next('/login')
  }
  return next()
})

export default router