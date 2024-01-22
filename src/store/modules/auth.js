/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    authenticated: [],
    permissions: [],
    formProfile: {
        role_id: '',
        dept_id: '',
        name: '',
        email: '',
        nik: '',
        password: '',
        password_confirmation: '',
        work_location: '',
        saldo_cuti: '',
        activation: '',
        avatar: [],
    },
})

const mutations = {
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permissions = payload
    },
    SET_FORM_PROFILE(state, payload) {
        state.formProfile = {
            role_id: payload.role_id,
            dept_id: payload.dept_id,
            name: payload.name,
            email: payload.email,
            nik: payload.nik,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
            activation: payload.activation,
            avatar: payload.avatar,
            work_location: payload.work_location,
            saldo_cuti: payload.saldo_cuti,
            hp: payload.hp,
            status: payload.status,
            tgl_join: payload.tgl_join,
            limit_kasbon: payload.limit_kasbon,
        }
    },
    CLEAR_FORM_PROFILE(state) {
        state.formProfile = {
            role_id: '',
            dept_id: '',
            name: '',
            email: '',
            nik: '',
            password: '',
            password_confirmation: '',
            activation: '',
            avatar: [],
            work_location: '',
            saldo_cuti: '',
            hp: '',
            status: '',
            tgl_join: '',
            limit_kasbon: '',
        }
    },
}

const actions = {
    submitLogin({ commit }, payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise(resolve => {
            $axios.post('api/login', payload)
                .then(response => {
                    if (response.data.status) {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('expires_at', response.data.data.expires_at)
                        commit('SET_TOKEN', response.data.data.token, { root: true })
                        commit('SET_TOKEN_EXPIRED', response.data.data.expires_at, { root: true })
                    }
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    logout({ commit }) {
        return new Promise(resolve => {
            $axios.post('api/logout')
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
            $axios.get('api/profile')
                .then(response => {
                    commit('ASSIGN_USER_AUTH', response.data.data.user)
                    commit('ASSIGN_PERMISSION', response.data.data.permission)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_form_user() {
        return new Promise(resolve => {
            $axios.get('api/attr_form')
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    getProfile({ commit }) {
        return new Promise(resolve => {
            $axios.get('api/profile')
                .then(response => {
                    const user = response.data.data.user;
                    const payload = {
                        role_id: user.role_id,
                        dept_id: user.dept_id,
                        name: user.name,
                        email: user.email,
                        nik: user.nik,
                        password: '',
                        password_confirmation: '',
                        activation: user.activation === 'true' ? true : false,
                        avatar: [],
                        work_location: user.work_location,
                        saldo_cuti: user.saldo_cuti,
                        hp: user.hp,
                        status: user.status,
                        tgl_join: '',
                        limit_kasbon: user.limit_kasbon,
                    }
                    commit('SET_FORM_PROFILE', payload)
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    getNotifTask({ }) {
        return new Promise(resolve => {
            $axios.get('fetch-notification/piket-istirahat')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    getNotifInfo({ }) {
        return new Promise(resolve => {
            $axios.get('fetch-notification/info')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    updateProfile({ state }) {
        return new Promise(resolve => {
            const { formProfile } = state
            const formData = new FormData()
            formData.append('role_id', formProfile.role_id)
            formData.append('dept_id', formProfile.dept_id)
            formData.append('name', formProfile.name)
            formData.append('email', formProfile.email)
            formData.append('nik', formProfile.nik)
            formData.append('password', formProfile.password)
            formData.append('password_confirmation', formProfile.password_confirmation)
            formData.append('activation', formProfile.activation)
            formData.append('avatar', formProfile.avatar)
            formData.append('work_location', formProfile.work_location)
            formData.append('saldo_cuti', formProfile.saldo_cuti)
            formData.append('hp', formProfile.hp)
            formData.append('status', formProfile.status)
            formData.append('tgl_join', formProfile.tgl_join)
            formData.append('limit_kasbon', formProfile.limit_kasbon)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.post('profile-update', formData, { headers })
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