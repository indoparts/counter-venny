<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card flat class="card">
            <v-card-title>Form Privileges</v-card-title>
            <v-card-text>
                <section>
                    <v-text-field v-model="form.name" label="Name" outlined dense color="primary" autocomplete="false"
                        :rules="[v => !!v || 'Item is required']" />
                </section>
                <section>
                    <v-row>
                        <v-col v-for="n in radioGroup" :key="n" cols="12" md="2" sm="12">
                            <v-checkbox v-model="form.permission" :label="`${n}`" :value="n"></v-checkbox>
                        </v-col>
                    </v-row>
                </section>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="$can('create-permission')" text color="primary" @click="submit">
                    Submit
                </v-btn>
            </v-card-actions>
            <v-card-actions>
                <div class="d-flex justify-center mt-5">
                    <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
                </div>
            </v-card-actions>
        </v-card>
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
        ...mapState('masterdata_akses', {
            form: state => state.form,
        }),
    },
    methods: {
        ...mapActions('masterdata_akses', ['store']),
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