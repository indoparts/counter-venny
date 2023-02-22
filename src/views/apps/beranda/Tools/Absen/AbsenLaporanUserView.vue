<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-card color="card" flat>
            <v-card-title>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" label="Filter by range" prepend-icon="mdi-calendar" single-line
                            hide-details v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" range>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-spacer></v-spacer>
                <v-select v-model="find" :items="items" item-text="nama" item-value="id" label="filter by store"
                    single-line hide-details @change="getDataFromApi()"></v-select>
            </v-card-title>
            <v-data-table dense :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" :single-expand="singleExpand"
                :expanded.sync="expanded" item-key="name" show-expand>
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
                        <tr>
                            <th class="text-left">Selfi Pulang</th>
                            <td> : <v-img max-height="100" max-width="100" :src="baseUrl + item.foto_selfi_pulang"></v-img>
                            </td>
                        </tr>
                    </td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            baseUrl: `http://${process.env.BASE_URL_API}/api/images/absensi-users/`,
            date: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)],
            menu: false,
            items: [],
            filterbytoko: null,
            find: '',
            expanded: [],
            singleExpand: false,
            headers: [
                { text: 'Jam masuk', value: 'jam_masuk' },
                { text: 'Status masuk', value: 'status_masuk' },
                { text: 'Jam pulang', value: 'jam_pulang' },
                { text: 'Tgl. Dibuat', value: 'created_at' },
                { text: 'Toko', value: 'toko.nama' },
            ],
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
        }
    },
    created() {
        this.attr_form_user().then((res) => {
            this.items = res.data.toko
        })
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
        date() {
            this.getDataFromApi()
        },
    },
    methods: {
        ...mapActions('masterdata_user', ['attr_form_user']),
        ...mapActions('absensi', ['laporan']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, attr: { search: this.find, between: this.date } }
            this.laporan(tableAttr).then(res => {
                if (res.msg === 'success') {
                    this.desserts = res.data.data
                    this.totalDesserts = res.data.meta.total
                }
                this.loading = false
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        }
    },
}
</script>