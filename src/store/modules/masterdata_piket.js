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
            $axios.get(`api/master-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}`)
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
            $axios.get(`api/report-master-piket?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${payload.authId}}`)
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
            $axios.post('api/master-piket', payload)
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
            $axios.get(`api/master-piket/${payload}`)
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
            $axios.put(`api/master-piket/${payload.id}`, payload.form)
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
            $axios.delete(`api/master-piket/${payload}`)
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