/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        master_piket_id: '',
        dept_id: '',
        role_id: '',
        user_id: '',
        time: '',
        date: '',
        status: 'n',
    },
    rightMenuDrawer: [
        ['Setup Formula Gaji', 'mdi-form-select', 'summary-gaji.formula', 'create-jadwalpiket'],
        ['Generate Gaji', 'mdi-cash-sync', 'summary-gaji.data', 'read-jadwalpiket'],
        ['List Data', 'mdi-view-list', 'summary-gaji.data', 'read-jadwalpiket'],
        ['Laporan Gaji', 'mdi-chart-scatter-plot-hexbin', 'summary-gaji.laporan', 'report-jadwalpiket'],
        ['Selip Gaji', 'mdi-smart-card', 'summary-gaji.selip', 'report-jadwalpiket'],
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
    indexVariable({ }) {
        return new Promise(resolve => {
            $axios.get(`api/variable-gaji`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    storeVariable({ }, payload) {
        return new Promise(resolve => {
            $axios.post(`api/variable-gaji`, payload)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    deleteVariable({ }, payload) {
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
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}