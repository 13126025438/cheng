import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
// axios.defaults.baseURL = 'http://blogs.serve.xiaxianxian.top';
axios.defaults.timeout = 5000;
axios.defaults.headers["Content-Type"] = "application/x-www-from-url-urlencoded;text/markdown;charset=UTF-8";

// url:{
//     baseUrl:'http://blogs.serve.xiaxianxian.top'
// },
// axios.interceptors.request.use(config => {
//     NProgress.start();
//     return config;

// }, error => {
//     return Promise.reject(error);
// })

// // // //
// axios.interceptors.response.use(function (config) {
  

//     NProgress.done();
//     return config;

// }, error => {
//     return Promise.reject(error)
// })

export default axios