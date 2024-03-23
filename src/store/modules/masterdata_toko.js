/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        nama: '',
        alamat: '',
        telepon: '',
        latitude: '',
        longitude: '',
        radius_forabsen: '',
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-toko.data', 'mastertoko-viewList'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-toko.add', 'mastertoko-create'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    SET_FORM(state, payload) {
        state.form = {
            nama: payload.nama,
            alamat: payload.alamat,
            telepon: payload.telepon,
            latitude: payload.latitude,
            longitude: payload.longitude,
            radius_forabsen: payload.radius_forabsen,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            nama: '',
            alamat: '',
            telepon: '',
            latitude: '',
            longitude: '',
            radius_forabsen: '',
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
            $axios.get(`api/master-toko?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
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
            $axios.post('api/master-toko', state.form)
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
            $axios.get(`api/master-toko/${payload}`)
                .then(response => {
                    const form = {
                        nama: response.data.data.nama,
                        alamat: response.data.data.alamat,
                        telepon: response.data.data.telepon,
                        latitude: response.data.data.latitude,
                        longitude: response.data.data.longitude,
                        radius_forabsen: response.data.data.radius_forabsen,
                    }
                    console.log(form);
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
            $axios.put(`api/master-toko/${payload}`, state.form)
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
            $axios.delete(`api/master-toko/${payload}`)
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