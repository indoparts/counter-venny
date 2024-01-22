import Vue from 'vue'
import Vuex from 'vuex'

// modules::start
import auth from './modules/auth.js'
import beranda from './modules/beranda.js'
import absensi from './modules/absensi.js'
import masterdata_user from './modules/masterdata_user.js'
import user_group from './modules/user_group.js'
import masterdata_role from './modules/masterdata_role.js'
import masterdata_akses from './modules/masterdata_akses.js'
import masterdata_toko from './modules/masterdata_toko.js'
import masterdata_office from './modules/masterdata_office.js'
import masterdata_gudang from './modules/masterdata_gudang.js'
import masterdata_dept from './modules/masterdata_dept.js'
import masterdata_pelanggan from './modules/masterdata_pelanggan.js'
import pengajuan_cuti from './modules/pengajuan_cuti.js'
import pengajuan_izin from './modules/pengajuan_izin.js'
import pengajuan_lembur from './modules/pengajuan_lembur.js'
import pengajuan_perdin from './modules/pengajuan_perdin.js'
import pengajuan_reimburs from './modules/pengajuan_reimburs.js'
import jadwal_istirahat from './modules/jadwal_istirahat.js'
import jadwal_piket from './modules/jadwal_piket.js'
import jadwal_kerja from './modules/jadwal_kerja.js'
import time_config from './modules/time_config.js'
import masterdata_piket from './modules/masterdata_piket.js'
import summary_gaji from './modules/summary_gaji.js'
import summary_kasbon from './modules/summary_kasbon.js'
import gaji from './modules/gaji.js'
import resign from './modules/resign.js'
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
    beranda,
    absensi,
    masterdata_user,
    user_group,
    masterdata_role,
    masterdata_akses,
    masterdata_toko,
    masterdata_office,
    masterdata_gudang,
    masterdata_dept,
    masterdata_pelanggan,
    pengajuan_cuti,
    pengajuan_izin,
    pengajuan_lembur,
    pengajuan_perdin,
    pengajuan_reimburs,
    jadwal_istirahat,
    jadwal_piket,
    jadwal_kerja,
    time_config,
    masterdata_piket,
    summary_gaji,
    summary_kasbon,
    gaji,
    resign
  }
})
