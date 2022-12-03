export default{
    namespaced:true,
    state:{
      headerBgk:{
            title_info: JSON.parse(sessionStorage.getItem('title_info')) ||{

            }
      },
        
    },
    mutations:{
     mut_title_info(state,payload){
      sessionStorage.setItem('title_info',JSON.stringify(payload));
        state.headerBgk.title_info = payload;
     }
    },
    actions:{

    },
    getters:{
      comp_title_info:state=>{
        return state.headerBgk.title_info;
      }
    }
}
