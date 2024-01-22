<template>
    <v-form>
        <v-card class="card" flat>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.nik" label="NIK" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.name" label="Name" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.periode" label="Periode" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.total_absen" label="Total Absen" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.total_terlambat" label="Total Terlambat" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.total_workday" label="Total Workday" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.gaji_perbulan" label="Gaji Perbulan" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.gaji_perhari" label="Gaji Perhari" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.gaji_thp" label="Gaji THP" required
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block @click="submit">
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data: () => ({
        valid: false,
        loading: false,
        form: {
            user_id: '',
            nik: '',
            name: '',
            periode: '',
            total_absen: '',
            total_terlambat: '',
            total_workday: '',
            gaji_perbulan: '',
            gaji_perhari: '',
            gaji_thp: '',
        },
    }),
    mounted() {
        this.edit(this.$route.params.id).then((res)=>{
            const x = res.data.data[0]
            this.form = {
                user_id: x.user_id,
                nik: x.user.nik,
                name: x.user.name,
                periode: x.periode,
                total_absen: x.total_absen,
                total_terlambat: x.total_terlambat,
                total_workday: x.total_workday,
                gaji_perbulan: x.gaji_perbulan,
                gaji_perhari: x.gaji_perhari,
                gaji_thp: x.gaji_thp,
            }
        })
    },
    methods: {
        ...mapActions('gaji', ['edit', 'update']),
        submit() {
            this.loading = true
            this.update({ id: this.$route.params.id, data: this.form }).then((e) => {
                this.loading = false
                var a = (function () {
                    if (e.msg === 'error') {
                        return 'Terjadi kesalahan saat menympan data!'
                    } else {
                        return 'Berhasil menympan data!'
                    }
                })();
                this.$swal({
                    title: e.msg,
                    icon: e.msg,
                    text: a,
                });
            })
        },
    }
}
</script>