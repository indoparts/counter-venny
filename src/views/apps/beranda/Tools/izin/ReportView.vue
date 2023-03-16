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
                    <template v-slot:[`item.date`]="{ item }">
                        {{ parseDate(item.date) }}
                    </template>
                    <template v-slot:[`item.todate`]="{ item }">
                        {{ parseDate(item.todate) }}
                    </template>
                    <template v-slot:[`item.status_approval`]="{ item }">
                        <v-chip class="ma-2" :color="item.status_approval === 'y' ? 'success' : 'pink'" outlined>
                            <v-icon left>
                                {{ item.status_approval === 'y' ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}
                            </v-icon>
                            {{ item.status_approval === 'y' ? 'Disetujui' : 'Belum disetujui' }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.btn_approval`]="{ item }">
                        <v-btn v-if="authenticated.id === item.user_id_approval" class="ma-2" outlined fab color="primary" x-small @click="approvalact(item.id, item.user.name)">
                            <v-icon>mdi-signature</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length / 2">
                            <tr>
                                <th class="text-left">Tipe Permintaan</th>
                                <td> : {{ item.req_type }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">Catatan</th>
                                <td> : {{ item.notes }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">Yang mengajukan</th>
                                <td> : {{ item.user.name }}</td>
                            </tr>
                        </td>
                        <td :colspan="headers.length / 2">
                            <tr>
                                <th class="text-left">Jenis Izin</th>
                                <td> : {{ item.permit_req }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">Durasi</th>
                                <td> : {{ item.leave_duration }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">Yang menyetujui</th>
                                <td> : {{ item.userapproval.name }}</td>
                            </tr>
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
                { text: 'Tanggal Dibuat', value: 'date' },
                { text: 'Tanggal Diajukan', value: 'todate' },
                { text: 'Durasi', value: 'leave_duration' },
                { text: 'Tipe Permintaan', value: 'req_type' },
                { text: 'Jenis Izin', value: 'permit_req' },
                { text: 'Approval', value: 'status_approval' },
                { text: '#', value: 'btn_approval' },
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
        ...mapActions('pengajuan_izin', ['reportExport', 'report', 'user', 'approval']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, authId: this.search, daterange: this.tanggal }
            if (tableAttr !== null)
            this.report(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD');
        },
        approvalact(id, nama) {
            this.$swal({
                title: `Permintaan persetujuan permohonan izin`,
                text: `Permintaan persetujuan permohonan izin atas nama ${nama}`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Izinkan',
                denyButtonText: `Tidak diizinkan`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.approval({ id: id, status_approval: 'y' }).then((res) => {
                        if (res.status === true)
                            this.$swal('Tersimpan!', `Permohonan izin atas nama ${nama} telah diizinkan`, 'success')
                        this.getDataFromApi()
                    })
                } else if (result.isDenied) {
                    this.approval({ id: id, status_approval: 'n' }).then((res) => {
                        if (res.status === true)
                            this.$swal('Tersimpan!', `Permohonan izin atas nama ${nama} tidak diperizinkan`, 'info')
                        this.getDataFromApi()
                    })
                }
            })
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
                                "Nama Yang Mengajukan": el.user.name,
                                "NIK Yang Mengajukan": el.user.nik,
                                "Date": this.parseDate(el.date),
                                "To Date": this.parseDate(el.todate),
                                "Duration": el.leave_duration,
                                "Jenis Izin": el.permit_req,
                                "Catatan Izin": el.notes,
                                "Jenis Permintaan": el.req_type,
                                "Approval Izin": el.status_approval === 'y' ? 'ya' : 'tidak',
                                "Nama Yang Menyetujui": el.userapproval.name,
                                "NIK Yang Menyetujui": el.userapproval.nik,
                            })
                        });
                        console.log(arr);
                        const ws = xlsx.utils.json_to_sheet(arr)
                        xlsx.utils.book_append_sheet(wb, ws, 'test')
                        xlsx.writeFile(wb, 'izin-data-exported.csv')
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
