/* eslint-disable no-empty-pattern */
import $axios from '../api'
const state = () => ({
    form: {
        master_group_id: '',
        time_config_id: '',
        date: [],
    },
    rightMenuDrawer: [
        ['Form Pengaturan Kerja', 'mdi-form-select', 'jadwal-kerja.add', 'create-jadwalgroup'],
        ['List Data', 'mdi-view-list', 'jadwal-kerja.data', 'read-jadwalgroup'],
        ['Pengaturan Waktu Kerja', 'mdi-wrench-clock', 'jadwal-kerja.timeconfig', 'create-jadwalgroup'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            master_group_id: '',
            time_config_id: '',
            date: [],
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
            $axios.get(`api/jadwal-group?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}}`)
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
            $axios.get(`api/jadwal-group-attr-form?key=group&value=`)
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
            $axios.post('api/jadwal-group', state.form)
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
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/jadwal-group/${payload}`)
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