<template>
    <v-card color="card" id="print">
        <v-card-title>
            <v-simple-table dense>
                <template v-slot:default>
                    <tr>
                        <td width="50%" class="text-left">{{ dataSlip.office.alamat }}</td>
                        <td class="text-right">
                            <h2>{{ dataSlip.office.nama }}</h2>
                        </td>
                    </tr>
                </template>
            </v-simple-table>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-space-between" v-for="i in dataSlip.data" :key="i.id">
            <v-simple-table dense>
                <template v-slot:default>
                    <tr>
                        <th class="text-left">Nama</th>
                        <td class="text-left">: {{ i.user.name }}</td>
                    </tr>
                    <tr>
                        <th class="text-left">NIK</th>
                        <td class="text-left">: {{ i.user.nik }}</td>
                    </tr>
                    <tr>
                        <th class="text-left">Status</th>
                        <td class="text-left">: {{ i.user.status }}</td>
                    </tr>
                    <tr>
                        <th class="text-left">Telp</th>
                        <td class="text-left">: {{ i.user.hp }}</td>
                    </tr>
                </template>
            </v-simple-table>
            <v-simple-table dense>
                <template v-slot:default>
                    <tr>
                        <th class="text-left">Tanggal</th>
                        <td class="text-left">: {{ parseDate(i.created_at) }}</td>
                    </tr>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Keterangan
                            </th>
                            <th class="text-left">
                                Jumlah
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="i in dataSlip.data" :key="i.id">
                        <tr>
                            <td>Total Absensi</td>
                            <td>: {{ i.total_absen }}</td>
                        </tr>
                        <tr>
                            <td>Total Terlambat</td>
                            <td>: {{ i.total_terlambat }}</td>
                        </tr>
                        <tr>
                            <td>Total Gaji Perbulan</td>
                            <td>: {{ formatRupiah(i.gaji_perbulan) }}</td>
                        </tr>
                        <tr>
                            <td>Total Gaji Diterima</td>
                            <td>: {{ formatRupiah(i.gaji_thp) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn depressed color="primary" block @click="printpdf">
                Print
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        loading: false,
        dataSlip: {
            data: [],
            office: {
                id: '',
                nama: '',
                alamat: '',
                telepon: ''
            }
        }
    }),
    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    watch: {
        authenticated(v) {
            if (v.id !== undefined)
                this.getVariable(v.id)
        }
    },
    mounted() {
        if (this.authenticated.id) {
            this.getVariable(this.authenticated.id)
        }
    },
    methods: {
        ...mapActions('gaji', ['selip']),
        getVariable(e) {
            this.loading = true
            this.selip(e).then((res) => {
                this.dataSlip.data = res.data.data.data
                this.dataSlip.office = res.data.data.office
                this.loading = false
            })
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka)
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD');
        },
        printpdf() {
            const prtHtml = document.getElementById('print').innerHTML;
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
            }
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        }
    }
}
</script>