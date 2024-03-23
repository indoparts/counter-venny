<template>
    <div>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-select dense outlined v-model="form.bulan" label="Pilih Bulan" required
                        :rules="[v => !!v || 'Item is required']" :items="bln" item-text="name" item-value="value"
                        disabled></v-select>
                    <v-select dense outlined v-model="form.tahun" label="Pilih Tahun" required
                        :rules="[v => !!v || 'Item is required']" :items="thn" disabled></v-select>
                    <v-btn depressed color="primary" @click="generateSubmit" tile height="40" :loading="loading"
                        :disabled="!valid">
                        <v-icon>mdi-robot-outline</v-icon>
                    </v-btn>
                </v-row>
            </v-container>
        </v-form>
        <v-card color="card" flat v-if="formLoop.length > 0">
            <v-card-title>Data Generator</v-card-title>
            <v-card-text>
                <v-row no-gutters v-for="i in formLoop" :key="i.id">
                    <v-col cols="12" md="2">
                        <v-text-field dense outlined label="NIK" required v-model="i.nik"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field dense outlined label="NAMA" required v-model="i.name"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field dense outlined label="PERIODE" required v-model="i.periode"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field dense outlined label="TOTAL ABSEN" required v-model="i.total_absen"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field dense outlined label="ABSEN TERLAMBAT" required v-model="i.total_terlambat"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field dense outlined label="GAJI" required v-model="i.gaji_perbulan"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined label="HARI KERJA" required v-model="i.total_workday"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined label="GAJI PERHARI" required v-model="i.gaji_perhari"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined label="KASBON" required v-model="i.kasbon"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" disabled />
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field dense outlined label="GAJI TOTAL" required v-model="i.gaji_thp"
                            :rules="[v => !!v || 'Item is required']" class="mb-input" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-alert border="top" color="red lighten-2" dark>
                (Total gaji : jumlah hari kerja (jadwal) x total absen) - kasbon(pinjaman) = gaji THP
            </v-alert>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="save">
                    Simpan
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data: () => ({
        valid: false,
        loading: false,
        form: {
            bulan: '',
            tahun: '',
        },
        data: [],
        bln: [],
        thn: [],
        formLoop: [],
    }),
    mounted() {
        for (let i = 1; i <= 12; i++) {
            this.bln.push({
                name: this.blnName(i),
                value: i
            })
        }
        for (let i = 2022; i <= new Date().getFullYear(); i++) {
            this.thn.push(i)
        }
        this.form.bulan = new Date().getMonth() + 1
        this.form.tahun = new Date().getFullYear()
    },
    methods: {
        ...mapActions('summary_gaji', ['generateData']),
        ...mapActions('gaji', ['store']),
        generateSubmit() {
            this.loading = true
            this.generateData(this.form).then((res) => {
                res.data.forEach(el => {
                    let idset = this.formLoop.length - 1
                    this.formLoop.push({
                        id: `${++idset}`,
                        user_id: el.user_id,
                        nik: el.nik,
                        name: el.name,
                        periode: el.periode_gaji,
                        total_absen: el.total_absen,
                        total_terlambat: el.total_absen_telat,
                        total_workday: this.hitunghari(el.periode_gaji),
                        gaji_perbulan: el.total_gaji_perbulan.toFixed(2),
                        gaji_perhari: (el.total_gaji_perbulan / this.hitunghari(el.periode_gaji) - 4).toFixed(2),
                        kasbon: el.total_kasbon.toFixed(2),
                        gaji_thp: (((el.total_gaji_perbulan / this.hitunghari(el.periode_gaji) - 4) * el.total_absen) - el.total_kasbon).toFixed(2),
                    })
                });
                this.loading = false
            })
        },
        hitunghari(date) {
            const dateparse = new Date(date)
            return new Date(dateparse.getFullYear(), dateparse.getMonth() + 1, 0).getDate();
        },
        save() {
            this.store({ post: this.formLoop }).then((res) => {
                this.$swal(
                    res.msg,
                    res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    res.msg
                )
            })
        },
        blnName(e) {
            switch (e) {
                case 1:
                    return 'Januari'
                case 2:
                    return 'Februari'
                case 3:
                    return 'Maret'
                case 4:
                    return 'April'
                case 5:
                    return 'Mei'
                case 6:
                    return 'Juni'
                case 7:
                    return 'Juli'
                case 8:
                    return 'Agustus'
                case 9:
                    return 'September'
                case 10:
                    return 'Oktober'
                case 11:
                    return 'November'
                case 12:
                    return 'Desember'
            }
        }
    }
}
</script>