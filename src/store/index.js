import Vue from 'vue'
import Vuex from 'vuex'

// modules::start
import auth from './modules/auth.js'
import absensi from './modules/absensi.js'
import masterdata_user from './modules/masterdata_user.js'
import masterdata_role from './modules/masterdata_role.js'
import masterdata_akses from './modules/masterdata_akses.js'
import masterdata_toko from './modules/masterdata_toko.js'
import masterdata_office from './modules/masterdata_office.js'
import masterdata_gudang from './modules/masterdata_gudang.js'
import masterdata_dept from './modules/masterdata_dept.js'
import masterdata_pelanggan from './modules/masterdata_pelanggan.js'
import pengajuan_cuti from './modules/pengajuan_cuti.js'
import pengajuan_izin from './modules/pengajuan_izin.js'
import jadwal_istirahat from './modules/jadwal_istirahat.js'
import jadwal_piket from './modules/jadwal_piket.js'
import masterdata_piket from './modules/masterdata_piket.js'
import summary_gaji from './modules/summary_gaji.js'
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
    masterdata_office,
    masterdata_gudang,
    masterdata_dept,
    masterdata_pelanggan,
    pengajuan_cuti,
    pengajuan_izin,
    jadwal_istirahat,
    jadwal_piket,
    masterdata_piket,
    summary_gaji,
  }
})
