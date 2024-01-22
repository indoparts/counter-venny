<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <div v-for="(item, index) in content" :key="index">
            <v-card class="card" v-if="$route.params.data === item.param">
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-text>
                    <p>{{ item.introduction }}</p>
                    <ul>
                        <li v-for="(i, x) in item.licontent" :key="x">
                            <strong>{{ i.title }}</strong><br>
                            <p>{{ i.subtitle }}</p>
                        </li>
                        <h3>Roudmap Persiapan data</h3>
                        <v-breadcrumbs :items="item.roudmap">
                            <template v-slot:divider>
                                <v-icon>mdi-forward</v-icon>
                            </template>
                        </v-breadcrumbs>
                        <h3>Roudmap Aktifitas</h3>
                        <v-breadcrumbs :items="item.roudmapActivity">
                            <template v-slot:divider>
                                <v-icon>mdi-forward</v-icon>
                            </template>
                        </v-breadcrumbs>
                    </ul>
                    <v-alert color="info" dark icon="mdi-firework" dense>
                        <p>{{ item.info }}</p>
                    </v-alert>
                </v-card-text>
            </v-card>
        </div>
        <v-card class="card" v-if="$route.params.data === 'error-reporting'">
            <v-card-title>
                Laporan error
            </v-card-title>
            <v-card-text>
                <v-alert dark icon="mdi-firework" dense color="card">
                    <p>Jika anda mengalami kesulitan, keluhan bug, error, dan kendala lainya dalam proses penggunaan
                        sistem, anda dapat menghubungi kami di nomor yang tertera di footer sistem. terimakasih.</p>
                </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        content: [
            {
                param: 'absensi',
                title: 'Persiapan fitur absensi',
                introduction: 'Sebelum fitur absensi digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Pengguna',
                        subtitle: 'Data pengguna disiapkan agar sistem dapat melakukan validasi user ketika login untuk memmulai sesi penggunaan sistem dan melakukan aktifitas didalam sistem.',
                    },
                    {
                        title: 'Data Role',
                        subtitle: 'Data role disiapkan terlebih dulu sebelum pembuatan data pengguna karena akan digunakan pada saat penambahan data pengguna untuk menentukan akses pengguna',
                    },
                    {
                        title: 'Data Akses',
                        subtitle: 'Data akses disiapkan terlebih dulu sebelum pembuatan data role karena akan digunakan pada saat penambahan data role untuk menentukan akses group setiap role',
                    },
                    {
                        title: 'Data Toko',
                        subtitle: 'Data toko disiapkan terlebih dulu sebelum pembuatan data pengguna karena akan digunakan pada saat penambahan data pengguna untuk menentukan lokasi kordinat dimana pengguna dapat melakukan absensi.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data role', disabled: false },
                    { text: 'Tentukan akses setiap role', disabled: false },
                    { text: 'Siapkan data toko', disabled: false },
                    { text: 'Siapkan data pengguna', disabled: false },
                    { text: 'Pengguna siap menggunakan sistem', disabled: false }
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu absensi dihalaman beranda', disabled: false },
                    { text: 'Pengguna mengisi form absensi', disabled: false },
                    { text: 'Submit form', disabled: false },
                    { text: 'Data terkirim dan selesai', disabled: false }
                ],
                info: 'Jika anda mengalami kesulitan dalam proses penggunaan sistem, anda dapat menghubungi kami di nomor yang tertera di footer sistem.terimakasih.'
            },
            {
                param: 'cuti',
                title: 'Persiapan fitur cuti',
                introduction: 'Sebelum fitur cuti digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan data diri anda telah memiliki saldo cuti, jika belum anda dapat menghubungin Administrator sistem untuk memberikan anda saldo cuti.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan anda sudah memiliki group users', disabled: false },
                    { text: 'Pastikan anda memiliki saldo cuti', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Tools pada left sidebar', disabled: false },
                    { text: 'Pilih menu pengajuan cuti', disabled: false },
                    { text: 'Pilih menu form pengajuan cuti pada right sidebar', disabled: false },
                    { text: 'Isi form pengajuan cuti lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika permohonan anda telah disetujui oleh pengguna yang telah anda tunjuk pada option dropdown "Ajukan kepada ?", maka hal tersebut menjadi indikator disetujui atau tidak nya pengajuan anda.'
            },
            {
                param: 'izin',
                title: 'Persiapan fitur izin',
                introduction: 'Sebelum fitur izin digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Tools pada left sidebar', disabled: false },
                    { text: 'Pilih menu pengajuan izin', disabled: false },
                    { text: 'Pilih menu form pengajuan izin pada right sidebar', disabled: false },
                    { text: 'Isi form pengajuan izin lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika permohonan anda telah disetujui oleh pengguna yang telah anda tunjuk pada option dropdown "Ajukan kepada ?", maka hal tersebut menjadi indikator disetujui atau tidak nya pengajuan anda.'
            },
            {
                param: 'lembur',
                title: 'Persiapan fitur lembur',
                introduction: 'Sebelum fitur lembur digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Tools pada left sidebar', disabled: false },
                    { text: 'Pilih menu pengajuan lembur', disabled: false },
                    { text: 'Pilih menu form pengajuan lembur pada right sidebar', disabled: false },
                    { text: 'Isi form pengajuan lembur lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika permohonan anda telah disetujui oleh pengguna yang telah anda tunjuk pada option dropdown "Ajukan kepada ?", maka hal tersebut menjadi indikator disetujui atau tidak nya pengajuan anda.'
            },
            {
                param: 'perdin',
                title: 'Persiapan fitur perjalanan dinas',
                introduction: 'Sebelum fitur perjalanan dinas digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Tools pada left sidebar', disabled: false },
                    { text: 'Pilih menu pengajuan perjalanan dinas', disabled: false },
                    { text: 'Pilih menu form pengajuan perjalanan dinas pada right sidebar', disabled: false },
                    { text: 'Isi form pengajuan perjalanan dinas lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika permohonan anda telah disetujui oleh pengguna yang telah anda tunjuk pada option dropdown "Ajukan kepada ?", maka hal tersebut menjadi indikator disetujui atau tidak nya pengajuan anda.'
            },
            {
                param: 'reimburs',
                title: 'Persiapan fitur reimburs/klaim',
                introduction: 'Sebelum fitur reimburs/klaim digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Tools pada left sidebar', disabled: false },
                    { text: 'Pilih menu pengajuan reimburs/klaim', disabled: false },
                    { text: 'Pilih menu form pengajuan reimburs/klaim pada right sidebar', disabled: false },
                    { text: 'Isi form pengajuan reimburs/klaim lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika permohonan anda telah disetujui oleh pengguna yang telah anda tunjuk pada option dropdown "Ajukan kepada ?", maka hal tersebut menjadi indikator disetujui atau tidak nya pengajuan anda.'
            },
            {
                param: 'jadwal-istirahat',
                title: 'Persiapan fitur jadwal istirahat',
                introduction: 'Sebelum fitur jadwal istirahat digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Jadwal pada left sidebar', disabled: false },
                    { text: 'Pilih menu jadwal istirahat', disabled: false },
                    { text: 'Pilih menu form jadwal istirahat pada right sidebar', disabled: false },
                    { text: 'Isi form jadwal istirahat lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika anda mengalami kesulitan dalam penggunaan sistem, silahkan hubungi kami dinomer handphone yang tertera pada foter sistem.'
            },
            {
                param: 'jadwal-piket',
                title: 'Persiapan fitur jadwal piket',
                introduction: 'Sebelum fitur jadwal piket digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    },
                    {
                        title: 'Data Master Piket',
                        subtitle: 'Pastikan anda sudah menyiapkan data master piket terlebih dulu sebelum membuat jadwal piket..',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Jadwal pada left sidebar', disabled: false },
                    { text: 'Pilih menu jadwal piket', disabled: false },
                    { text: 'Pilih menu form jadwal piket pada right sidebar', disabled: false },
                    { text: 'Isi form jadwal piket lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika anda mengalami kesulitan dalam penggunaan sistem, silahkan hubungi kami dinomer handphone yang tertera pada foter sistem.'
            },
            {
                param: 'jadwal-kerja',
                title: 'Persiapan fitur jadwal kerja',
                introduction: 'Sebelum fitur jadwal kerja digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    },
                    {
                        title: 'Data Master Waktu',
                        subtitle: 'Pastikan anda sudah menyiapkan data master waktu terlebih dulu sebelum membuat jadwal kerja.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Jadwal pada left sidebar', disabled: false },
                    { text: 'Pilih menu jadwal kerja', disabled: false },
                    { text: 'Pilih menu form jadwal kerja pada right sidebar', disabled: false },
                    { text: 'Isi form jadwal kerja lalu submit data', disabled: false },
                    { text: 'Menunggu proses approval', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika anda mengalami kesulitan dalam penggunaan sistem, silahkan hubungi kami dinomer handphone yang tertera pada foter sistem.'
            },
            {
                param: 'keuangan-gaji',
                title: 'Persiapan fitur keuangan gaji',
                introduction: 'Sebelum fitur keuangan gaji digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    },
                    {
                        title: 'Setup Variable',
                        subtitle: 'Pastikan anda sudah menyiapkan variable formula terlebih dulu sebelumnya',
                    },
                    {
                        title: 'Setup Formula',
                        subtitle: 'Setelah membuat variable maka anda dapat melakukan setup formula dengan variable yang sebelumnya dibuat.',
                    },
                    {
                        title: 'Generate Gaji',
                        subtitle: 'Setelah membuat formula maka anda dapat men-generate kalkulasi gaji berdasarkan formula yang dibuat sebelumnya, dan anda dapat melakukan revisi sebelum akhirnya anda simpan data tersebut.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'variable', disabled: false },
                    { text: 'formula', disabled: false },
                    { text: 'generate gaji', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Jadwal pada left sidebar', disabled: false },
                    { text: 'Pilih menu keuangan gaji', disabled: false },
                    { text: 'Pilih menu setup formula gaji pada right sidebar', disabled: false },
                    { text: 'Isi form setup formula gaji lalu submit data', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika anda mengalami kesulitan dalam penggunaan sistem, silahkan hubungi kami dinomer handphone yang tertera pada foter sistem.'
            },
            {
                param: 'keuangan-kasbon',
                title: 'Persiapan fitur keuangan kasbon',
                introduction: 'Sebelum fitur keuangan kasbon digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Jadwal pada left sidebar', disabled: false },
                    { text: 'Pilih menu keuangan kasbon', disabled: false },
                    { text: 'Pilih menu form kasbon pada right sidebar', disabled: false },
                    { text: 'Isi form form kasbon lalu submit data', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika anda mengalami kesulitan dalam penggunaan sistem, silahkan hubungi kami dinomer handphone yang tertera pada foter sistem.'
            },
            {
                param: 'resign',
                title: 'Persiapan fitur resign',
                introduction: 'Sebelum fitur resign digunakan, terlebih dulu anda harus mempersiapkan beberapa data antara lain :',
                licontent: [
                    {
                        title: 'Data Diri',
                        subtitle: 'Pastikan akun anda sudah tergabung dengan group pengguna didalam sistem!',
                    },
                    {
                        title: 'Data Group Pengguna',
                        subtitle: 'Jika anda belum tergabung dalam group pengguna maka hubungi administrator sistem untuk menambahkan akun anda dalam group pengguna.',
                    }
                ],
                roudmap: [
                    { text: 'Persiapan data diri', disabled: false },
                    { text: 'Pastikan akun anda tergabung dalam group pengguna', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                roudmapActivity: [
                    { text: 'Pengguna melakukan login', disabled: false },
                    { text: 'Pilih menu Jadwal pada left sidebar', disabled: false },
                    { text: 'Pilih menu resign', disabled: false },
                    { text: 'Pilih menu form resign pada right sidebar', disabled: false },
                    { text: 'Isi form form resign lalu submit data', disabled: false },
                    { text: 'selesai', disabled: false },
                ],
                info: 'Jika anda mengalami kesulitan dalam penggunaan sistem, silahkan hubungi kami dinomer handphone yang tertera pada foter sistem.'
            }
        ],
    }),
}
</script>