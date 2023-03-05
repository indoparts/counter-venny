/* eslint-disable no-empty-pattern */
import $axios from '../api'
import moment from 'moment'

const state = () => ({
    form: {
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
        work_location_master: '',
        saldo_cuti: '',
        hp: '',
        status: '',
        tgl_join: '',
        limit_kasbon: '',
        total_gaji_perbulan: '',
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-pengguna.data', 'read-user'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-pengguna.add', 'create-user'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
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
            work_location_master: '',
            saldo_cuti: '',
            hp: '',
            status: '',
            tgl_join: '',
            limit_kasbon: '',
            total_gaji_perbulan: '',
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
            $axios.get(`/users?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    attr_form_user() {
        return new Promise(resolve => {
            $axios.get('/attr_form')
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
            const { form } = state
            const formData = new FormData()
            formData.append('role_id', form.role_id)
            formData.append('dept_id', form.dept_id)
            formData.append('name', form.name)
            formData.append('email', form.email)
            formData.append('nik', form.nik)
            formData.append('password', form.password)
            formData.append('password_confirmation', form.password_confirmation)
            formData.append('activation', form.activation)
            formData.append('avatar', form.avatar)
            formData.append('work_location', form.work_location)
            formData.append('work_location_master', form.work_location_master)
            formData.append('saldo_cuti', form.saldo_cuti)
            formData.append('hp', form.hp)
            formData.append('status', form.status)
            formData.append('tgl_join', form.tgl_join)
            formData.append('limit_kasbon', form.limit_kasbon)
            formData.append('total_gaji_perbulan', form.total_gaji_perbulan)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.post('users', formData, { headers })
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({state}, payload) {
        return new Promise(resolve => {
            $axios.get(`/users/${payload}`)
                .then(response => {
                    const x = response.data.data
                    console.log(x[0].dept_id);
                    state.form = {
                        role_id: x[0].role_id,
                        dept_id: x[0].dept_id,
                        name: x[0].name,
                        email: x[0].email,
                        nik: x[0].nik,
                        password: '',
                        password_confirmation: '',
                        activation: x[0].activation === 'true'?true:false,
                        avatar: [],
                        work_location: x[0].work_location,
                        work_location_master: x[1],
                        saldo_cuti: x[0].saldo_cuti,
                        hp: x[0].hp,
                        status: x[0].status,
                        tgl_join: x[0].tgl_join,
                        limit_kasbon: x[0].limit_kasbon,
                    }
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ state }, payload) {
        return new Promise(resolve => {
            const { form } = state
            const formData = new FormData()
            formData.append('role_id', form.role_id)
            formData.append('dept_id', form.dept_id)
            formData.append('name', form.name)
            formData.append('email', form.email)
            formData.append('nik', form.nik)
            formData.append('password', form.password)
            formData.append('password_confirmation', form.password_confirmation)
            formData.append('activation', form.activation)
            formData.append('avatar', form.avatar)
            formData.append('work_location', form.work_location)
            formData.append('work_location_master', form.work_location_master)
            formData.append('saldo_cuti', form.saldo_cuti)
            formData.append('hp', form.hp)
            formData.append('status', form.status)
            formData.append('tgl_join', moment(form.tgl_join).format("YYYY-MM-DD"))
            formData.append('limit_kasbon', form.limit_kasbon)
            formData.append('total_gaji_perbulan', form.total_gaji_perbulan)
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.put(`users/${payload}`, formData, { headers })
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
            $axios.delete(`/users/${payload}`)
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