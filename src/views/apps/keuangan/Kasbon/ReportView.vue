<template>
    <v-card color="card" flat>
        <v-card-title>
            <v-select dense outlined v-model="search" :items="usersItem" item-text="name" item-value="id"
                label="Cari berdasarkan pengguna" class="mb-input"></v-select>
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="tanggal"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field dense outlined v-model="tanggal" label="Tentukan tanggal" required
                        :rules="[v => !!v || 'Item is required']" prepend-inner-icon="mdi-calendar" single-line hide-details
                        v-bind="attrs" v-on="on"></v-text-field>
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
                :server-items-length="totalDesserts" :loading="loading" :single-expand="true" :expanded.sync="expanded"
                item-key="id" show-expand>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-row class="mt-5">
                            <v-col cols="12" md="6">
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
                            <v-col cols="12" md="6">
                                <tr>
                                    <th class="text-left">Nominal Pinjaman</th>
                                    <td>: {{ formatRupiah(item.nominal_pinjaman) }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Tenor</th>
                                    <td>: {{ item.tenor }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Nominal Angsuran</th>
                                    <td>: {{ formatRupiah(item.nominal_angsuran) }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Status Pinjaman</th>
                                    <td>: {{ item.status_pinjaman }}</td>
                                </tr>
                            </v-col>
                        </v-row>
                        <v-row class="mb-5">
                            <v-col cols="12">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">
                                                    Angsuran Ke
                                                </th>
                                                <th class="text-left">
                                                    Jumlah Dibayarkan
                                                </th>
                                                <th class="text-left">
                                                    Status Pembayaran
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(i, index) in item.angsuran" :key="i.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ formatRupiah(item.nominal_angsuran) }}</td>
                                                <td>
                                                    <v-chip class="ma-2" label
                                                        :color="statusPembayaran(i.status_pembayaran)">
                                                        {{ i.status_pembayaran === 'y' ? 'sudah dibayar' : 'belum dibayar'
                                                        }}
                                                    </v-chip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </td>
                </template>
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ parseDate(item.created_at) }}
                </template>
                <template v-slot:[`item.nominal_pinjaman`]="{ item }">
                    {{ formatRupiah(item.nominal_pinjaman) }}
                </template>
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('update-dept')">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-dept')">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
 
<script>
import moment from 'moment'
import * as xlsx from "xlsx"
import { mapActions } from "vuex";
export default {
    data() {
        return {
            tanggal: [(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
            menu: false,
            usersItem: [],
            toggle_exclusive: null,
            expanded: [],
            search: '',
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'Nama', value: 'user.name' },
                { text: 'NIK', value: 'user.nik' },
                { text: 'Diajukan', value: 'created_at' },
                { text: 'Nominal Pinjaman', value: 'nominal_pinjaman' },
                { text: 'ACT', value: 'act' },
            ],
        }
    },
    watch: {
        options: {
            handler() {
                this.user().then((res) => {
                    console.log(res.data.user);
                    this.usersItem = res.data.user
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
        ...mapActions('summary_kasbon', ['report', 'user', 'reportExport']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, authId: this.search, daterange: this.tanggal }
            this.report(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        statusPembayaran(e) {
            if (e === 'y')
                return 'primary'
            if (e === 'n')
                return 'error'
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka)
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
                                "Nominal Pinjaman": el.nominal_pinjaman,
                                "Nominal Angsuran": el.nominal_angsuran,
                                "Tenor": el.tenor,
                                "Status Pinjaman": el.status_pinjaman,
                                "Status Persetujuan": el.status_approval === 'w' ? 'Menunggu persetujuan' : el.status_approval === 'y' ? 'Pinjaman Disetujui' : 'Pinjaman Ditolak',
                                "Data Dibuat": this.parseDate(el.created_at),
                            })
                        });
                        const ws = xlsx.utils.json_to_sheet(arr)
                        xlsx.utils.book_append_sheet(wb, ws, 'test')
                        xlsx.writeFile(wb, 'pinjaman-kasbon-exported.csv')
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
