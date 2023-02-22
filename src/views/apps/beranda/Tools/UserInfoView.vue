<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-card class="card" v-if="$route.params.data === 'absensi'">
            <v-card-title>
                Persiapan
            </v-card-title>
            <v-card-text>
                <p>Sebelum fitur absensi digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :</p>
                <ul>
                    <li>
                        <strong>Data Pengguna</strong><br>
                        <p>Data pengguna disiapkan agar sistem dapat melakukan validasi user ketika login untuk memmulai
                            sesi penggunaan sistem dan melakukan aktifitas didalam sistem.</p>
                    </li>
                    <li>
                        <strong>Data Role</strong><br>
                        <p>Data role disiapkan terlebih dulu sebelum pembuatan data pengguna karena akan digunakan pada saat
                            penambahan data pengguna untuk menentukan akses pengguna</p>
                    </li>
                    <li>
                        <strong>Data Akses</strong><br>
                        <p>Data akses disiapkan terlebih dulu sebelum pembuatan data role karena akan digunakan pada saat
                            penambahan data role untuk menentukan akses group setiap role</p>
                    </li>
                    <li>
                        <strong>Data Toko</strong><br>
                        <p>Data toko disiapkan terlebih dulu sebelum pembuatan data pengguna karena akan digunakan pada saat
                            penambahan data pengguna untuk menentukan lokasi kordinat dimana pengguna dapat melakukan
                            absensi.</p>
                    </li>
                    <h3>Roudmap Persiapan data</h3>
                    <v-breadcrumbs :items="items">
                        <template v-slot:divider>
                            <v-icon>mdi-forward</v-icon>
                        </template>
                    </v-breadcrumbs>
                    <h3>Roudmap Aktifitas absensi</h3>
                    <v-breadcrumbs :items="itemss">
                        <template v-slot:divider>
                            <v-icon>mdi-forward</v-icon>
                        </template>
                    </v-breadcrumbs>
                </ul>
                <v-alert color="info" dark icon="mdi-firework" dense>
                    <p>Jika anda mengalami kesulitan dalam proses penggunaan sistem, anda dapat menghubungi kami di nomor yang tertera di footer sistem. terimakasih.</p>
                </v-alert>
            </v-card-text>
        </v-card>
        <v-card class="card" v-if="$route.params.data === 'error-reporting'">
            <v-card-title>
                Laporan error
            </v-card-title>
            <v-card-text>
                <v-alert dark icon="mdi-firework" dense color="card">
                    <p>Jika anda mengalami kesulitan, keluhan bug, error, dan kendala lainya dalam proses penggunaan sistem, anda dapat menghubungi kami di nomor yang tertera di footer sistem. terimakasih.</p>
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        items: [
            {
                text: 'Persiapan data role',
                disabled: false,
                href: '1',
            },
            {
                text: 'Tentukan akses setiap role',
                disabled: false,
                href: '2',
            },
            {
                text: 'Siapkan data toko',
                disabled: false,
                href: '3',
            },
            {
                text: 'Siapkan data pengguna',
                disabled: false,
                href: '4',
            },
            {
                text: 'Pengguna siap menggunakan sistem',
                disabled: false,
                href: '5',
            },
        ],
        itemss: [
            {
                text: 'Pengguna melakukan login',
                disabled: false,
                href: '1',
            },
            {
                text: 'Pilih menu absensi dihalaman beranda',
                disabled: false,
                href: '2',
            },
            {
                text: 'Pengguna mengisi form absensi',
                disabled: false,
                href: '3',
            },
            {
                text: 'Submit form',
                disabled: false,
                href: '4',
            },
            {
                text: 'Data terkirim dan selesai',
                disabled: false,
                href: '5',
            },
        ],
    }),
}
</script>