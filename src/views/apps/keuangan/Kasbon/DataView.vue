<template>
    <v-card color="card" flat>
        <v-card-title>List Data</v-card-title>
        <v-card-text>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading" :single-expand="true" :expanded.sync="expanded"
                item-key="id" show-expand>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-row class="mt-5">
                            <v-col cols="12" md="6">
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
                            <v-col cols="12" md="6">
                                <tr>
                                    <th class="text-left">Nominal Pinjaman</th>
                                    <td>: {{ formatRupiah(item.nominal_pinjaman) }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Tenor</th>
                                    <td>: {{ item.tenor }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Nominal Angsuran</th>
                                    <td>: {{ formatRupiah(item.nominal_angsuran) }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Status Pinjaman</th>
                                    <td>: {{ item.status_pinjaman }}</td>
                                </tr>
                            </v-col>
                        </v-row>
                        <v-row class="mb-5">
                            <v-col cols="12">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">
                                                    Angsuran Ke
                                                </th>
                                                <th class="text-left">
                                                    Jumlah Dibayarkan
                                                </th>
                                                <th class="text-left">
                                                    Status Pembayaran
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(i, index) in item.angsuran" :key="i.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ formatRupiah(item.nominal_angsuran) }}</td>
                                                <td>
                                                    <v-chip class="ma-2" label
                                                        :color="statusPembayaran(i.status_pembayaran)">
                                                        {{ i.status_pembayaran === 'y' ? 'sudah dibayar' : 'belum dibayar'
                                                        }}
                                                    </v-chip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </td>
                </template>
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ parseDate(item.created_at) }}
                </template>
                <template v-slot:[`item.nominal_pinjaman`]="{ item }">
                    {{ formatRupiah(item.nominal_pinjaman) }}
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
            expanded: [],
            search: '',
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'Nama', value: 'user.name' },
                { text: 'NIK', value: 'user.nik' },
                { text: 'Diajukan', value: 'created_at' },
                { text: 'Nominal Pinjaman', value: 'nominal_pinjaman' },
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
        ...mapActions('summary_kasbon', ['index']),
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
        statusPembayaran(e) {
            if (e === 'y')
                return 'primary'
            if (e === 'n')
                return 'error'
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka)
        }
    },
}
</script>
