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
            <v-subheader>User Info</v-subheader>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Absensi</v-list-item-title>
                    <v-list-item-subtitle>
                        Informasi tentang penggunaan fitur absensi dapat anda lihat disini.
                    </v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined to="/users-info/absensi">
                            Lihat
                        </v-btn>
                    </v-list-item-action>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Fitur Lainya</v-list-item-title>
                    <v-list-item-subtitle>
                        Untuk fitur lainya masih dalam tahap pengerjaan.
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Laporan error</v-list-item-title>
                    <v-list-item-subtitle>
                        Jika anda mengalami masalah tentang bug, error, dan keluhan lainya. Anda dapat menghubungi kami.
                    </v-list-item-subtitle>
                    <v-list-item-action style="margin-left: 0px !important;">
                        <v-btn small depressed color="primary" outlined to="/users-info/error-reporting">
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
            isDashboard: false
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