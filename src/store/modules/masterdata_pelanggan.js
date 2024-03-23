/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        nama: '',
        email: '',
        telp: '',
        alamat: '',
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-pelanggan.data', 'masterpelanggan-viewList'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-pelanggan.add', 'masterpelanggan-create'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    SET_FORM(state, payload) {
        state.form = {
            nama: payload.nama,
            email: payload.email,
            telp: payload.telp,
            alamat: payload.alamat,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            nama: '',
            email: '',
            telp: '',
            alamat: '',
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
            const search = payload.search
            $axios.get(`api/pelanggan?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ state, commit }) {
        return new Promise(resolve => {
            $axios.post('api/pelanggan', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ commit }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/pelanggan/${payload}`)
                .then(response => {
                    const form = {
                        nama: response.data.data.nama,
                        email: response.data.data.email,
                        telp: response.data.data.telp,
                        alamat: response.data.data.alamat,
                    }
                    commit('SET_FORM', form)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ state, commit }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/pelanggan/${payload}`, state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/pelanggan/${payload}`)
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