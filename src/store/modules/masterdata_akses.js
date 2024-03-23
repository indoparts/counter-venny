/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        name: '',
        permission: []
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-akses.data', 'permission-viewList'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-akses.add', 'permission-create'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    SET_FORM(state, payload) {
        state.form = {
            name: payload.name,
            permission: payload.permission,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            name: '',
            permission: '',
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
            $axios.get(`api/permission?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
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
            $axios.post('api/permission', state.form)
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
            $axios.get(`api/permission/${payload}`)
                .then(response => {
                    const parse = response.data.data.name.split('-')
                    const form = {
                        name: parse[1],
                        permission: parse[0],
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
            $axios.put(`api/permission/${payload}`, state.form)
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
            $axios.delete(`api/permission/${payload}`)
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