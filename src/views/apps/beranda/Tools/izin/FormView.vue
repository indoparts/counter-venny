<template>
    <v-form>
        <v-alert dense outlined type="error"
            v-if="errors.permit_req !== '' || errors.req_type !== '' || errors.tanggal !== '' || errors.leave_duration !== '' || errors.notes !== '' || errors.user_id_approval !== ''">
            <strong>{{ errors.permit_req }}</strong>
            <strong>{{ errors.req_type }}</strong>
            <strong>{{ errors.tanggal }}</strong>
            <strong>{{ errors.leave_duration }}</strong>
            <strong>{{ errors.notes }}</strong>
            <strong>{{ errors.user_id_approval }}</strong>
        </v-alert>
        <v-card class="card" flat>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.permit_req" :items="itemsJenis" label="Jenis Izin" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"
                            :error-messages="errors.permit_req"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.req_type" :items="items" label="Jenis Permintaan" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"
                            :error-messages="errors.req_type"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="tanggal"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="tanggal" label="Tentukan tanggal" required
                                    :rules="[v => !!v || 'Item is required']" class="mb-input"
                                    prepend-inner-icon="mdi-calendar" single-line hide-details v-bind="attrs" v-on="on"
                                    :error-messages="errors.tanggal"></v-text-field>
                            </template>
                            <v-date-picker v-model="tanggal" range>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(tanggal)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="4" v-if="form.permit_req === 'sick'">
                        <v-file-input dense outlined v-model="form.file" placeholder="Upload your documents"
                            label="File input" accept="image/*" prepend-inner-icon="mdi-paperclip" class="mb-input">
                            <template v-slot:selection="{ text }">
                                <v-chip small label color="primary">
                                    {{ text }}
                                </v-chip>
                            </template>
                        </v-file-input>
                    </v-col>
                    <v-col cols="12" :md="form.permit_req === 'sick'?'4':'6'">
                        <v-text-field dense outlined v-model="form.leave_duration" label="Durasi waktu" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled
                            :error-messages="errors.leave_duration"></v-text-field>
                    </v-col>
                    <v-col cols="12" :md="form.permit_req === 'sick'?'4':'6'">
                        <v-select dense outlined v-model="form.user_id_approval" :items="user_id_approval"
                            item-text="user.name" item-value="user_id" label="Ajukan kepada?" class="mb-input"
                            :error-messages="errors.user_id_approval"></v-select>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-textarea dense outlined v-model="form.notes" label="Catatan tugas"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through." :rules="[v => !!v || 'Item is required']" class="mb-input" :error-messages="errors.notes"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block @click="submit">
                    Submit permintaan
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moment from 'moment'
export default {
    props: {
        lat: Number,
        lng: Number,
        enable: Boolean,
    },
    data: () => ({
        loading: false,
        itemsJenis: ['come to late', 'sick', 'not present', 'other'],
        items: ['once', 'range'],
        tanggal: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
        menu: false,
        user_id_approval: [],
        errors: {
            permit_req: '',
            req_type: '',
            tanggal: '',
            leave_duration: '',
            notes: '',
            user_id_approval: '',
        }
    }),
    computed: {
        ...mapState('pengajuan_izin', {
            form: state => state.form,
        }),
    },
    watch: {
        tanggal(e) {
            this.form.date = (e[0] !== '' || e[0] !== null) ? e[0] : ''
            this.form.todate = (e[1] !== '' || e[1] !== null) ? e[1] : ''
            if (e.length === 2) {
                var a = moment([new Date(e[0]).getFullYear(), new Date(e[0]).getMonth(), new Date(e[0]).getDay()]);
                var b = moment([new Date(e[1]).getFullYear(), new Date(e[1]).getMonth(), new Date(e[1]).getDay()]);
                this.form.leave_duration = Math.abs(a.diff(b, 'days'))
            }
        },
    },
    created() {
        this.user().then((res) => {
            this.user_id_approval = res.data
            this.form.remaining = res.auth.saldo_cuti
            this.form.user_id = res.auth.id
        })
    },
    methods: {
        ...mapActions('pengajuan_izin', ['submitIzin', 'user']),
        submit() {
            this.loading = true
            this.submitIzin().then((res) => {
                if (res.status === false) {
                    res.data.errors.forEach(el => {
                        if (el.field === 'date' || el.field === 'todate')
                            this.errors.tanggal = el.message
                        if (el.field === 'leave_req')
                            this.errors.leave_req = el.message
                        if (el.field === 'req_type')
                            this.errors.req_type = el.message
                        if (el.field === 'leave_duration')
                            this.errors.leave_duration = el.message
                        if (el.field === 'user_id_approval')
                            this.errors.user_id_approval = el.message
                        if (el.field === 'notes')
                            this.errors.notes = el.message
                    });
                } else {
                    this.$swal({
                        title: res.msg === 'error' ? 'Terjadi kesalahan!' : 'Berhasil tersimpan.',
                        icon: res.msg,
                        text: 'Pengajuan anda berhasil ditambahkan',
                    });
                }
                this.loading = false
            })
        },
    }
}
</script>
