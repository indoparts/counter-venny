<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card flat class="card">
            <v-card-title>Form Pelanggan</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.nama" label="nama" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.email" label="email" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.telp" label="telp"
                            class="mb-input" :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea dense outlined v-model="form.alamat" label="alamat" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" @click="submit">
                        Submit data
                    </v-btn>
            </v-card-actions>
        </v-card>
        <div class="d-flex justify-center mb-5">
            <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
        </div>
    </v-form>
</template>
<script>
import AlertComponents from '@/components/AlertComponents.vue'
import { mapActions, mapState } from "vuex";
export default {
    components: {
        AlertComponents,
    },
    data: () => ({
        valid: false,
        loading: false,
        radioGroup: ['create', 'read', 'update', 'delete', 'export', 'import'],
        alert: {
            type: '',
            title: '',
            msg: []
        }
    }),
    computed: {
        ...mapState('masterdata_pelanggan', {
            form: state => state.form,
        }),
    },
    methods: {
        ...mapActions('masterdata_pelanggan', ['store']),
        submit() {
            this.loading = true
            this.store().then((e) => {
                this.loading = false
                var a = (function () {
                    if (e.msg === 'error' && typeof e.data !== 'undefined') {
                        return e.data.errors
                    } else if (e.msg === 'error' && typeof e.data === 'undefined') {
                        return [{ field: '', rule: '', message: 'Terjadi duplikat, anda sudah membuat data ini sebelumnya !!' }]
                    } else {
                        return [{ field: '', rule: '', message: 'Berhasil' }]
                    }
                })();
                this.alert = {
                    type: e.msg,
                    title: e.msg,
                    msg: a
                }
            })
        },
    }
}
</script>