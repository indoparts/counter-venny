/* eslint-disable no-empty-pattern */
import $axios from '../api'

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
        ['List Data', 'mdi-view-list', 'master-data-pengguna.data', 'user-viewList'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-pengguna.add', 'user-create'],
        ['User Group', 'mdi-group', 'master-data-pengguna.group', 'user-create'],
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
            $axios.get(`api/users?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
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
            $axios.get('api/attr_form')
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    store({ state }) {
        return new Promise(resolve => {
            const { form } = state
            const formData = new FormData()
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.post('api/users', formData, { headers })
                .then(res => {
                    // commit('CLEAR_FORM')
                    resolve(res)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({state}, payload) {
        return new Promise(resolve => {
            $axios.get(`api/users/${payload}`)
                .then(response => {
                    const x = response.data.data
                    console.log(x[0].tgl_join);
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
                        total_gaji_perbulan: x[0].total_gaji_perbulan,
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
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
            const headers = { 'Content-Type': 'multipart/form-data' };
            $axios.put(`api/users/${payload}`, formData, { headers })
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
            $axios.delete(`api/users/${payload}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },

    indexUserGroup({ }, payload) {
        return new Promise(resolve => {
            const {
                page,
                itemsPerPage,
                sortDesc
            } = payload.options
            $axios.get(`api/user-group?page=${page}&limit=${itemsPerPage}&sortDesc=${sortDesc}`)
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