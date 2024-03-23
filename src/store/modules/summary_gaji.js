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
        ['Setup Formula Gaji', 'mdi-form-select', 'summary-gaji.formula', 'jadwalpiket-create'],
        ['Generate Gaji', 'mdi-cash-sync', 'summary-gaji.generate', 'jadwalpiket-viewList'],
        ['List Data', 'mdi-view-list', 'summary-gaji.data', 'jadwalpiket-viewList'],
        ['Laporan Gaji', 'mdi-chart-scatter-plot-hexbin', 'summary-gaji.laporan', 'jadwalpiket-viewList'],
        ['Selip Gaji', 'mdi-smart-card', 'summary-gaji.selip', 'jadwalpiket-viewList'],
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
    indexFormula({ }) {
        return new Promise(resolve => {
            $axios.get(`api/formula-gaji`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    storeFormula({ }, payload) {
        return new Promise(resolve => {
            $axios.post(`api/formula-gaji`, payload)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    deleteFormula({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/formula-gaji/${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    generateData({ }, payload) {
        return new Promise(resolve => {
            $axios.post(`api/formula-gaji/generate`, payload)
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