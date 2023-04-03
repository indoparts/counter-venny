<template>
    <v-card color="card" flat>
        <v-card-title>List Data</v-card-title>
        <v-card-text>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" item-key="id">
                <template v-slot:[`item.date`]="{ item }">
                    {{ parseDate(item.date) }}
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
                { text: 'Departemen', value: 'dept.deptname' },
                { text: 'Jabatan', value: 'role.rolename' },
                { text: 'Users', value: 'user.name' },
                { text: 'Waktu', value: 'time' },
                { text: 'Tanggal', value: 'date' },
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
        ...mapActions('jadwal_istirahat', ['index']),
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
