<template>
    <v-card color="card" flat>
        <v-card-title>List Data</v-card-title>
        <v-card-text>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading">
                <template v-slot:[`item.date`]="{ item }">
                    {{ parseDate(item.date) }}
                </template>
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-jadwalgroup')">
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
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            search: '',
            headers: [
                { text: 'Nama Group', value: 'master_group.nama' },
                { text: 'Jadwal Kerja', value: 'time_config.type' },
                { text: 'Jam Kerja Mulai', value: 'time_config.jam_mulai' },
                { text: 'Jam Kerja Selesai', value: 'time_config.jam_berakhir' },
                { text: 'Tanggal', value: 'date' },
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
        ...mapActions('jadwal_kerja', ['index', 'delete']),
        getDataFromApi() {
            this.loading = true
            this.getUserLogin().then((res) => {
                const v = res.data.data.user
                this.search = v.dept_id
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
