<template>
    <v-form v-model="valid">
        <v-card class="card" flat>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.remaining" label="saldo cuti tersisa" required :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                        <v-text-field dense outlined v-model="form.leave_req" label="Alasan Permintaan Cuti" required :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.req_type" :items="items" label="Jenis Permintaan" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="tanggal"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field dense outlined v-model="tanggal" label="Tentukan tanggal" required :rules="[v => !!v || 'Item is required']" class="mb-input" prepend-inner-icon="mdi-calendar" single-line
                                        hide-details v-bind="attrs" v-on="on"></v-text-field>
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
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined v-model="form.leave_duration" label="Durasi waktu" required :rules="[v => !!v || 'Item is required']" class="mb-input" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.user_id_approval" :items="user_id_approval" item-text="name" item-value="id" label="Ajukan kepada?" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field dense outlined v-model="form.notes" label="Catatan tugas" required :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" @click="submit">
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
        valid: false,
        loading: false,
        items: ['once', 'range'],
        tanggal: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
        menu: false,
        user_id_approval: [],
    }),
    computed: {
        ...mapState('pengajuan_cuti', {
            form: state => state.form,
        }),
    },
    watch:{
        tanggal(e){
            this.form.data = (e[0] !== '' || e[0] !==null)? e[0]: ''
            this.form.todata = (e[1] !== '' || e[1] !==null)? e[1]: ''
            if(e.length === 2){
                var a = moment([new Date(e[0]).getFullYear(), new Date(e[0]).getMonth(), new Date(e[0]).getDay()]);
                var b = moment([new Date(e[1]).getFullYear(), new Date(e[1]).getMonth(), new Date(e[1]).getDay()]);
                this.form.leave_duration = Math.abs(a.diff(b, 'days'))
            }
        }
    },
    created(){
        this.user_approval()
    },
    methods: {
        ...mapActions('pengajuan_cuti', ['submitCuti','user_approval']),
        submit() {
            this.loading = true
            this.submitAbsen().then(() => {
                this.loading = false
            })
        },
    }
}
</script>
