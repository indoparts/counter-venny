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
import { mapActions } from "vuex";
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
    mounted() {
        this.edit(this.$route.params.id).then((res) => {
            this.form = {
                user_id: res.data.data[0].user_id,
                alasan: res.data.data[0].alasan,
                masukan: res.data.data[0].masukan,
                status_persetujuan: res.data.data[0].status_persetujuan,
            }
        })
    },
    methods: {
        ...mapActions('resign', ['edit', 'update']),
        submit() {
            this.loading = true
            this.update({ id: this.$route.params.id, data: this.form }).then((e) => {
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