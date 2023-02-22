<template>
    <v-form v-model="valid">
        <v-card color="card" flat>
            <v-card-title>Form Role</v-card-title>
            <v-card-text>
                <v-text-field dense outlined v-model="form.rolename" label="name" class="mt-input"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" @click="submit">
                    Submit data
                </v-btn>
            </v-card-actions>
        </v-card>
        <div class="d-flex justify-center mt-5">
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
        alert: {
            type: '',
            title: '',
            msg: []
        }
    }),
    computed: {
        ...mapState('masterdata_role', {
            form: state => state.form,
        }),
    },
    methods: {
        ...mapActions('masterdata_role', ['store']),
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