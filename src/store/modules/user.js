export default{
    namespaced:true,
    state:{
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {
            token:'',
            user:[]
        }
    },
    mutations:{
        login_set_info(state , payload){
            sessionStorage.setItem('userInfo',JSON.stringify(payload));
            state.userInfo = payload;
        }
    },
    actions:{

    },
    getters:{

    }
}