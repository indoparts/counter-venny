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
                sortDesc,
            } = payload.options
            $axios.get(`/master-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`/report-master-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    submitCreate({ }, payload) {
        return new Promise(resolve => {
            $axios.post('master-piket', payload)
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
            $axios.get(`master-piket/${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ }, payload) {
        return new Promise(resolve => {
            $axios.put(`master-piket/${payload.id}`, payload.form)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    destroy({ }, payload) {
        return new Promise(resolve => {
            $axios.delete(`master-piket/${payload}`)
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