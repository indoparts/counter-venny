<template>
    <div>
        <v-card color="card" flat>
            <v-card-title>
                <v-select dense outlined v-model="search" :items="usersItem" item-text="user.name" item-value="user.id"
                    label="Cari berdasarkan pengguna" class="mb-input"></v-select>
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
                <v-data-table dense flat show-expand :headers="headers" :items="desserts" :options.sync="options"
                    :server-items-length="totalDesserts" :loading="loading" :single-expand="singleExpand" item-key="id"
                    :expanded.sync="expanded">
                    <template v-slot:[`item.gaji_perbulan`]="{ item }">
                        {{ formatRupiah(item.gaji_perbulan) }}
                    </template>
                    <template v-slot:[`item.gaji_perhari`]="{ item }">
                        {{ formatRupiah(item.gaji_perhari) }}
                    </template>
                    <template v-slot:[`item.gaji_thp`]="{ item }">
                        {{ formatRupiah(item.gaji_thp) }}
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <tr>
                                        <th class="text-left">NIK</th>
                                        <td>: {{ item.user.nik }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Name</th>
                                        <td>: {{ item.user.name }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Email</th>
                                        <td>: {{ item.user.email }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Status</th>
                                        <td>: {{ item.user.status }}</td>
                                    </tr>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <tr>
                                        <th class="text-left">Absen</th>
                                        <td>: {{ item.total_absen }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Terlambat</th>
                                        <td>: {{ item.total_terlambat }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Hari Kerja</th>
                                        <td>: {{ item.total_workday }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Periode</th>
                                        <td>: {{ item.periode }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Gaji Perhari</th>
                                        <td>: {{ formatRupiah(item.gaji_perbulan) }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Gaji Perbln</th>
                                        <td>: {{ formatRupiah(item.gaji_perhari) }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">THP</th>
                                        <td>: {{ formatRupiah(item.gaji_thp) }}</td>
                                    </tr>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <tr v-for="i in item.gajivariable" :key="i.id">
                                        <th class="text-left">Bobot & Nominal</th>
                                        <td>: {{ i.bobot }}% || {{ formatRupiah(i.nominal) }}</td>
                                    </tr>
                                </v-col>
                            </v-row>
                        </td>
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
            usersItem: [],
            expanded: [],
            singleExpand: false,
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'Nama', value: 'user.name' },
                { text: 'Periode', value: 'periode' },
                { text: 'Absen', value: 'total_absen' },
                { text: 'Terlambat', value: 'total_terlambat' },
                { text: 'Hari Kerja', value: 'total_workday' },
                { text: 'Gaji Perbln', value: 'gaji_perbulan' },
                { text: 'Gaji Perhari', value: 'gaji_perhari' },
                { text: 'Gaji THP', value: 'gaji_thp' },
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
                this.user().then((res) => {
                    this.usersItem = res.data
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
        ...mapActions('gaji', ['reportExport', 'report', 'user']),
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
                                "Nama": el.user.name,
                                "NIK": el.user.nik,
                                "Total Absen": el.total_absen,
                                "Total Terlambat": el.total_terlambat,
                                "Total Hari Kerja": el.total_workday,
                                "Periode": el.periode,
                                "Gaji Perbulan": el.gaji_perbulan,
                                "Gaji Perhari": el.gaji_perhari,
                                "Gaji THP": el.gaji_thp,
                                "Data Dibuat": this.parseDate(el.created_at),
                            })
                        });
                        const ws = xlsx.utils.json_to_sheet(arr)
                        xlsx.utils.book_append_sheet(wb, ws, 'test')
                        xlsx.writeFile(wb, 'gaji-data-exported.csv')
                        this.$swal(
                            'exported!',
                            'Your file has been exported.',
                            'success'
                        )
                    })
                }
            })
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka)
        }
    },
}
</script>
