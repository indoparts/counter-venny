<template>
    <v-card flat color="card">
        <v-card-title>Master Departemen</v-card-title>
        <v-card-text>
            <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
                @keyup="filter()"></v-text-field>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" :single-expand="true" :expanded.sync="expanded"
                item-key="id" show-expand>
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
                <template v-slot:[`item.gaji_perbulan`]="{ item }">
                    {{ formatRupiah(item.gaji_perbulan) }}
                </template>
                <template v-slot:[`item.gaji_perhari`]="{ item }">
                    {{ formatRupiah(item.gaji_perhari) }}
                </template>
                <template v-slot:[`item.gaji_thp`]="{ item }">
                    {{ formatRupiah(item.gaji_thp) }}
                </template>
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('gaji-update')">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('gaji-delete')">
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
            search: '',
            deleteId: 0,
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
        ...mapActions("gaji", ['index', 'edit', 'delete']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, search: this.search }
            this.index(tableAttr).then(r => {
                this.desserts = r.data.data
                this.totalDesserts = r.data.meta.total
                this.loading = false
            })
        },
        filter() {
            this.getDataFromApi()
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        },
        editItem(id) {
            this.$router.push({ path: `/summary-gaji/edit/${id}` })
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
                    this.delete(this.deleteId).then((e) => {
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
        formatRupiah(angka) {
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka)
        }
    },
}
</script>