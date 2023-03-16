import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'login' } },
  // { path: "*", redirect: { name: 'error-404' } },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/ErrorView.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: false,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/apps/beranda/BerandaView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dashboard',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: true,
          href: '/',
        },
      ]
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/auth/ProfileView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Profile',
      breadscrum: [
        {
          text: 'Profile',
          disabled: true,
          href: '/',
        },
      ]
    },
  },
  {
    path: '/users-info/:data',
    name: 'users-info',
    component: () => import('@/views/apps/beranda/Tools/UserInfoView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Users Info',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users Info',
          disabled: true,
          href: '/users-info',
        },
      ]
    },
  },
  {
    path: '/users-absen',
    name: 'users-absen',
    component: () => import('@/views/apps/beranda/Tools/Absen/AbsenView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Users Absen',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users Absen',
          disabled: true,
          href: '/users-absen',
        },
      ]
    },
  },
  {
    path: '/list-data-absensi-user',
    name: 'list-data-absensi-user',
    component: () => import('@/views/apps/beranda/Tools/Absen/AbsenListUserView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'List Data Users Absen',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users Absen',
          disabled: false,
          href: '/users-absen',
        },
        {
          text: 'List data absensi user',
          disabled: true,
          href: '/list-data-absensi-user',
        },
      ]
    },
  },
  {
    path: '/grafik-data-absensi-user',
    name: 'grafik-data-absensi-user',
    component: () => import('@/views/apps/beranda/Tools/Absen/AbsenGrafikUserView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Grafik Data Users Absen',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users Absen',
          disabled: false,
          href: '/users-absen',
        },
        {
          text: 'Grafik data absensi user',
          disabled: true,
          href: '/grafik-data-absensi-user',
        },
      ]
    },
  },
  {
    path: '/laporan-data-absensi',
    name: 'laporan-data-absensi',
    component: () => import('@/views/apps/beranda/Tools/Absen/AbsenLaporanUserView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Laporan Data Absen',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users Absen',
          disabled: false,
          href: '/users-absen',
        },
        {
          text: 'Laporan data absensi',
          disabled: true,
          href: '/laporan-data-absensi',
        },
      ]
    },
  },

  {
    path: '/izin',
    component: () => import('@/views/apps/beranda/Tools/izin/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Pengguna',
    },
    children: [
      {
        path: '',
        name: 'izin.data',
        component: () => import('@/views/apps/beranda/Tools/izin/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Izin',
              disabled: true,
              href: '/izin',
            },
          ]
        }
      },
      {
        path: 'izin-form',
        name: 'izin.add',
        component: () => import('@/views/apps/beranda/Tools/izin/FormView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Izin',
              disabled: true,
              href: '/izin',
            },
            {
              text: 'Form Izin',
              disabled: true,
              href: '/izin/form',
            },
          ]
        }
      },
      {
        path: 'izin-laporan',
        name: 'izin.laporan',
        component: () => import('@/views/apps/beranda/Tools/izin/ReportView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Laporan Izin',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Izin',
              disabled: true,
              href: '/izin',
            },
            {
              text: 'Laporan Izin',
              disabled: true,
              href: '/izin/laporan',
            },
          ]
        }
      },
    ]
  },

  {
    path: '/cuti',
    component: () => import('@/views/apps/beranda/Tools/cuti/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Cuti',
    },
    children: [
      {
        path: '',
        name: 'cuti.data',
        component: () => import('@/views/apps/beranda/Tools/cuti/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola List Data Cuti',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Cuti',
              disabled: true,
              href: '/cuti',
            },
          ]
        }
      },
      {
        path: 'form-cuti',
        name: 'cuti.add',
        component: () => import('@/views/apps/beranda/Tools/cuti/FormView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Form pengajuan Cuti',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Cuti',
              disabled: true,
              href: '/cuti',
            },
            {
              text: 'Form cuti',
              disabled: true,
              href: '/cuti/form',
            },
          ]
        }
      },
      {
        path: 'laporan-cuti',
        name: 'cuti.laporan',
        component: () => import('@/views/apps/beranda/Tools/cuti/ReportView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Laporan Cuti',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Cuti',
              disabled: true,
              href: '/cuti',
            },
            {
              text: 'Laporan Cuti',
              disabled: true,
              href: '/cuti/laporan',
            },
          ]
        }
      },
    ]
  },

  {
    path: '/jadwal-istirahat',
    component: () => import('@/views/apps/beranda/jadwal/istirahat/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Istirahat',
    },
    children: [
      {
        path: '',
        name: 'jadwal-istirahat.data',
        component: () => import('@/views/apps/beranda/jadwal/istirahat/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola List Data Istirahat',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Istirahat',
              disabled: true,
              href: '/istirahat',
            },
          ]
        }
      },
      {
        path: 'form-istirahat',
        name: 'jadwal-istirahat.add',
        component: () => import('@/views/apps/beranda/jadwal/istirahat/FormView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Form Istirahat',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Istirahat',
              disabled: true,
              href: '/istirahat',
            },
            {
              text: 'Form Istirahat',
              disabled: true,
              href: '/istirahat/form',
            },
          ]
        }
      },
      {
        path: 'laporan-istirahat',
        name: 'jadwal-istirahat.laporan',
        component: () => import('@/views/apps/beranda/jadwal/istirahat/ReportView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Laporan Istirahat',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Istirahat',
              disabled: true,
              href: '/istirahat',
            },
            {
              text: 'Laporan Istirahat',
              disabled: true,
              href: '/istirahat/laporan',
            },
          ]
        }
      },
    ]
  },

  {
    path: '/jadwal-piket',
    component: () => import('@/views/apps/beranda/jadwal/piket/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Piket',
    },
    children: [
      {
        path: '',
        name: 'jadwal-piket.data',
        component: () => import('@/views/apps/beranda/jadwal/piket/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola List Data Piket',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Piket',
              disabled: true,
              href: '/piket',
            },
          ]
        }
      },
      {
        path: 'form-piket',
        name: 'jadwal-piket.add',
        component: () => import('@/views/apps/beranda/jadwal/piket/FormView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Form Piket',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Piket',
              disabled: true,
              href: '/piket',
            },
            {
              text: 'Form Piket',
              disabled: true,
              href: '/piket/form',
            },
          ]
        }
      },
      {
        path: 'laporan-piket',
        name: 'jadwal-piket.laporan',
        component: () => import('@/views/apps/beranda/jadwal/piket/ReportView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Laporan Piket',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Piket',
              disabled: true,
              href: '/piket',
            },
            {
              text: 'Laporan Piket',
              disabled: true,
              href: '/piket/laporan',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/masterdata-piket',
    name: 'masterdata-piket',
    component: () => import('@/views/apps/beranda/jadwal/piket/MasterData.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Masterdata Piket',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Piket',
          disabled: true,
          href: '/piket',
        },
        {
          text: 'Masterdata Piket',
          disabled: true,
          href: '/masterdata-piket',
        },
      ]
    },
  },
  {
    path: '/summary-gaji',
    name: 'gaji',
    component: () => import('@/views/apps/GajiView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dashboard',
    },
  },
  {
    path: '/summary-kasbon',
    name: 'kasbon',
    component: () => import('@/views/apps/KasbonView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dashboard',
    },
  },
  {
    path: '/master-data-pengguna',
    component: () => import('@/views/apps/Masterdata/pengguna/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Pengguna',
    },
    children: [
      {
        path: '',
        name: 'master-data-pengguna.data',
        component: () => import('@/views/apps/Masterdata/pengguna/DataView.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Kelola Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-pengguna.add',
        component: () => import('@/views/apps/Masterdata/pengguna/AddView.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Tambah data Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna',
            },
            {
              text: 'Tambah Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-pengguna.show',
        component: () => import('@/views/apps/Masterdata/pengguna/ShowView.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Detail/Update Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna',
            },
            {
              text: 'Lihat Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-role',
    component: () => import('@/views/apps/Masterdata/role/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Role',
    },
    children: [
      {
        path: '',
        name: 'master-data-role.data',
        component: () => import('@/views/apps/Masterdata/role/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Role',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Role',
              disabled: true,
              href: '/master-data-role',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-role.add',
        component: () => import('@/views/apps/Masterdata/role/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Role',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Role',
              disabled: true,
              href: '/master-data-role',
            },
            {
              text: 'Tambah Data Role',
              disabled: true,
              href: '/master-data-role/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-role.show',
        component: () => import('@/views/apps/Masterdata/role/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Role',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Role',
              disabled: true,
              href: '/master-data-role',
            },
            {
              text: 'Lihat Data Role',
              disabled: true,
              href: '/master-data-role/show/:id',
            },
          ]
        }
      },
      {
        path: 'setrole/:id',
        name: 'master-data-role.setrole',
        component: () => import('@/views/apps/Masterdata/role/SetroleView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Set Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Set Akses',
              disabled: true,
              href: '/master-data-role',
            },
            {
              text: 'Lihat Data Set Akses',
              disabled: true,
              href: '/master-data-role/setrole/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-akses',
    component: () => import('@/views/apps/Masterdata/akses/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Akses',
    },
    children: [
      {
        path: '',
        name: 'master-data-akses.data',
        component: () => import('@/views/apps/Masterdata/akses/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Akses',
              disabled: true,
              href: '/master-data-akses',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-akses.add',
        component: () => import('@/views/apps/Masterdata/akses/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Akses',
              disabled: true,
              href: '/master-data-akses',
            },
            {
              text: 'Tambah Data Akses',
              disabled: true,
              href: '/master-data-akses/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-akses.show',
        component: () => import('@/views/apps/Masterdata/akses/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Akses',
              disabled: true,
              href: '/master-data-akses',
            },
            {
              text: 'Lihat Data Akses',
              disabled: true,
              href: '/master-data-akses/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-toko',
    component: () => import('@/views/apps/Masterdata/toko/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Toko',
    },
    children: [
      {
        path: '',
        name: 'master-data-toko.data',
        component: () => import('@/views/apps/Masterdata/toko/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Toko',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Toko',
              disabled: true,
              href: '/master-data-toko',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-toko.add',
        component: () => import('@/views/apps/Masterdata/toko/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Toko',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Toko',
              disabled: true,
              href: '/master-data-toko',
            },
            {
              text: 'Tambah Data Toko',
              disabled: true,
              href: '/master-data-toko/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-toko.show',
        component: () => import('@/views/apps/Masterdata/toko/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Toko',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Toko',
              disabled: true,
              href: '/master-data-toko',
            },
            {
              text: 'Lihat Data Toko',
              disabled: true,
              href: '/master-data-toko/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-office',
    component: () => import('@/views/apps/Masterdata/office/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Office',
    },
    children: [
      {
        path: '',
        name: 'master-data-office.data',
        component: () => import('@/views/apps/Masterdata/office/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Office',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Office',
              disabled: true,
              href: '/master-data-office',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-office.add',
        component: () => import('@/views/apps/Masterdata/office/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Office',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Office',
              disabled: true,
              href: '/master-data-office',
            },
            {
              text: 'Tambah Data Office',
              disabled: true,
              href: '/master-data-office/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-office.show',
        component: () => import('@/views/apps/Masterdata/office/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Office',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Office',
              disabled: true,
              href: '/master-data-office',
            },
            {
              text: 'Lihat Data Office',
              disabled: true,
              href: '/master-data-office/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-gudang',
    component: () => import('@/views/apps/Masterdata/gudang/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Gudang',
    },
    children: [
      {
        path: '',
        name: 'master-data-gudang.data',
        component: () => import('@/views/apps/Masterdata/gudang/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Gudang',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Gudang',
              disabled: true,
              href: '/master-data-gudang',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-gudang.add',
        component: () => import('@/views/apps/Masterdata/gudang/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Gudang',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Gudang',
              disabled: true,
              href: '/master-data-gudang',
            },
            {
              text: 'Tambah Data Gudang',
              disabled: true,
              href: '/master-data-gudang/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-gudang.show',
        component: () => import('@/views/apps/Masterdata/gudang/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Gudang',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Gudang',
              disabled: true,
              href: '/master-data-gudang',
            },
            {
              text: 'Lihat Data Gudang',
              disabled: true,
              href: '/master-data-gudang/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-dept',
    component: () => import('@/views/apps/Masterdata/dept/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Departement',
    },
    children: [
      {
        path: '',
        name: 'master-data-dept.data',
        component: () => import('@/views/apps/Masterdata/dept/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Departement',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Departement',
              disabled: true,
              href: '/master-data-dept',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-dept.add',
        component: () => import('@/views/apps/Masterdata/dept/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Departement',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Departement',
              disabled: true,
              href: '/master-data-dept',
            },
            {
              text: 'Tambah Data Departement',
              disabled: true,
              href: '/master-data-dept/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-dept.show',
        component: () => import('@/views/apps/Masterdata/dept/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Departement',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Departement',
              disabled: true,
              href: '/master-data-dept',
            },
            {
              text: 'Lihat Data Departement',
              disabled: true,
              href: '/master-data-dept/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-pelanggan',
    component: () => import('@/views/apps/Masterdata/pelanggan/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Pelanggan',
    },
    children: [
      {
        path: '',
        name: 'master-data-pelanggan.data',
        component: () => import('@/views/apps/Masterdata/pelanggan/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Pelanggan',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pelanggan',
              disabled: true,
              href: '/master-data-pelanggan',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-pelanggan.add',
        component: () => import('@/views/apps/Masterdata/pelanggan/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Pelanggan',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pelanggan',
              disabled: true,
              href: '/master-data-pelanggan',
            },
            {
              text: 'Tambah Data Pelanggan',
              disabled: true,
              href: '/master-data-pelanggan/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-pelanggan.show',
        component: () => import('@/views/apps/Masterdata/pelanggan/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Pelanggan',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pelanggan',
              disabled: true,
              href: '/master-data-pelanggan',
            },
            {
              text: 'Lihat Data Pelanggan',
              disabled: true,
              href: '/master-data-pelanggan/show/:id',
            },
          ]
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const matchAuth = to.matched.some(record => record.meta.requiresAuth)
  if (matchAuth) {
    const auth = store.getters.isAuth
    if (!auth) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
