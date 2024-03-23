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
        ['Form Pengaturan Jam Istirahat', 'mdi-form-select', 'jadwal-istirahat.add', 'jadwalistirahat-viewList'],
        ['List Data', 'mdi-view-list', 'jadwal-istirahat.data', 'jadwalistirahat-viewList'],
        ['Laporan Jam Istirahat', 'mdi-chart-scatter-plot-hexbin', 'jadwal-istirahat.laporan', 'jadwalistirahat-viewList'],
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
            $axios.get(`api/jadwal-istirahat?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-jadwal-istirahat?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-jadwal-istirahat-export?daterange=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_get_groupUser({ }) {
        return new Promise(resolve => {
            $axios.get(`api/jadwal-istirahat-attr-form?key=group&value=`)
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
            $axios.get(`api/jadwal-istirahat-attr-form?key=user&value=${payload}`)
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
            $axios.post('api/jadwal-istirahat', state.form)
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