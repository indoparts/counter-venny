<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-form>
            <v-card color="card" flat>
                <v-card-title>Form Profile</v-card-title>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-select dense disabled outlined v-model="form.role_id" :items="role" item-text="rolename"
                                item-value="id" label="pilih role user" :rules="[v => !!v || 'Item is required']"
                                class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select dense disabled outlined v-model="form.dept_id" :items="dept" item-text="deptname"
                                item-value="id" label="pilih departemen user" :rules="[v => !!v || 'Item is required']"
                                class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.name" label="name" class="mt-input"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.email" label="email" class="mt-input"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense disabled outlined v-model="form.nik" class="mt-input" label="nik"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense outlined v-model="form.hp" class="mt-input" label="No. HP"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense outlined v-model="form.password" class="mt-input"
                                label="Password" :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined v-model="form.password_confirmation" class="mt-input"
                                label="konfirmasi password" :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select dense disabled outlined v-model="form.work_location" :items="lokasi_kerja"
                                label="pilih lokasi kerja" :rules="[v => !!v || 'Item is required']"
                                class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field type="number" dense disabled outlined v-model="form.saldo_cuti" class="mt-input"
                                label="saldo cuti" :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select dense disabled outlined v-model="form.activation" :items="activation" label="activation"
                                :rules="[v => !!v || 'Item is required']" class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select dense disabled outlined v-model="form.status" :items="status" label="Status Pengguna"
                                :rules="[v => !!v || 'Item is required']" class="mt-input"></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <DatePicker label="Tgl. Join" @someEvent="callback"></DatePicker>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field dense disabled outlined v-model="form.limit_kasbon" class="mt-input" label="Limit Kasbon"
                                :rules="[v => !!v || 'Item is required']"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-file-input prepend-inner-icon="mdi-camera" dense outlined v-model="form.avatar"
                                class="mt-input" accept="image/*" label="avatar" required
                                :rules="[v => !!v || 'Item is required']"></v-file-input>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn depressed :loading="loading" color="primary" block @click="submit">
                        Submit data
                    </v-btn>
                </v-card-actions>
            </v-card>
            <div class="d-flex justify-center mt-5">
                <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
            </div>
        </v-form>
    </v-container>
</template>
<script>
import AlertComponents from '@/components/AlertComponents.vue'
import DatePicker from '@/components/DatePicker.vue'
import { mapActions, mapState } from "vuex";
export default {
    components: {
        AlertComponents,
        DatePicker
    },
    data: () => ({
        role: [],
        dept: [],
        lokasi_kerja: ['office', 'gudang', 'toko'],
        status: ['tetap', 'training', 'kontrak', 'magang'],
        activation: [true, false],
        valid: false,
        loading: false,
        alert: {
            type: '',
            title: '',
            msg: []
        }
    }),
    computed: {
        ...mapState('auth', {
            form: state => state.formProfile,
        }),
    },
    created() {
        this.attr_form_user().then((res) => {
            this.dept = res.data.depts
            this.role = res.data.roles
        })
        this.getProfile()
    },
    methods: {
        ...mapActions('auth', ['attr_form_user', 'getProfile', 'updateProfile']),
        callback(e) {
            this.form.tgl_join = e
        },
        submit() {
            this.loading = true
            this.updateProfile().then((e) => {
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