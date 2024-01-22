/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
})

const mutations = {
}

const actions = {
    index({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortBy,
                sortDesc
            } = payload
            $axios.get(`api/user-group?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ }, payload) {
        return new Promise(resolve => {
            $axios.post('api/user-group', payload)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/user-group/${payload}`)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/user-group/${payload.id}`, payload.data)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    delete({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/user-group/${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    indexGroup({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortDesc
            } = payload.options
            $axios.get(`api/master-group?page=${page}&limit=${itemsPerPage}&sortDesc=${sortDesc}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    storeGroup({ }, payload) {
        return new Promise(resolve => {
            $axios.post('api/master-group', payload)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    editGroup({ }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/master-group/${payload}`)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    updateGroup({ }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/master-group/${payload.id}`, payload.data)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    deleteGroup({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`api/master-group/${payload}`)
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