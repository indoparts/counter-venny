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
        ['Form Pengaturan Piket', 'mdi-form-select', 'jadwal-piket.add', 'jadwalpiket-create'],
        ['List Data', 'mdi-view-list', 'jadwal-piket.data', 'jadwalpiket-viewList'],
        ['Laporan Piket', 'mdi-chart-scatter-plot-hexbin', 'jadwal-piket.laporan', 'jadwalpiket-viewList'],
        ['Master Data Piket', 'mdi-database', 'masterdata-piket', 'jadwalpiket-viewList'],
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
            $axios.get(`api/jadwal-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-jadwal-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-jadwal-piket-export?daterange=${payload}`)
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
            $axios.get(`api/jadwal-piket-attr-form?key=group&value=`)
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
            $axios.get(`api/jadwal-piket-attr-form?key=user&value=${payload}`)
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
            $axios.post('api/jadwal-piket', state.form)
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
    submitUpdate({ }, payload) {
        return new Promise(resolve => {
            const formData = new FormData()
            formData.append('filebefore', payload.filebefore)
            formData.append('fileafter', payload.fileafter)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.put(`fetch-notification/piket-istirahat/${payload.id}`, formData, { headers })
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