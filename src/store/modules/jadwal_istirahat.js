/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        dept_id: '',
        role_id: '',
        user_id: '',
        time: null,
        date: null,
    },
    rightMenuDrawer: [
        ['Form Pengaturan Jam Istirahat', 'mdi-form-select', 'jadwal-istirahat.add', 'create-jadwalistirahat'],
        ['List Data', 'mdi-view-list', 'jadwal-istirahat.data', 'read-jadwalistirahat'],
        ['Laporan Jam Istirahat', 'mdi-chart-scatter-plot-hexbin', 'jadwal-istirahat.laporan', 'report-jadwalistirahat'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            dept_id: '',
            role_id: '',
            user_id: '',
            time: null,
            date: null,
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
            $axios.get(`/jadwal-istirahat?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    report({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortBy,
                sortDesc,
            } = payload.options
            $axios.get(`/report-jadwal-istirahat?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    reportExport({ }, payload) {
        return new Promise(resolve => {
            $axios.get(`/report-jadwal-istirahat-export?daterange=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_get_dept({ }) {
        return new Promise(resolve => {
            $axios.get(`jadwal-istirahat-attr-form?key=divisi&value=`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_get_jabatan({ }) {
        return new Promise(resolve => {
            $axios.get(`jadwal-istirahat-attr-form?key=jabatan&value=`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_get_user({ }, payload) {
        return new Promise(resolve => {
            $axios.get(`jadwal-istirahat-attr-form?key=user&value=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitCreate({ state, commit }) {
        return new Promise(resolve => {
            $axios.post('jadwal-istirahat', state.form)
                .then(response => {
                    if (response.data.status === true) {
                        commit('CLEAR_FORM')
                    }
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