<template>
    <v-form>
        <v-card color="card" flat>
            <v-card-title>Form Pengguna</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-select dense outlined v-model="form.role_id" :items="role" item-text="rolename"
                            item-value="id" label="pilih role user" class="mb-input"
                            :error-messages="$formErr(error, 'dept_id')"></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select dense outlined v-model="form.dept_id" :items="dept" item-text="deptname"
                            item-value="id" label="pilih departemen user" class="mb-input"
                            :error-messages="$formErr(error, 'dept_id')"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.name" label="name" class="mb-input"
                            :error-messages="$formErr(error, 'dept_id')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.email" label="email" class="mb-input"
                            :error-messages="$formErr(error, 'email')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.nik" class="mb-input" label="nik"
                            :error-messages="$formErr(error, 'nik')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.hp" class="mb-input" label="No. HP"
                            :error-messages="$formErr(error, 'hp')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.password" class="mb-input"
                            label="Password" :error-messages="$formErr(error, 'password')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.password_confirmation" class="mb-input"
                            label="konfirmasi password"
                            :error-messages="$formErr(error, 'password_confirmation')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.work_location" :items="lokasi_kerja"
                            label="pilih lokasi kerja" class="mb-input"
                            :error-messages="$formErr(error, 'work_location')"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.work_location === 'toko'">
                        <v-select dense outlined v-model="form.work_location_master" :items="items_toko"
                            label="pilih lokasi toko" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="nama" item-value="id"
                            :error-messages="$formErr(error, 'work_location_master')"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.work_location === 'gudang'">
                        <v-select dense outlined v-model="form.work_location_master" :items="items_gudang"
                            label="pilih lokasi gudang" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="nama" item-value="id"
                            :error-messages="$formErr(error, 'work_location_master')"></v-select>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.work_location === 'office'">
                        <v-select dense outlined v-model="form.work_location_master" :items="items_office"
                            label="pilih lokasi office" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="nama" item-value="id"
                            :error-messages="$formErr(error, 'work_location_master')"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.saldo_cuti" class="mb-input"
                            label="saldo cuti" :error-messages="$formErr(error, 'saldo_cuti')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.activation" :items="activation" label="activation"
                            class="mb-input" :error-messages="$formErr(error, 'activation')"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.status" :items="status" label="Status Pengguna"
                            class="mb-input" :error-messages="$formErr(error, 'status')"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.tgl_join"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.tgl_join" label="Tanggal Join" dense outlined
                                    prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :error-messages="$formErr(error, 'tgl_join')"></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tgl_join" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(form.tgl_join)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.limit_kasbon" class="mb-input" label="Limit Kasbon"
                            :error-messages="$formErr(error, 'limit_kasbon')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.total_gaji_perbulan" class="mb-input"
                            label="Total Gaji Perbulan"
                            :error-messages="$formErr(error, 'total_gaji_perbulan')"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-file-input prepend-inner-icon="mdi-camera" dense outlined v-model="form.avatar"
                            class="mb-input" accept="image/*" label="avatar"
                            :error-messages="$formErr(error, 'avatar')"></v-file-input>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.app_line" :items="items_user"
                            label="pilih approval start" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="name" item-value="id"
                            :error-messages="$formErr(error, 'app_line')"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.app_mngr" :items="items_user"
                            label="pilih approval final" :rules="[v => !!v || 'Item is required']" class="mb-input"
                            item-text="name" item-value="id"
                            :error-messages="$formErr(error, 'app_mngr')"></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block @click="submit">
                    Submit data
                </v-btn>
            </v-card-actions>
            <!-- {{ error }} -->
        </v-card>
    </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        role: [],
        dept: [],
        error: [],
        items_toko: [],
        items_gudang: [],
        items_office: [],
        items_user: [],
        lokasi_kerja: ['office', 'gudang', 'toko'],
        status: ['tetap', 'training', 'kontrak', 'magang'],
        activation: [true, false],
        valid: false,
        loading: false,
        menu: false,
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
            this.items_user = res.data.user
        })
    },
    methods: {
        ...mapActions('masterdata_user', ['attr_form_user', 'store']),
        callback(e) {
            this.form.tgl_join = e
        },
        submit() {
            this.loading = true
            this.store()
                .then((e) => {
                    if (e.status != 200) {
                        if(e.data.data.messages)
                        this.error = e.data.data.messages.errors
                    }
                    this.loading = false
                    this.$swal({
                        title: e.status < 201 ? 'Berhasil tersimpan.' : 'Gagal tersimpan.',
                        icon: e.status < 201 ? 'success' : 'error',
                        text: e.status < 201 ? 'Berhasil tersimpan.' : e.data.msg,
                    });
                })
        },
    }
}
</script>