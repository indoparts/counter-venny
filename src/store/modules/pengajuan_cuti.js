/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        user_id: '',
        remaining: '',
        leave_req: '',
        req_type: '',
        date: '',
        todate: '',
        leave_duration: '',
        notes: '',
        user_id_approval: '',
        status_approval: '',
    },
    rightMenuDrawer: [
        ['Form Pengajuan Cuti', 'mdi-form-select', 'cuti.add', 'create-cuti'],
        ['List Data', 'mdi-view-list', 'cuti.data', 'read-cuti'],
        ['Laporan Cuti', 'mdi-chart-scatter-plot-hexbin', 'cuti.laporan', 'report-cuti'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            remaining: '',
            leave_req: '',
            req_type: '',
            date: '',
            todate: '',
            leave_duration: '',
            notes: '',
            user_id_approval: '',
            status_approval: '',
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
            $axios.get(`/form-cuti?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    user_approval() {
        return new Promise(resolve => {
            $axios.get('/user-approval')
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
            $axios.get(`/form-cuti-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitCuti({ state, commit }) {
        return new Promise(resolve => {
            $axios.post('absensi', state.form)
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