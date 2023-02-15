// import $axios from '../api'

const state = () => ({
    form: {
        latitude: '',
        longitude: '',
        status: '',
        keterangan_absen: '',
        waktu_telat_masuk: '',
        foto_selfi: [],
    }
})

const mutations = {
}

const actions = {
    submitAbsen({state}) {
        return new Promise(resolve => {
            resolve(state.form)
            // $axios.post('absensi', payload)
            //     .then(response => {
            //         resolve(response)
            //     })
            //     .catch(error => {
            //         resolve(error.response)
            //     })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}