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
        status_approval: 'n',
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
            status_approval: 'n',
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
            $axios.get(`api/form-cuti?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-cuti?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-cuti-export?daterange=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    user() {
        return new Promise(resolve => {
            $axios.get('api/user-approval')
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    approval_cuti({ }, payload) {
        const { id, status_approval } = payload
        return new Promise(resolve => {
            $axios.put(`api/form-cuti/approval/${id}`, { status_approval: status_approval })
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
            $axios.get(`api/form-cuti-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
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
            $axios.post('api/form-cuti', state.form)
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