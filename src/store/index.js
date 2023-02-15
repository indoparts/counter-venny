import Vue from 'vue'
import Vuex from 'vuex'

// modules::start
import auth from './modules/auth.js'
import absensi from './modules/absensi.js'
// modules::end

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    token_expired: localStorage.getItem('expires_at'),
  },
  getters: {
    isAuth: state => state.token !== 'null' && state.token != null,
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_TOKEN_EXPIRED(state, payload) {
      state.token_expired = payload
    },
  },
  actions: {
  },
  modules: {
    auth,
    absensi
  }
})
