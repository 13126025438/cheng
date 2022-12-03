import axios from 'axios'
import qs from 'qs'

// axios.defaults = 
axios.defaults.timeout = 5000;
axios.defaults.headers["Content-Type"] = "application/x-www-from-url-urlencoded;text/markdown;charset=UTF-8";

// axios.interceptors.request.use(config => {
//     if (config.method === 'post') {
//         if (!config.data) {
//             config.data = {}
//         }
//         config.data = qs.stringify(config.data);
//     } else if (config.method === 'get') {

//     }
//     return config;

// }, error => {
//     return Promise.reject(error);
// })

// //
// axios.interceptors.response.use(function (res) {
//     if (typeof res.data === 'string') {
//         alert(res.data);
//         return false;
//     }
//     switch (res.data.code) {
//         case 10000:
//             return res.data;
//         case 300:
//             break;
//         default:
//             this.$message = res.data.msg;
//             return false;
//     }


// }, error => {
//     return Promise.reject(error)
// })

export default axios