/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        user_id: '',
        date: '',
        category: '',
        user_id_approval: '',
        status_approval: 'n',
        file_receipt:[]
    },
    rightMenuDrawer: [
        ['Form Pengajuan Reimburs', 'mdi-form-select', 'reimburs.add', 'reimburs-create'],
        ['List Data', 'mdi-view-list', 'reimburs.data', 'reimburs-viewList'],
        ['Laporan Reimburs', 'mdi-chart-scatter-plot-hexbin', 'reimburs.laporan', 'reimburs-viewList'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            date: '',
            category: '',
            user_id_approval: '',
            status_approval: 'n',
            file_receipt:[]
        }
    },
    SET_FORM(state, payload) {
        state.form = {
            user_id: payload.user_id,
            date: payload.date,
            category: payload.category,
            user_id_approval: payload.user_id_approval,
            status_approval: payload.status_approval,
            file_receipt:[]
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
            $axios.get(`api/form-reimburs?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-reimburs?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-reimburs-export?daterange=${payload}`)
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
            $axios.put(`api/form-reimburs/approval/${id}`, { status_approval: status_approval })
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
            $axios.get(`api/form-reimburs-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitReimburs({ state }) {
        return new Promise(resolve => {
            const { form } = state
            const formData = new FormData()
            formData.append('user_id', form.user_id)
            formData.append('date', form.date)
            formData.append('category', form.category)
            formData.append('user_id_approval', form.user_id_approval)
            formData.append('status_approval', form.status_approval)
            formData.append('file_receipt', form.file_receipt)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.post('api/form-reimburs', formData, { headers })
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    editReimburs({ commit }, payload) {
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
            $axios.get(`api/form-reimburs/${payload}`)
                .then(response => {
                    response.data.data['date'] = formatDate(response.data.data.date)
                    commit('SET_FORM', response.data.data)
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    updateReimburs({ state }, payload) {
        return new Promise(resolve => {
            const { form } = state
            const formData = new FormData()
            formData.append('user_id', form.user_id)
            formData.append('date', form.date)
            formData.append('category', form.category)
            formData.append('user_id_approval', form.user_id_approval)
            formData.append('status_approval', form.status_approval)
            formData.append('file_receipt', form.file_receipt)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.put(`api/form-reimburs/${payload}`, formData, { headers })
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    deleteReimburs({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/form-reimburs/${payload}`)
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