/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        user_id: '',
        nominal_pinjaman: '',
        nominal_angsuran: '',
        tenor: '',
        status_pinjaman: 'belum-lunas',
        user_id_approval: '',
        status_approval: 'w',
    },
    rightMenuDrawer: [
        ['Form Kasbon', 'mdi-form-select', 'summary-kasbon.form', 'create-jadwalpiket'],
        ['List Data', 'mdi-view-list', 'summary-kasbon.data', 'read-jadwalpiket'],
        ['Laporan Kasbon', 'mdi-chart-scatter-plot-hexbin', 'summary-kasbon.report', 'report-jadwalpiket'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            nominal_pinjaman: '',
            nominal_angsuran: '',
            tenor: '',
            status_pinjaman: 'belum-lunas',
            user_id_approval: '',
            status_approval: 'w',
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
                sortDesc
            } = payload.options
            const search = payload.authId
            $axios.get(`api/kasbon?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
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
            $axios.get(`api/kasbon-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-kasbon-export?daterange=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    create({ }) {
        return new Promise(resolve => {
            $axios.get(`api/kasbon-create`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ state }) {
        return new Promise(resolve => {
            $axios.post(`api/kasbon`, state.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/variable-gaji/${payload}`)
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
            $axios.get('api/kasbon-user')
                .then(response => {
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