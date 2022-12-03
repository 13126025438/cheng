export default{
    namespaced:true,
    state:{
        search_result:[],
        article_state:[],
        isSearch : false,
        isShowSwiper:true,
    },
    mutations:{
        search(state,payload){
            state.search_result = payload
        },
        set_article(state, payload){
            state.article_state = payload;
        },
        set_search(state,payload){
            state.article_state = state.search_result
        },
        set_isShowSwiper(state,payload){
            state.isShowSwiper = payload;
        }
    },
    actions:{
          action_search : ({ commit }, payload) => {
            commit('search', payload);
          }
    },
    getters:{
        get_article_state: state => {
            return state.article_state;
          }
    }
}