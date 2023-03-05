<template>
    <v-card color="card" flat>
        <v-card-title>List Data</v-card-title>
        <v-card-text>
            <v-data-table dense flat show-expand :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" :single-expand="singleExpand" item-key="id"
                :expanded.sync="expanded">
                <template v-slot:[`item.jam_masuk`]="{ item }">
                    {{ parseDate(item) }}
                </template>
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ parseDate(item) }}
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length / 2">
                        <tr>
                            <th class="text-left">Jam Masuk</th>
                            <td> : {{ parseDate(item.jam_masuk) }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Latitude Masuk</th>
                            <td> : {{ item.latitude_masuk }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Longitude Masuk</th>
                            <td> : {{ item.longitude_masuk }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Selfi Masuk</th>
                            <td> : <v-img max-height="100" max-width="100" :src="baseUrl + item.foto_selfi_masuk"></v-img>
                            </td>
                        </tr>
                    </td>
                    <td :colspan="headers.length / 2">
                        <tr>
                            <th class="text-left">Jam Pulang</th>
                            <td> : {{ parseDate(item.jam_pulang) }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Latitude Pulang</th>
                            <td> : {{ item.latitude_pulang }}</td>
                        </tr>
                        <tr>
                            <th class="text-left">Longitude Pulang</th>
                            <td> : {{ item.longitude_pulang }}</td>
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
            headers: [
                { text: 'Jam Masuk', value: 'jam_masuk' },
                { text: 'Status Masuk', value: 'status_masuk' },
                { text: 'Waktu Terlambat Masuk', value: 'waktu_telat_masuk' },
                { text: 'Data Dibuat', value: 'created_at' },
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
        ...mapActions('pengajuan_cuti', ['index']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options }
            this.index(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        }
    },
}
</script>
