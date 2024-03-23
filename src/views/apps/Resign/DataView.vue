<template>
    <v-card flat color="card">
        <v-card-title>List Data Pengguna Resign</v-card-title>
        <v-card-text>
            <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
                @keyup="filter()"></v-text-field>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading">
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ parseDate(item) }}
                </template>
                <template v-slot:[`item.updated_at`]="{ item }">
                    {{ parseDate(item) }}
                </template>
                <template v-slot:[`item.status_persetujuan`]="{ item }">
                    <v-chip class="ma-2" color="pink" label text-color="white">
                        <v-icon left>
                            {{ item.status_persetujuan === 'y' ? 'mdi-check-all': 'mdi-close' }}
                        </v-icon>
                        {{ item.status_persetujuan === 'y' ? 'Disetujui' : 'Belum Disetujui' }}
                    </v-chip>
                </template>
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('resign-update')">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('resign-delete')">
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
            search: '',
            deleteId: 0,
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'Nama', value: 'user.name' },
                { text: 'NIK', value: 'user.nik' },
                { text: 'Status Pengajuan', value: 'status_persetujuan' },
                { text: 'Tgl Dibuat', value: 'created_at' },
                { text: 'Tgl Diperbaharui', value: 'updated_at' },
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
        ...mapActions("resign", ['index', 'edit', 'delete']),
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
            this.$router.push({ path: `/resign/edit/${id}` })
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
    },
}
</script>