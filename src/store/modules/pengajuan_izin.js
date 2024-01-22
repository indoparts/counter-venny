/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        user_id: '',
        permit_req: '',
        req_type: '',
        date: '',
        todate: '',
        leave_duration: '',
        notes: '',
        user_id_approval: '',
        status_approval: 'n',
        file: [],
    },
    rightMenuDrawer: [
        ['Form Pengajuan Izin', 'mdi-form-select', 'izin.add', 'create-izin'],
        ['List Data', 'mdi-view-list', 'izin.data', 'read-izin'],
        ['Laporan Izin', 'mdi-chart-scatter-plot-hexbin', 'izin.laporan', 'report-izin'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            permit_req: '',
            req_type: '',
            date: '',
            todate: '',
            leave_duration: '',
            notes: '',
            user_id_approval: '',
            status_approval: 'n',
            file: [],
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
            $axios.get(`api/form-izin?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-izin?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}&daterange=${payload.daterange}`)
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
            $axios.get(`api/report-izin-export?daterange=${payload}`)
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
            $axios.put(`api/form-izin/approval/${id}`, { status_approval: status_approval })
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
            $axios.get(`api/form-izin-report?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&between=${between}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitIzin({ state }) {
        return new Promise(resolve => {
            const { form } = state
            const formData = new FormData()
            formData.append('user_id', form.user_id)
            formData.append('permit_req', form.permit_req)
            formData.append('req_type', form.req_type)
            formData.append('date', form.date)
            formData.append('todate', form.todate)
            formData.append('leave_duration', form.leave_duration)
            formData.append('notes', form.notes)
            formData.append('user_id_approval', form.user_id_approval)
            formData.append('status_approval', form.status_approval)
            formData.append('file', form.file)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.post('api/form-izin', formData, { headers })
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