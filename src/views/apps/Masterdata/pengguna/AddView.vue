<template>
    <v-form v-model="valid">
        <v-card color="card" flat>
            <v-card-title>Form Pengguna</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-select dense outlined v-model="form.role_id" :items="role" item-text="rolename" item-value="id"
                            label="pilih role user" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select dense outlined v-model="form.dept_id" :items="dept" item-text="deptname" item-value="id"
                            label="pilih departemen user" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.name" label="name" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.email" label="email" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.nik" class="mb-input"
                            label="nik"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.hp" class="mb-input"
                            label="No. HP"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.password" class="mb-input"
                            label="Password"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.password_confirmation" class="mb-input"
                            label="konfirmasi password"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.work_location" :items="lokasi_kerja"
                            label="pilih lokasi kerja" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.work_location === 'toko'">
                        <v-select dense outlined v-model="form.work_location_master" :items="items_toko"
                            label="pilih lokasi toko" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="nama" item-value="id"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.work_location === 'gudang'">
                        <v-select dense outlined v-model="form.work_location_master" :items="items_gudang"
                            label="pilih lokasi gudang" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="nama" item-value="id"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.work_location === 'office'">
                        <v-select dense outlined v-model="form.work_location_master" :items="items_office"
                            label="pilih lokasi office" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="nama" item-value="id"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.saldo_cuti" class="mb-input"
                            label="saldo cuti"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.activation" :items="activation" label="activation"
                            class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.status" :items="status" label="Status Pengguna"
                            class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <DatePicker label="Tgl. Join" @someEvent="callback" :disabled="false"></DatePicker>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.limit_kasbon" class="mb-input"
                            label="Limit Kasbon"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.total_gaji_perbulan" class="mb-input"
                            label="Total Gaji Perbulan"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-file-input prepend-inner-icon="mdi-camera" dense outlined v-model="form.avatar" class="mb-input"
                            accept="image/*" label="avatar"></v-file-input>
                    </v-col>
                </v-row>
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
        items_toko: [],
        items_gudang: [],
        items_office: [],
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
        ...mapState('masterdata_user', {
            form: state => state.form,
        }),
    },
    created() {
        this.attr_form_user().then((res) => {
            this.dept = res.data.depts
            this.role = res.data.roles
            this.items_toko = res.data.toko
            this.items_gudang = res.data.gudang
            this.items_office = res.data.office
        })
    },
    methods: {
        ...mapActions('masterdata_user', ['attr_form_user', 'store']),
        callback(e) {
            this.form.tgl_join = e
        },
        submit() {
            this.loading = true
            this.store().then((e) => {
                this.loading = false
                console.log(e);
                this.alert = {
                    type: e.status === 200 ? 'success' : 'error',
                    title: e.data.msg,
                    msg: e.data.msg
                }
            })
        },
    }
}
</script>