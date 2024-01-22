<template>
    <v-card class="card" flat>
        <v-card-text>
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-text-field dense outlined v-model="form.nominal_pinjaman" label="Nominal Pinjaman" required
                        :rules="[v => !!v || 'Item is required']" class="mb-input" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select dense outlined v-model="form.tenor" :items="tenor" label="Pilih Tenor" class="mb-input"
                        @change="changeTenor(form.tenor, form.nominal_pinjaman)"></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field dense outlined v-model="form.nominal_angsuran" label="Nominal Angsuran" required
                        :rules="[v => !!v || 'Item is required']" class="mb-input" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select dense outlined v-model="form.user_id_approval" :items="user_id_approval" item-text="name"
                        item-value="id" label="Ajukan kepada?" class="mb-input"></v-select>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn depressed :loading="loading" color="primary" block @click="submit">
                Submit permintaan
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        loading: false,
        tenor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        user_id_approval: [],
    }),
    computed: {
        ...mapState('summary_kasbon', {
            form: state => state.form,
        }),
    },
    mounted() {
        this.create().then((res) => {
            this.user_id_approval = res.data.userApproval
            this.form.user_id = res.data.auth.id
        })
    },
    methods: {
        ...mapActions('summary_kasbon', ['store', 'create']),
        changeTenor(tenor, pinjaman) {
            this.form.nominal_angsuran = Math.ceil(pinjaman / tenor)
        },
        submit() {
            this.loading = true
            this.store().then((res) => {
                this.$swal({
                    title: res.msg === 'error' ? 'Terjadi kesalahan!' : 'Berhasil tersimpan.',
                    icon: res.msg,
                    text: 'Pengajuan anda berhasil ditambahkan',
                });
                this.loading = false
            })
        },
    }
}
</script>
