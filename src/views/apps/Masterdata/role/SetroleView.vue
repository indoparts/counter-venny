<template>
    <v-form v-model="valid">
        <v-card color="card" flat>
            <v-card-title>Form Set Role</v-card-title>
            <v-card-text>
                <v-select dense outlined v-model="formsetrole.role_id" :items="role" item-text="rolename" item-value="id"
                                label="pilih role user" :rules="[v => !!v || 'Item is required']" class="mt-input"></v-select>
                <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                    :server-items-length="totalDesserts" :loading="loadingtable" class="elevation-0">
                    <template v-slot:[`item.act`]="{ item }">
                        <v-switch v-model="formsetrole.permission_id" color="primary" :value="item.id"></v-switch>
                    </template>
                </v-data-table>
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
        baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
        valid: false,
        loading: false,
        alert: {
            type: '',
            title: '',
            msg: []
        },
        role: [],
        search: '',
        totalDesserts: 0,
        desserts: [],
        loadingtable: true,
        options: {},
        headers: [
            { text: 'Grup Akses', value: 'basepermission' },
            { text: 'Nama Akses', value: 'name' },
            { text: 'ACT', value: 'act' },
        ],
    }),
    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },
    computed: {
        ...mapState('masterdata_role', {
            formsetrole: state => state.formsetrole,
        }),
    },
    created() {
        this.attr_form_user().then((res) => {
            this.role = res.data.roles
        })
        this.setroleedit(this.$route.params.id)
    },
    methods: {
        ...mapActions('masterdata_user', ['attr_form_user']),
        ...mapActions('masterdata_role', ['setroleedit', 'submitSetRole']),
        ...mapActions('masterdata_akses', ['index']),
        getDataFromApi() {
            this.loadingtable = true
            const tableAttr = { options: this.options, search: this.search }
            this.index(tableAttr).then(e => {
                this.desserts = e.data.data
                this.totalDesserts = e.data.meta.total
                this.loadingtable = false
            })
        },
        submit() {
            this.loading = true
            this.submitSetRole(this.$route.params.id).then((e) => {
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