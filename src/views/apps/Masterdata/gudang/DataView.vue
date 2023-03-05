<template>
    <v-card flat color="card">
        <v-card-title>Master Gudang</v-card-title>
        <v-card-text>
            <v-text-field label="Cari data..." prepend-inner-icon="mdi-text-search" outlined dense v-model="search"
                @keyup="filter()"></v-text-field>
            <v-data-table dense flat show-expand item-key="id" :expanded.sync="expanded" :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading">
                <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <tr>
                                <th class="text-left">Dibuat</th>
                                <td> : {{ parseDate(item.created_at) }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">Diperbaharui</th>
                                <td> : {{ parseDate(item.updated_at) }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">Alamat</th>
                                <td> : {{ item.alamat }}</td>
                            </tr>
                        </td>
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
            expanded: [],
            headers: [
                { text: 'Nama', value: 'nama' },
                { text: 'Telepon', value: 'telepon' },
                { text: 'Latitude', value: 'latitude' },
                { text: 'Longitude', value: 'longitude' },
                { text: 'Radius', value: 'radius_forabsen' },
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
        ...mapActions("masterdata_gudang", ['index', 'edit', 'delete']),
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
            this.$router.push({ path: `/master-data-office/show/${id}` })
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