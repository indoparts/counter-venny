/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        latitude: '',
        longitude: '',
        status: '',
        keterangan_absen: '',
        waktu_telat_masuk: '',
        foto_selfi: [],
    },
    rightMenuDrawer: [
        ['Absensi', 'mdi-fingerprint', 'users-absen', 'absensi-create'],
        ['List Data', 'mdi-view-list', 'list-data-absensi-user', 'absensi-viewList'],
        ['Grafik', 'mdi-chart-bar', 'grafik-data-absensi-user', 'absensi-viewList'],
        ['Laporan Absensi', 'mdi-chart-scatter-plot-hexbin', 'laporan-data-absensi', 'absensi-viewList'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            latitude: '',
            longitude: '',
            status: '',
            keterangan_absen: '',
            waktu_telat_masuk: '',
            foto_selfi: [],
        }
    },
}

const actions = {
    index({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortBy,
                sortDesc,
            } = payload.options
            $axios.get(`api/absensi?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    laporan({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortBy,
                sortDesc,
            } = payload.options
            const { search, between } = payload.attr
            $axios.get(`api/absensi-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    grafikAbsen() {
        return new Promise(resolve => {
            $axios.get(`api/absensi-chart`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitAbsen({ state, commit }) {
        return new Promise(resolve => {
            const { form } = state
            const formData = new FormData()
            formData.append('latitude', form.latitude)
            formData.append('longitude', form.longitude)
            formData.append('status', form.status)
            formData.append('keterangan_absen', form.keterangan_absen)
            formData.append('waktu_telat_masuk', form.waktu_telat_masuk)
            formData.append('foto_selfi', form.foto_selfi)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.post('api/absensi', formData, { headers })
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}