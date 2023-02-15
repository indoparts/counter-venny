import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'login' } },
  { path: "*", redirect: { name: 'error-404' } },
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
    path: '/users-absen',
    name: 'users-absen',
    component: () => import('@/views/apps/beranda/Tools/AbsenView.vue'),
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
    path: '/summary-istirahat',
    name: 'jadwal-istirahat',
    component: () => import('@/views/apps/JadwalIstirahatView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dashboard',
    },
  },
  {
    path: '/summary-piket',
    name: 'jadwal-piket',
    component: () => import('@/views/apps/JadwalPiketView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dashboard',
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
    name: 'master-data-pengguna',
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
          title: 'Detail Pengguna',
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
      {
        path: 'edit/:id',
        name: 'master-data-pengguna.edit',
        component: () => import('@/views/apps/Masterdata/pengguna/EditView.vue'),
        meta: { 
          title: 'Edit Pengguna',
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
              text: 'Edit Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna/edit/:id',
            },
          ]
        }
      }
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
