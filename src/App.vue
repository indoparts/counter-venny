<template>
  <div>
    <LayoutBlank v-if="$route.meta.layout === 'blank'" />
    <LayoutContent v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import LayoutBlank from '@/layouts/LayoutsBlank.vue'
import LayoutContent from '@/layouts/LayoutsContents.vue'
export default {
  name: 'App',
  components: {
    LayoutBlank,
    LayoutContent,
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState('auth', {
      authenticated: state => state.authenticated,
      permissions: state => state.permissions,
    }),
  },
  watch: {
    isAuth(nv) {
      if (nv) {
        this.check()
      }
    },
  },
  mounted(){
    if (this.isAuth)
      this.check()
  },
  methods: {
    ...mapActions('auth', ['getUserLogin']),
    check() {
      this.getUserLogin().then(res => {
        if (res.status !== 200) {
          localStorage.setItem('token', null)
          this.$store.commit('SET_TOKEN', null, { root: true })
          this.$router.push({ name: 'login' })
        } else {
          const cekRoute = this.$router.currentRoute.meta.requiresAuth
          if (!cekRoute) {
            this.$router.push({ name: 'dashboard' })
          }
        }
      })
    },
  },
};
</script>
