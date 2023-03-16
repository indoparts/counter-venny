/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        master_piket_id:'',
        dept_id:'',
        role_id:'',
        user_id:'',
        time:'',
        date:'',
        status:'n',
    },
    rightMenuDrawer: [
        ['Form Pengaturan Piket', 'mdi-form-select', 'jadwal-piket.add', 'create-jadwalpiket'],
        ['List Data', 'mdi-view-list', 'jadwal-piket.data', 'read-jadwalpiket'],
        ['Laporan Piket', 'mdi-chart-scatter-plot-hexbin', 'jadwal-piket.laporan', 'report-jadwalpiket'],
        ['Master Data Piket', 'mdi-database', 'masterdata-piket', 'report-jadwalpiket'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            master_piket_id: '',
            dept_id: '',
            role_id: '',
            user_id: '',
            time: '',
            date: '',
            status: 'n',
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
            $axios.get(`/jadwal-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`/report-jadwal-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`/report-jadwal-piket-export?daterange=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr({ }) {
        return new Promise(resolve => {
            $axios.get(`jadwal-piket-attr-form?key=attr&value=`)
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
            $axios.get(`jadwal-piket-attr-form?key=user&value=${payload}`)
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
            $axios.post('jadwal-piket', state.form)
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