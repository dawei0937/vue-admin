import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      'count': 2,
      'hello': 1000,
      'leftNav': [
          {
            'path': '/',
            'text':  '系统信息'
          },
          {
            'path': 'update',
            'text':  '更新说明'
          },
          {
            'path': 'notice',
            'text':  '公告消息'
          }
      ]
  },

  getters: {
        get_left_nav: function(state){
            return state.leftNav;
        }
  },

  actions: {
        fetchNavLeft({commit,state},data) {
           console.log(data)
           commit('changeLeftNav',data)
         }
  },

  mutations: {
      changeLeftNav(state, payload) {
        state.leftNav = payload
      },
  }

});
