<template>
    <div>
        <v-list dense nav subheader v-if="!isDashboard">
            <v-subheader>Aksi Data</v-subheader>
            <v-list-item-group v-model="selectedRightDrawer" color="primary">
                <v-list-item v-for="([title, icon, link, permission], i) in menu" :key="i" @click="movePage(link)" router
                    exact>
                    <v-list-item-action v-if="$can(permission)">
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content v-if="$can(permission)">
                        <v-list-item-title>{{ title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-list subheader three-line v-if="isDashboard">
            <v-subheader>User Guide</v-subheader>

            <v-list-item v-for="(i, index) in dataGuide" :key="index">
                <v-list-item-content>
                    <v-list-item-title>{{ i.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ i.subtitle }}</v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined :to="i.link">
                            Lihat
                        </v-btn>
                    </v-list-item-action>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedRightDrawer: 0,
            menu: [],
            isDashboard: false,
            dataGuide:[
                {
                    title:'Absensi',
                    subtitle:'Informasi tentang penggunaan fitur absensi dapat anda lihat disini.',
                    link:'/users-info/absensi'
                },
                {
                    title: 'Laporan error',
                    subtitle: 'Jika anda mengalami masalah tentang bug, error, dan keluhan lainya. Anda dapat menghubungi kami.',
                    link: '/users-info/error-reporting'
                },
                {
                    title: 'Tools Cuti',
                    subtitle: 'Informasi tentang penggunaan fitur cuti dapat anda lihat disini.',
                    link: '/users-info/cuti'
                },
                {
                    title: 'Tools Izin',
                    subtitle: 'Informasi tentang penggunaan fitur izin dapat anda lihat disini.',
                    link: '/users-info/izin'
                },
                {
                    title: 'Tools Lembur',
                    subtitle: 'Informasi tentang penggunaan fitur lembur dapat anda lihat disini.',
                    link: '/users-info/lembur'
                },
                {
                    title: 'Tools Perjalanan Dinas',
                    subtitle: 'Informasi tentang penggunaan fitur perjalanan dinas dapat anda lihat disini.',
                    link: '/users-info/perdin'
                },
                {
                    title: 'Tools Reimburs/Klaim',
                    subtitle: 'Informasi tentang penggunaan fitur reimburs/klaim dapat anda lihat disini.',
                    link: '/users-info/reimburs'
                },
                {
                    title: 'Jadwal Istirahat',
                    subtitle: 'Informasi tentang penggunaan fitur jadwal istirahat dapat anda lihat disini.',
                    link: '/users-info/jadwal-istirahat'
                },
                {
                    title: 'Jadwal Piket',
                    subtitle: 'Informasi tentang penggunaan fitur jadwal piket dapat anda lihat disini.',
                    link: '/users-info/jadwal-piket'
                },
                {
                    title: 'Jadwal Kerja',
                    subtitle: 'Informasi tentang penggunaan fitur jadwal kerja dapat anda lihat disini.',
                    link: '/users-info/jadwal-kerja'
                },
                {
                    title: 'Keuangan Gaji',
                    subtitle: 'Informasi tentang penggunaan fitur keuangan gaji dapat anda lihat disini.',
                    link: '/users-info/keuangan-gaji'
                },
                {
                    title: 'Keuangan Kasbon',
                    subtitle: 'Informasi tentang penggunaan fitur keuangan kasbon dapat anda lihat disini.',
                    link: '/users-info/keuangan-kasbon'
                },
                {
                    title: 'Permohonan Resign',
                    subtitle: 'Informasi tentang penggunaan fitur permohonan resign dapat anda lihat disini.',
                    link: '/users-info/resign'
                },
            ]
        }
    },
    mounted(){
        this.rendered(this.$route.name)
    },
    watch: {
        $route(e) {
            this.rendered(e.name)
        }
    },
    methods: {
        rendered(e){
            console.log(e);
            switch (e) {
                case 'dashboard':
                    this.isDashboard = true
                    break;
                case 'users-info':
                    this.isDashboard = true
                    break;
                case 'users-absen':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'list-data-absensi-user':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'grafik-data-absensi-user':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'laporan-data-absensi':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 3
                    this.isDashboard = false
                    break;
                case 'cuti.data':
                    this.menu = this.$store.state.pengajuan_cuti.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'cuti.add':
                    this.menu = this.$store.state.pengajuan_cuti.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'cuti.form':
                    this.menu = this.$store.state.pengajuan_cuti.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'cuti.laporan':
                    this.menu = this.$store.state.pengajuan_cuti.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'izin.data':
                    this.menu = this.$store.state.pengajuan_izin.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'izin.add':
                    this.menu = this.$store.state.pengajuan_izin.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'izin.laporan':
                    this.menu = this.$store.state.pengajuan_izin.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'lembur.data':
                    this.menu = this.$store.state.pengajuan_lembur.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'lembur.add':
                    this.menu = this.$store.state.pengajuan_lembur.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'lembur.edit':
                    this.menu = this.$store.state.pengajuan_lembur.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'lembur.laporan':
                    this.menu = this.$store.state.pengajuan_lembur.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'perdin.data':
                    this.menu = this.$store.state.pengajuan_perdin.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'perdin.add':
                    this.menu = this.$store.state.pengajuan_perdin.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'perdin.edit':
                    this.menu = this.$store.state.pengajuan_perdin.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'perdin.laporan':
                    this.menu = this.$store.state.pengajuan_perdin.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'reimburs.data':
                    this.menu = this.$store.state.pengajuan_reimburs.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'reimburs.add':
                    this.menu = this.$store.state.pengajuan_reimburs.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'reimburs.edit':
                    this.menu = this.$store.state.pengajuan_reimburs.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'reimburs.laporan':
                    this.menu = this.$store.state.pengajuan_reimburs.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'jadwal-istirahat.data':
                    this.menu = this.$store.state.jadwal_istirahat.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'jadwal-istirahat.add':
                    this.menu = this.$store.state.jadwal_istirahat.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'jadwal-istirahat.laporan':
                    this.menu = this.$store.state.jadwal_istirahat.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'jadwal-piket.data':
                    this.menu = this.$store.state.jadwal_piket.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'jadwal-piket.add':
                    this.menu = this.$store.state.jadwal_piket.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'jadwal-piket.laporan':
                    this.menu = this.$store.state.jadwal_piket.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'jadwal-kerja.data':
                    this.menu = this.$store.state.jadwal_kerja.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'jadwal-kerja.add':
                    this.menu = this.$store.state.jadwal_kerja.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'jadwal-kerja.timeconfig':
                    this.menu = this.$store.state.jadwal_kerja.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'summary-gaji.data':
                    this.menu = this.$store.state.summary_gaji.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'summary-gaji.edit':
                    this.menu = this.$store.state.summary_gaji.rightMenuDrawer
                    this.selectedRightDrawer = null
                    this.isDashboard = false
                    break;
                case 'summary-gaji.laporan':
                    this.menu = this.$store.state.summary_gaji.rightMenuDrawer
                    this.selectedRightDrawer = 3
                    this.isDashboard = false
                    break;
                case 'summary-gaji.selip':
                    this.menu = this.$store.state.summary_gaji.rightMenuDrawer
                    this.selectedRightDrawer = 4
                    this.isDashboard = false
                    break;
                case 'summary-gaji.formula':
                    this.menu = this.$store.state.summary_gaji.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'summary-gaji.generate':
                    this.menu = this.$store.state.summary_gaji.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'summary-kasbon.data':
                    this.menu = this.$store.state.summary_kasbon.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'summary-kasbon.form':
                    this.menu = this.$store.state.summary_kasbon.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'summary-kasbon.report':
                    this.menu = this.$store.state.summary_kasbon.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'resign.form':
                    this.menu = this.$store.state.resign.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'resign.edit':
                    this.menu = this.$store.state.resign.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'resign.data':
                    this.menu = this.$store.state.resign.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'masterdata-piket':
                    this.menu = this.$store.state.jadwal_piket.rightMenuDrawer
                    this.selectedRightDrawer = 3
                    this.isDashboard = false
                    break;
                case 'master-data-pengguna.data':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-pengguna.add':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-pengguna.show':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-pengguna.group':
                    this.menu = this.$store.state.masterdata_user.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    this.isDashboard = false
                    break;
                case 'master-data-role.data':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-role.add':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-role.show':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-dept.data':
                    this.menu = this.$store.state.masterdata_dept.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-dept.add':
                    this.menu = this.$store.state.masterdata_dept.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-dept.show':
                    this.menu = this.$store.state.masterdata_dept.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-role.setrole':
                    this.menu = this.$store.state.masterdata_role.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-akses.data':
                    this.menu = this.$store.state.masterdata_akses.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-akses.add':
                    this.menu = this.$store.state.masterdata_akses.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-akses.show':
                    this.menu = this.$store.state.masterdata_akses.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-toko.data':
                    this.menu = this.$store.state.masterdata_toko.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-toko.add':
                    this.menu = this.$store.state.masterdata_toko.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-toko.show':
                    this.menu = this.$store.state.masterdata_toko.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-office.data':
                    this.menu = this.$store.state.masterdata_office.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-office.add':
                    this.menu = this.$store.state.masterdata_office.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-office.show':
                    this.menu = this.$store.state.masterdata_office.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-gudang.data':
                    this.menu = this.$store.state.masterdata_gudang.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-gudang.add':
                    this.menu = this.$store.state.masterdata_gudang.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-gudang.show':
                    this.menu = this.$store.state.masterdata_gudang.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-pelanggan.data':
                    this.menu = this.$store.state.masterdata_pelanggan.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    this.isDashboard = false
                    break;
                case 'master-data-pelanggan.add':
                    this.menu = this.$store.state.masterdata_pelanggan.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                case 'master-data-pelanggan.show':
                    this.menu = this.$store.state.masterdata_pelanggan.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    this.isDashboard = false
                    break;
                default:
                    break;
            }
        },
        movePage(nameurl) {
            this.$router.push({ name: nameurl })
        }
    }
};
</script>