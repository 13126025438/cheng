import Vue from 'vue'
import Vuex from 'vuex'

import search from './modules/search'
import user from './modules/user'
import page_info from './modules/page_info'
import it from './modules/it'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters:{
  },
  modules: {
    search,
    user,
    page_info,
    it
  }
})
