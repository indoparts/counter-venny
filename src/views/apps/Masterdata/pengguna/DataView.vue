<template>
    <v-card flat color="card">
        <v-card-title>Master Data Pengguna</v-card-title>
        <v-card-text>
            <v-text-field
                label="Cari data..."
                prepend-inner-icon="mdi-text-search"
                outlined dense
                v-model="search"
                @keyup="filter()"
              ></v-text-field>
            <v-data-table dense flat show-expand :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" :single-expand="singleExpand" item-key="id"
                :expanded.sync="expanded">
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('user-update')">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('user-delete')">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length / 2">
                        <tr>
                            <th class="text-left">Aktivasi</th>
                            <td> : {{ item.activation ? 'aktif' : 'tidak aktif' }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Lokasi Kerja</th>
                            <td> : {{ item.work_location }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Saldo Cuti</th>
                            <td> : {{ item.saldo_cuti }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">No HP</th>
                            <td> : {{ item.hp }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Selfi Masuk</th>
                            <td> : <v-img max-height="100" max-width="100" :src="baseUrl + item.avatar"></v-img>
                            </td>
                        </tr>
                    </td>
                    <td :colspan="headers.length / 2">
                        <tr>
                            <th class="text-left">Status kerja</th>
                            <td> : {{ item.status }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Tgl. Join</th>
                            <td> : {{ $parseDate(item.tgl_join) }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Limit Kasbon</th>
                            <td> : {{ item.limit_kasbon }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Role Akses</th>
                            <td> : {{ item.rolename }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Departemen</th>
                            <td> : {{ item.deptname }}</td>
                        </tr>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            search:'',
            baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
            expanded: [],
            singleExpand: false,
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'NIK', value: 'nik' },
                { text: 'NAMA', value: 'name' },
                { text: 'EMAIL', value: 'email' },
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
        ...mapActions("masterdata_user", ['index', 'edit', 'delete']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, search: this.search }
            this.index(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        filter() {
            this.getDataFromApi()
        },
        editItem(id) {
            this.$router.push({ name: 'master-data-pengguna.show', params: { id: id } })
        },
        deleteItem(id) {
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
                    this.delete(id).then((e) => {
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