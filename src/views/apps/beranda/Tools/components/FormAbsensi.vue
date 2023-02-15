<template>
    <v-form v-model="valid" :disabled="enable">
        <v-row>
            <v-col cols="12" md="3">
                <v-text-field dense outlined v-model="form.latitude" label="latitude" required disabled :rules="[v => !!v || 'Item is required']"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
                <v-text-field dense outlined v-model="form.longitude" label="longitude" required disabled :rules="[v => !!v || 'Item is required']"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
                <v-select dense outlined v-model="form.keterangan_absen" :items="items" label="keterangan absen"
                    required :rules="[v => !!v || 'Item is required']" @change="keterangan_absen"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-file-input prepend-inner-icon="mdi-camera" dense outlined v-model="form.foto_selfi" accept="image/*" label="Selfi" required :rules="[v => !!v || 'Item is required']"></v-file-input>
            </v-col>
        </v-row>
        <v-btn depressed :loading="loading" color="primary" block :disabled="!valid" @click="submit">
            Submit data absen
        </v-btn>
    </v-form>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from "vuex";
export default {
    props: {
        lat: Number,
        lng: Number,
        enable: Boolean,
    },
    watch: {
        lat: function (v) {
            this.form.latitude = v
        },
        lng: function (v) {
            this.form.longitude = v
        },
        status: function (v) {
            this.form.status = v
        }
    },
    data: () => ({
        valid: false,
        items: ['masuk', 'pulang'],
        loading:false,
    }),
    computed: {
        ...mapState('absensi', {
            form: state => state.form,
        }),
    },
    methods:{
        ...mapActions('absensi', ['submitAbsen']),
        submit(){
            this.loading = true
            this.submitAbsen(this.form).then((e)=>{
                this.loading = false
                console.log(e);
            })
        },
        keterangan_absen(){
            if (this.form.keterangan_absen === 'masuk') {
                const n = new Date()
                var a = moment([n.getHours(), n.getMinutes(), n.getSeconds()], "HH:mm:ss")
                var b = moment(['08', '00', '00'], "HH:mm:ss")
                
                    if (a.diff(b, 'minutes') > 0) {
                        this.form.waktu_telat_masuk = `${a.diff(b, 'minutes')} menit`
                        this.form.status = 'telat'
                        if (a.diff(b, 'hours') > 0) {
                            this.form.waktu_telat_masuk = `${a.diff(b, 'hours')} jam`
                            this.form.status = 'telat'
                        }
                    }else {
                    this.form.waktu_telat_masuk = ''
                    this.form.status = 'tidak telat'
                }
            }
        }
    }
}
</script>