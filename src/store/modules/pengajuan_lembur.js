/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        user_id: '',
        date: '',
        waktu_mulai: '',
        waktu_berakhir: '',
        uraian_tugas: '',
        user_id_approval: '',
        status_approval: 'n',
    },
    rightMenuDrawer: [
        ['Form Pengajuan Lembur', 'mdi-form-select', 'lembur.add', 'lembur-create'],
        ['List Data', 'mdi-view-list', 'lembur.data', 'lembur-viewList'],
        ['Laporan Lembur', 'mdi-chart-scatter-plot-hexbin', 'lembur.laporan', 'lembur-viewList'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            date: '',
            waktu_mulai: '',
            waktu_berakhir: '',
            uraian_tugas: '',
            user_id_approval: '',
            status_approval: 'n',
        }
    },
    SET_FORM(state, payload) {
        state.form = {
            user_id: payload.user_id,
            date: payload.date,
            waktu_mulai: payload.waktu_mulai,
            waktu_berakhir: payload.waktu_berakhir,
            uraian_tugas: payload.uraian_tugas,
            user_id_approval: payload.user_id_approval,
            status_approval: payload.status_approval,
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
            $axios.get(`api/form-lembur?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-lembur?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-lembur-export?daterange=${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    approval_izin({ }, payload) {
        const { id, status_approval } = payload
        return new Promise(resolve => {
            $axios.put(`api/form-lembur/approval/${id}`, { status_approval: status_approval })
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
    laporan({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortBy,
                sortDesc,
            } = payload.options
            const { search, between } = payload.attr
            $axios.get(`api/form-lembur-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitLembur({ state }) {
        return new Promise(resolve => {
            $axios.post('api/form-lembur', state.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    editLembur({ commit }, payload) {
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        return new Promise(resolve => {
            $axios.get(`api/form-lembur/${payload}`)
                .then(response => {
                    response.data.data['date'] = formatDate(response.data.data.date)
                    commit('SET_FORM', response.data.data)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    updateLembur({ state }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/form-lembur/${payload}`, state.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    deleteLembur({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/form-lembur/${payload}`)
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