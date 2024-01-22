<template>
    <div>
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-title class="text-h6 text-center white--text">{{ appname }}</v-list-item-title>
            </v-list-item>
            <v-divider class="mt-2" height="1000"></v-divider>
            <v-menu offset-x down max-width="150" :style="{ background: $vuetify.theme.themes[theme].bg }">
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item link v-bind="attrs" v-on="on">
                        <v-list-item-content>
                            <v-list-item-title class="text-h6 white--text">{{ authenticated.name }}</v-list-item-title>
                            <v-list-item-subtitle class="white--text">{{ authenticated.email }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-icon class="white--text">mdi-menu-down</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </template>
                <v-list>
                    <v-list-item link to="/profile">
                        <v-list-item-action>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Profil</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="keluar">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Keluar</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense shaped subheader>
            <v-subheader>Summary Data</v-subheader>
            <div v-for="(item) in menus" :key="item.no">
                <v-list-item v-if="!item.child" link :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>

                <v-list-group v-else :prepend-icon="item.icon" no-action color="#FFFFFF">
                    <template v-slot:activator>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>

                    <v-list-item v-for="([title, icon, link], x) in item.itemchild" :key="x" link :to="link">
                        <v-list-item-title>{{ title }}</v-list-item-title>

                        <v-list-item-icon>
                            <v-icon>{{ icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </div>
            <v-subheader>Master Data</v-subheader>
            <div v-for="(item) in menus_masterdata" :key="item.no">
                <v-list-item link :to="item.link" v-if="$can(item.permission)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </div>
        </v-list>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data: () => ({
        appname: process.env.APP_NAME,
        LeftSelectedDrawer: 0,
        menus: [
            {
                no:0,
                title: 'Beranda',
                icon: 'mdi-apps',
                child: false,
                itemchild: [],
                link: '/dashboard'
            },
            {
                no:1,
                title: 'Tools',
                icon: 'mdi-office-building',
                child: true,
                itemchild: [
                    ['Absensi Kehadiran', 'mdi-fingerprint', '/users-absen'],
                    ['Pengajuan Cuti', 'mdi-plane-car', '/cuti'],
                    ['Pengajuan Izin', 'mdi-frequently-asked-questions', '/izin'],
                    ['Pengajuan Lembur', 'mdi-debug-step-over', '/lembur'],
                    ['Perjalanan Dinas', 'mdi-car-side', '/perdin'],
                    ['Pengajuan Reimburs', 'mdi-hand-coin', '/reimburs'],
                ],
                link: '/'
            },
            {
                no: 2,
                title: 'Jadwal',
                icon: 'mdi-clipboard-text-clock',
                child: true,
                itemchild: [
                    ['Jadwal-istirahat', 'mdi-coffee', '/jadwal-istirahat'],
                    ['Jadwal piket', 'mdi-broom', '/jadwal-piket'],
                    ['Jadwal Kerja', 'mdi-store-clock', '/jadwal-kerja'],
                ],
                link: '/'
            },
            {
                no: 3,
                title: 'Keuangan',
                icon: 'mdi-bank',
                child: true,
                itemchild: [
                    ['Gaji', 'mdi-wallet-giftcard', '/summary-gaji'],
                    ['Kasbon', 'mdi-cash-multiple', '/summary-kasbon'],
                ],
                link: '/'
            },
            {
                no: 4,
                title: 'Resign',
                icon: 'mdi-exit-run',
                child: false,
                itemchild: [],
                link: '/resign'
            },
        ],
        menus_masterdata:[
            {
                no:6,
                title: 'Data Pengguna',
                icon: 'mdi-account-group',
                child: false,
                itemchild: [],
                link: '/master-data-pengguna',
                permission: 'read-user'
            },
            {
                no:7,
                title: 'Data Departemen',
                icon: 'mdi-lightbulb-group-outline',
                child: false,
                itemchild: [],
                link: '/master-data-dept',
                permission: 'read-dept'
            },
            {
                no:8,
                title: 'Data Role',
                icon: 'mdi-group',
                child: false,
                itemchild: [],
                link: '/master-data-role',
                permission: 'read-role'
            },
            {
                no:9,
                title: 'Data Akses',
                icon: 'mdi-security',
                child: false,
                itemchild: [],
                link: '/master-data-akses',
                permission: 'read-permission'
            },
            {
                no:10,
                title: 'Data Toko',
                icon: 'mdi-storefront',
                child: false,
                itemchild: [],
                link: '/master-data-toko',
                permission: 'read-mastertoko'
            },
            {
                no:11,
                title: 'Data Office',
                icon: 'mdi-office-building',
                child: false,
                itemchild: [],
                link: '/master-data-office',
                permission: 'read-masteroffice'
            },
            {
                no:12,
                title: 'Data Gudang',
                icon: 'mdi-warehouse',
                child: false,
                itemchild: [],
                link: '/master-data-gudang',
                permission: 'read-mastergudang'
            },
            {
                no:13,
                title: 'Data Pelanggan',
                icon: 'mdi-face-agent',
                child: false,
                itemchild: [],
                link: '/master-data-pelanggan',
                permission: 'read-masterpelanggan'
            },
        ]
    }),
    computed: {
        theme() {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    methods:{
        ...mapActions('auth', ['logout']),
        keluar(){
            this.logout().then(e => {
                if (e === true) {
                    this.$router.push({ name: 'login' })
                }
            })
        }
    }
};
</script>
<style scoped>
.v-application .secondary--text {
    color: #FFFFFF !important;
    caret-color: #FFFFFF !important;
}
</style>