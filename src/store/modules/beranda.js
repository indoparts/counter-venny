/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
})

const mutations = {
}

const actions = {
    index({ }) {
        return new Promise(resolve => {
            $axios.get(`api/beranda`)
                .then(response => {
                    resolve(response)
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