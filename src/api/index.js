import Vue from 'vue';
// import ajax from './axios';
import ajax from 'axios'
import qs from 'qs'
// import { config } from 'vue/types/umd';
let api = {
    user:{
        test: params =>{
            return ajax.get('http://tp6.lesson.cn/index.php/front/test',params)
        },
        //登录
        login: params =>{
            return ajax.post('http://blogs.xiaxianxian.top/login',params)
        },
        //登录验证
        auth: (headers) =>{
            return ajax.get('http://blogs.xiaxianxian.top/info',{headers})
        },
        //注册

        //获取用户信息http://blogs.xiaxianxian.top/get_user?id=5
        get_user_info:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/get_user',{params})
        },

    },
    upload:{
        mdUrl: params =>{
            return ajax.get('http://127.0.0.1:8803/project.md',params)
        } 
    },
    article:{
        addArt: params =>{
            return ajax.post('http://blogs.xiaxianxian.top/article_add',params);
        },
         art(params){
            return ajax.post('http://blogs.xiaxianxian.top/article_add',params)
        },
        test(params){
            return ajax.post('http://tp6.lesson.cn/index.php/front/login',params)
        },
        //分页
        getPage: (params) =>{
            return ajax.get('http://blogs.xiaxianxian.top/get_article_page',{params})
        },
        //文章详细
        get_art_content:(params) =>{
            return ajax.get('http://blogs.xiaxianxian.top/get_art_detail',{params})
        },
        //art_url
        get_art_url:(url)=>{
            return ajax.get(url);
        },
        //单篇文章 刷新用
        get_one_art:(params) =>{
            return ajax.get('http://blogs.xiaxianxian.top/get_article',{params})
        },
        //随机文章
        get_rand_art:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/rand_article',{params})
        },
        //文章搜索
        get_search:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/search',{params})
        },
        //用户的文章
        get_particular_art:(params) => {
            return ajax.get('http://blogs.xiaxianxian.top/get_user_art',{params})
        }
    },
    banner:{
        add_banner:params=>{
            return ajax.post('http://blogs.xiaxianxian.top/add_banner',params)

        },
        get_banner:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/get_banner',{params})
        },
        get_user_banner:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/get_user_banner',{params})
            
        },
        get_all_banner:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/get_all_banner',{params})

        }
    },
    comment:{
        get_comment:(params)=>{
            return ajax.get('http://blogs.xiaxianxian.top/get_comment',{params})
        },
        add_comment:params=>{
            return ajax.post('http://blogs.xiaxianxian.top/add_comment',params)
        },
        add_reply:params=>{
            return ajax.post('http://blogs.xiaxianxian.top/add_reply',params)
        }
    },
    it:{
        //站点信息
        station: () =>{
            return ajax.get('http://blogs.xiaxianxian.top/station_count')

        },
        //ip 地址解析
        ip_set:(params)=>{
            return ajax.get('http://apis.map.qq.com/ws/location/v1/ip',{
                params
            })

        }
    }
}

export default {
    install: Vue =>{
        Vue.api = api,  
        Vue.prototype.$api = api;
    }
}