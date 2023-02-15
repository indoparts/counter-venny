import $axios from '../api'

const state = () => ({
    authenticated: [],
    permissions: [],
})

const mutations = {
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permissions = payload
    },
}

const actions = {
    submitLogin({ commit }, payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise(resolve => {
            $axios.post('login', payload)
                .then(response => {
                    if (response.data.status) {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('expires_at', response.data.data.expires_at)
                        commit('SET_TOKEN', response.data.data.token, { root: true })
                        commit('SET_TOKEN_EXPIRED', response.data.data.expires_at, { root: true })
                    }
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    logout({ commit }) {
        return new Promise(resolve => {
            $axios.post('logout')
                .then(response => {
                    localStorage.setItem('token', null)
                    commit('SET_TOKEN', null, { root: true })
                    resolve(response.data.status)
                })
                .catch(error => {
                    resolve(error.response.data.status)
                })
        })
    },
    getUserLogin({ commit }) {
        return new Promise(resolve => {
            $axios.get('profile')
                .then(response => {
                    // console.log(response.data.data.user);
                    commit('ASSIGN_USER_AUTH', response.data.data.user)
                    commit('ASSIGN_PERMISSION', response.data.data.permission)
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