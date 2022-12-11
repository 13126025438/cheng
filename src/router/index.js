import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // children:[
    //  {
    //   path:'articleList',
    //   name:'ArticleList',
    //   component:() => import('../components/body/ArticleList.vue')
    //  }

    // ]
  },
  {
    path: '/show',
    name: 'Show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "show" */ '../views/content/Show.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "show" */ '../views/analysisMD/Analysis.vue')
  },
  {
    path: '/marked',
    name: 'Marked',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "show" */ '../views/markdown/Marked.vue')
  },
  {
    path: '/meditor',
    name: 'Meditor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "show" */ '../views/markdown/Meditor.vue')
  },
  {
    path: '/mavon',
    name: 'Mavon',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "show" */ '../views/markdown/Mavon.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search/index.vue')
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: () => import('../views/User/userInfo.vue')
  },
  {
    path: '/banner',
    name: 'Banner',
    component: () => import('../views/banner/index.vue'),
    children:[
      {
        path: '/letter',
        name: 'Letter',
        component: () => import('../views/centers/Letter.vue')
      },
      {
        path:'/bannerTime',
        name:'BannerTime',
        component:() =>import('../components/left/BannerTime.vue')
      },
      {
        path:'/blogCount',
        name:'BlogCount',
        component:() =>import('../views/centers/BlogCount.vue')
      },
      {
        path:'/articleList',
        name:'ArticleList',
        component:() =>import('../components/body/ArticleList.vue')
      }
    ]
  }
]




const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
//路由跳转结束
router.afterEach(() => {
  NProgress.done()
})
export default router
