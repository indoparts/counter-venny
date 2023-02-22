import Vue from 'vue'
import Vuex from 'vuex'

// modules::start
import auth from './modules/auth.js'
import absensi from './modules/absensi.js'
import masterdata_user from './modules/masterdata_user.js'
import masterdata_role from './modules/masterdata_role.js'
import masterdata_akses from './modules/masterdata_akses.js'
import masterdata_toko from './modules/masterdata_toko.js'
import masterdata_pelanggan from './modules/masterdata_pelanggan.js'
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
    absensi,
    masterdata_user,
    masterdata_role,
    masterdata_akses,
    masterdata_toko,
    masterdata_pelanggan,
  }
})
