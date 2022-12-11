import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios';

import api from './api'

import {marked} from 'marked'
import 'github-markdown-css';

import './element-ui/index.js'
import 'element-ui/lib/theme-chalk/index.css'

import javascript from 'highlight.js/lib/languages/javascript'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'


//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// use
Vue.use(mavonEditor)
Vue.use(api)

// 定义全局格式化时间过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// Vue.filter('timestamp',function(val){
//   let vals = parseInt(val);
//   let date = new Date(vals);
//   let year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   month = month < 10 ? ('0' + month) :month
//   let day = date.getDay();
//   day = day < 10 ? ('0' + day) :day

//   // let minutes = date.getMinutes();
//   return year + ' 年 ' + month + ' 月 ' + day + ' 日 ';
// })

// Vue.filter('dateFormat', function(originVal) {
//   const originVals = parseInt(originVal);
//   const dt = new Date(originVals)

//   const y = dt.getFullYear()
//   const m = (dt.getMonth() + 1 + '').padStart(2, '0')
//   const d = (dt.getDate() + '').padStart(2, '0')

//   const hh = (dt.getHours() + '').padStart(2, '0')
//   const mm = (dt.getMinutes() + '').padStart(2, '0')
//   const ss = (dt.getSeconds() + '').padStart(2, '0')

//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// })


import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)
// #在main.js定义自定义指令 
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
    block.innerHTML = `<ol><li>${block.innerHTML.replace(
      /\n/g,
      `</li><li class="line">`
    )}</li></ol>`;
  })
})

import vuex from './store/index';
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  vuex,
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
