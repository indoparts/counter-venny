/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        user_id: '',
        tempat_tujuan: '',
        tgl_brangkat: '',
        tgl_kembali: '',
        tujuan_perdin: '',
        user_id_approval: '',
        status_approval: 'n',
    },
    rightMenuDrawer: [
        ['Form Pengajuan PERDIN', 'mdi-form-select', 'perdin.add', 'create-perdin'],
        ['List Data', 'mdi-view-list', 'perdin.data', 'read-perdin'],
        ['Laporan PERDIN', 'mdi-chart-scatter-plot-hexbin', 'perdin.laporan', 'report-perdin'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            tempat_tujuan: '',
            tgl_brangkat: '',
            tgl_kembali: '',
            tujuan_perdin: '',
            user_id_approval: '',
            status_approval: 'n',
        }
    },
    SET_FORM(state, payload) {
        state.form = {
            user_id: payload.user_id,
            tempat_tujuan: payload.tempat_tujuan,
            tgl_brangkat: payload.tgl_brangkat,
            tgl_kembali: payload.tgl_kembali,
            tujuan_perdin: payload.tujuan_perdin,
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
            $axios.get(`api/form-perdin?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-perdin?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-perdin-export?daterange=${payload}`)
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
            $axios.put(`api/form-perdin/approval/${id}`, { status_approval: status_approval })
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
            $axios.get(`api/form-perdin-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitPerdin({ state }) {
        return new Promise(resolve => {
            $axios.post('api/form-perdin', state.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    editPerdin({ commit }, payload) {
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
            $axios.get(`api/form-perdin/${payload}`)
                .then(response => {
                    response.data.data['tgl_brangkat'] = formatDate(response.data.data.tgl_brangkat)
                    response.data.data['tgl_kembali'] = formatDate(response.data.data.tgl_kembali)
                    commit('SET_FORM', response.data.data)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    updatePerdin({ state }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/form-perdin/${payload}`, state.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    deletePerdin({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/form-perdin/${payload}`)
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