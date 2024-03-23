<template>
    <v-card color="card" flat>
        <v-card-title>List Data</v-card-title>
        <v-card-text>
            <v-data-table dense flat show-expand :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" :single-expand="singleExpand" item-key="id"
                :expanded.sync="expanded">
                <template v-slot:[`item.date`]="{ item }">
                    {{ parseDate(item.date) }}
                </template>
                <template v-slot:[`item.status_approval`]="{ item }">
                    <v-chip class="ma-2" :color="item.status_approval === 'y' ? 'success' : 'pink'" outlined>
                        <v-icon left>
                            {{ item.status_approval === 'y' ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}
                        </v-icon>
                        {{ item.status_approval === 'y' ? 'Disetujui' : 'Belum disetujui' }}
                    </v-chip>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length / 3">
                        <tr>
                            <th><strong>Detail</strong></th>
                            <td>:</td>
                        </tr>
                        <tr>
                            <th class="text-left">Tgl. Diajukan</th>
                            <td> : {{ parseDate(item.date) }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Kategori</th>
                            <td> : {{ item.category }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Status Persetujuan</th>
                            <td> : {{ item.status_approval === 'n' ? 'Disetujui' : 'Tidak Disetujui' }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">ID Transaksi</th>
                            <td> : {{ item.transaction_id }}</td>
                        </tr>
                    </td>
                    <td :colspan="headers.length / 3">
                        <tr>
                            <th><strong>Mengajukan</strong></th>
                            <td>:</td>
                        </tr>
                        <tr>
                            <th class="text-left">Nama</th>
                            <td> : {{ item.user.name }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">NIK</th>
                            <td> : {{ item.user.nik }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Email</th>
                            <td> : {{ item.user.email }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Status</th>
                            <td> : {{ item.user.status }}</td>
                        </tr>
                    </td>
                    <td :colspan="headers.length / 3">
                        <tr>
                            <th><strong>Menyetujui</strong></th>
                            <td>:</td>
                        </tr>
                        <tr>
                            <th class="text-left">Nama</th>
                            <td> : {{ item.userapproval.name }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">NIK</th>
                            <td> : {{ item.userapproval.nik }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Email</th>
                            <td> : {{ item.userapproval.email }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Status</th>
                            <td> : {{ item.userapproval.status }}</td>
                        </tr>
                    </td>
                </template>
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('reimburs-update')">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('reimburs-delete')">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
 
<script>
import moment from 'moment'
import { mapActions } from "vuex";
export default {
    data() {
        return {
            expanded: [],
            singleExpand: false,
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            search: '',
            headers: [
                { text: 'Tanggal Diajukan', value: 'date' },
                { text: 'Kategori', value: 'category' },
                { text: 'Yang Mengajukan', value: 'user.name' },
                { text: 'Yang Menyetujui', value: 'userapproval.name' },
                { text: 'Status', value: 'status_approval' },
                { text: 'ACT', value: 'act' },
            ],
        }
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions('auth', ['getUserLogin']),
        ...mapActions('pengajuan_reimburs', ['index', 'deleteReimburs']),
        getDataFromApi() {
            this.loading = true
            this.getUserLogin().then((res) => {
                const v = res.data.data.user
                this.search = v.id
                const tableAttr = { options: this.options, authId: this.search }
                this.index(tableAttr).then(res => {
                    this.desserts = res.data.data
                    this.totalDesserts = res.data.meta.total
                    this.loading = false
                })
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD');
        },
        editItem(id) {
            this.$router.push({ path: `/reimburs/edit/${id}` })
        },
        deleteItem(id) {
            this.deleteId = id
            this.$swal({
                title: 'Apakah anda yakin akanmenghapus data ini?',
                text: 'Data yang sudah terhapus tidak dapat dikembalikan lagi!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteReimburs(this.deleteId).then((e) => {
                        var a = (function () {
                            if (e.msg === 'error') {
                                return 'Terjadi kesalahan saat menghapus data!'
                            } else {
                                return 'Berhasil menghapus data!'
                            }
                        })();
                        this.$swal({
                            title: e.msg,
                            icon: e.msg,
                            text: a,
                        });
                        this.getDataFromApi()
                        this.deleteId = 0
                    })
                }
            });
        },
    },
}
</script>
