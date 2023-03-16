<template>
    <div>
        <v-card color="card" flat>
            <v-card-title>
                <v-select dense outlined v-model="search" :items="deptItem" item-text="deptname" item-value="id"
                    label="Cari berdasarkan departemen" class="mb-input"></v-select>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="tanggal"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field dense outlined v-model="tanggal" label="Tentukan tanggal" required
                            :rules="[v => !!v || 'Item is required']" prepend-inner-icon="mdi-calendar" single-line
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
                <v-btn-toggle v-model="toggle_exclusive" dense class="ml-2">
                    <v-btn @click="exportExcel">
                        <v-icon>mdi-microsoft-excel</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-card-title>
            <v-card-text>
                <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                    :server-items-length="totalDesserts" :loading="loading">
                    <template v-slot:[`item.date`]="{ item }">
                        {{ parseDate(item.date) }}
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>
 
<script>
import moment from 'moment'
import * as xlsx from "xlsx"
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            tanggal: [(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
            menu: false,
            toggle_exclusive: null,
            search: '',
            deptItem: [],
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'Departemen', value: 'dept.deptname' },
                { text: 'Jabatan', value: 'role.rolename' },
                { text: 'Users', value: 'user.name' },
                { text: 'Waktu', value: 'time' },
                { text: 'Tanggal', value: 'date' },
            ],
        }
    },
    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    watch: {
        options: {
            handler() {
                this.attr_get_dept().then((res) => {
                    this.deptItem = res.data
                })
                this.getDataFromApi()
            },
            deep: true,
        },
        search() {
            this.getDataFromApi()
        },
        tanggal(e) {
            if (e.length === 2)
                this.getDataFromApi()
        },
    },
    methods: {
        ...mapActions('jadwal_istirahat', ['reportExport', 'report', 'attr_get_dept']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, authId: this.search, daterange: this.tanggal }
            this.report(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD');
        },
        exportExcel() {
            this.$swal({
                title: 'Informasi',
                icon: 'info',
                text: `Apakah anda yakin akan mengeksport data dari tanggal ${this.tanggal[0]} sampai dengan ${this.tanggal[1]} ?`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, export it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.reportExport(this.tanggal).then((res) => {
                        const wb = xlsx.utils.book_new()
                        const arr = [];
                        res.data.forEach(el => {
                            arr.push({
                                "Departemen": el.dept.deptname,
                                "Jabatan": el.role.rolename,
                                "Nama": el.user.name,
                                "NIK": el.user.nik,
                                "Lokasi Kerja": el.user.work_location,
                                "Jam Istirahat": el.time,
                                "Tnnggal": this.parseDate(el.date),
                            })
                        });
                        console.log(arr);
                        const ws = xlsx.utils.json_to_sheet(arr)
                        xlsx.utils.book_append_sheet(wb, ws, 'test')
                        xlsx.writeFile(wb, 'jadwal-istirahat-exported.csv')
                        this.$swal(
                            'exported!',
                            'Your file has been exported.',
                            'success'
                        )
                    })
                }
            })
        },
    },
}
</script>
