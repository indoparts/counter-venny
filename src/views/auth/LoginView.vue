<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card elevation="0" color="card">
          <v-card-title>
            <p class="mt-5">{{ appname }}</p>
            <v-spacer></v-spacer>
            <SwitchMode />
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Tulis Email Anda Disini" name="email" prepend-inner-icon="mdi-email" type="email"
                class="rounded-0" outlined placeholder="test@mail.tes"
                :rules="[v => !!v || 'Email is required', v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
                v-model="form.email"></v-text-field>

              <v-text-field label="Tulis Kata Sandi Anda Disini" name="password" prepend-inner-icon="mdi-lock"
                class="rounded-0" outlined :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass"
                v-model="form.password"></v-text-field>

              <v-card-actions class="text--secondary">
                <v-checkbox color="primary" label="Ingat Saya" v-model="form.remember_me"></v-checkbox>
                <v-spacer></v-spacer>
                Tidak punya akun? <a href="#" class="pl-2" color="primary">Daftar Akun</a>
              </v-card-actions>
              <v-btn class="rounded-0" color="primary"
                :disabled="form.email === '' && form.password === '' ? true : false" :loading="loading" x-large block dark
                @click="submit()">Login</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SwitchMode from '@/components/SwitchMode.vue'
import AlertComponents from '@/components/AlertComponents.vue'
export default {
  components: {
    SwitchMode,
    AlertComponents
  },
  data() {
    return {
      appname: process.env.APP_NAME,
      showPass: false,
      loading: false,
      form: {
        email: '',
        password: '',
        remember_me: ''
      },
      alert: {
        type: '',
        title: '',
        msg: []
      }
    }
  },
  computed: {
    ...mapGetters(['isAuth']),
  },
  mounted() {
    if (this.isAuth) {
      const cekRoute = this.$router.currentRoute.meta.requiresAuth
      if (!cekRoute)
        this.$router.push({ name: 'dashboard' })
    }
  },
  methods: {
    ...mapActions('auth', ['submitLogin']),
    submit() {
      this.loading = true
      this.submitLogin(this.form).then(res => {
        this.loading = false
        if (this.remember_me === true)
          localStorage.setItem('email', this.form.email)
        var a = (function () {
          if (res.msg === 'error' && typeof res.data !== 'undefined') {
            return res.data.errors
          } else if (res.msg === 'error' && typeof res.data === 'undefined') {
            return [{ field: '', rule: '', message: 'Email & password salah !!' }]
          } else {
            return [{ field: '', rule: '', message: 'Berhasil' }]
          }
        })();
        this.alert = {
          type: res.msg,
          title: res.msg,
          msg: a
        }
      })
    }
  }
}
</script>
