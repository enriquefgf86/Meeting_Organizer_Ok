import Vue from 'vue'
import VueRouter from 'vue-router'
import createMeetPage from '../components/Meetings/createMeetPage.vue'
import meetUpPage from '../components/Meetings/meetUpPage.vue'
import userProfilePage from '../components/Users/userProfilePage.vue'
import signInPage from '../components/Users/signInPage.vue'
import signUpPage from  '../components/Users/signUpPage.vue'
import Home from '../views/Home.vue'
import MeetUp from '../components/Meetings/MeetUp.vue'
import routerGuard from '../router/routerGuard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'home',
    component: Home
  },
  
  {
    path: '/Meet',
    name: 'meetUpPage',
    component: meetUpPage,
  },
  {
    path: '/Meet/:id',
    name: 'MeetUp',
    props:true,
    component: MeetUp,
  },
  {
    path: '/creatMeet/new',
    name: 'createMeetPage',
    component: createMeetPage,
    beforeEnter:routerGuard
  },
  
  {
    path: '/signIn',
    name: 'signInPage',
    component: signInPage,
  },
  {
    path: '/signUp',
    name: 'signUpPage',
    component: signUpPage,
  },
  {
    path: '/userProfile',
    name: 'userProfilePage',
    component: userProfilePage,
    beforeEnter:routerGuard
  },
]

const router = new VueRouter({
  routes
})

export default router
