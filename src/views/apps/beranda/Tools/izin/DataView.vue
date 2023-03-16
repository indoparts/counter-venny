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
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length/2">
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
                    <td :colspan="headers.length/2">
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
            search:'',
            headers: [
                { text: 'Tanggal Dibuat', value: 'date' },
                { text: 'Tanggal Diajukan', value: 'todate' },
                { text: 'Durasi', value: 'leave_duration' },
                { text: 'Tipe Permintaan', value: 'req_type' },
                { text: 'Jenis Izin', value: 'permit_req' },
                { text: 'Approval', value: 'status_approval' },
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
        ...mapActions('pengajuan_izin', ['index']),
        getDataFromApi() {
            this.loading = true
            this.getUserLogin().then((res) => {
                const v = res.data.data.user
                this.search = v.id
                const tableAttr = { options: this.options, authId:this.search }
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
