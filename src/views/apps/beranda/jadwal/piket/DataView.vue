<template>
    <v-card color="card" flat>
        <v-card-title>List Data</v-card-title>
        <v-card-text>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" item-key="id" :expanded.sync="expanded" show-expand>
                <template v-slot:[`item.date`]="{ item }">
                    {{ parseDate(item.date) }}
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length / 2">
                        <tr>
                            <th class="text-left">Foto Area Sebelum Piket</th>
                            <td> : <v-img max-height="100" max-width="100" :src="baseUrl + item.img_before"></v-img>
                            </td>
                        </tr>
                    </td>
                    <td :colspan="headers.length / 2">
                        <tr>
                            <th class="text-left">Foto Area Setelah Piket</th>
                            <td> : <v-img max-height="100" max-width="100" :src="baseUrl + item.img_after"></v-img>
                            </td>
                        </tr>
                    </td>
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
            baseUrl: `http://${process.env.BASE_URL_API}/api/images/piket-users/`,
            totalDesserts: 0,
            expanded: [],
            desserts: [],
            loading: true,
            options: {},
            search: '',
            headers: [
                { text: 'Departemen', value: 'dept.deptname' },
                { text: 'Jabatan', value: 'role.rolename' },
                { text: 'Users', value: 'user.name' },
                { text: 'Waktu', value: 'time' },
                { text: 'Tugas Piket', value: 'masterPiket.tugas' },
                { text: 'Tanggal', value: 'date' },
                { text: '', value: 'data-table-expand' },
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
        ...mapActions('jadwal_piket', ['index']),
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
        }
    },
}
</script>
