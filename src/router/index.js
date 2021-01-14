import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'

function adminAuth(to, from, next) {
  if(localStorage.getItem('token') != undefined) {

    var req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    axios.post('http://localhost:80/validate', {}, req).then(res => {
      console.log(res.data)
      next()
    }).catch(error => {
      console.log(error.response.data.error)
      next('/login')
    })
  } else {
    next('/login')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: adminAuth
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
