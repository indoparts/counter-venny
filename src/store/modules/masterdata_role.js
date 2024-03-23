/* eslint-disable no-empty-pattern */
import $axios from '../api'

const state = () => ({
    form: {
        rolename: '',
    },
    formsetrole: {
        role_id: '',
        permission_id: [],
    },
    rightMenuDrawer: [
        ['List Data', 'mdi-view-list', 'master-data-role.data', 'role-viewList'],
        ['Buat Data Baru', 'mdi-plus-box', 'master-data-role.add', 'role-create'],
        // ['Grafik', 'mdi-chart-bar', 'grafik-data-users-user'],
    ]
})

const mutations = {
    CLEAR_FORM(state) {
        state.form = {
            rolename: '',
        }
    },
    SET_FORMSETROLE(state, payload) {
        state.formsetrole = {
            role_id: payload.role_id,
            permission_id: payload.permission_id,
        }
    },
    CLEAR_FORMSETROLE(state) {
        state.formsetrole = {
            role_id: '',
            permission_id: [],
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
            $axios.get(`api/role?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
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
            $axios.post('api/role', state.form)
                .then(response => {
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    edit({ state }, payload) {
        return new Promise(resolve => {
            $axios.get(`api/role/${payload}`)
                .then(response => {
                    state.form.rolename = response.data.data.rolename
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
        })
    },
    update({ state, commit }, payload) {
        return new Promise(resolve => {
            $axios.put(`api/role/${payload}`, state.form)
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
            $axios.delete(`api/role/${payload}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                resolve(error.response)
            })
        })
    },
    setroleedit({ commit }, payload) {
        function arrayUnique(arr) {
            var a = arr.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }
            return a;
        }
        return new Promise(resolve => {
            $axios.get(`api/role-permission/${payload}`)
                .then(response => {
                    const idRole = []
                    const idPermission = []
                    response.data.data.forEach(el => {
                        idRole.push(el.role_id)
                        idPermission.push(el.permission_id)
                    });
                    commit('SET_FORMSETROLE', {
                        role_id: arrayUnique(idRole)[0],
                        permission_id: idPermission
                    })
                    console.log();
                    resolve(response.data)
                })
                .catch(error => {
                    resolve(error.response)
                })
            })
        },
        submitSetRole({ state, commit }, payload) {
            return new Promise(resolve => {
                $axios.put(`api/role-permission/${payload}`, state.formsetrole)
                    .then(response => {
                        commit('CLEAR_FORMSETROLE')
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