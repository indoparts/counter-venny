<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card flat class="card">
            <v-card-title>Form resign</v-card-title>
            <v-card-text>
                <v-textarea v-model="form.alasan" label="Alasan Resign" auto-grow></v-textarea>
                <v-textarea v-model="form.masukan" label="Masukan Untuk Perusahaan" auto-grow></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="$can('create-resign')" text color="primary" @click="submit">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        valid: false,
        loading: false,
        form: {
            user_id: '',
            alasan: '',
            masukan: '',
            status_persetujuan: 'n',
        }
    }),
    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    watch: {
        authenticated(v) {
            if (v.id !== undefined)
                this.form.user_id = v.id
        }
    },
    methods: {
        ...mapActions('resign', ['store']),
        submit() {
            this.loading = true
            this.store(this.form).then((e) => {
                this.loading = false
                this.form = {
                    alasan: '',
                    masukan: '',
                    status_persetujuan: 'n',
                }
                this.$swal(
                    e.msg,
                    e.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    e.msg
                )
            })
        },
    }
}
</script>