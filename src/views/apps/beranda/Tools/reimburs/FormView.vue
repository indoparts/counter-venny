<template>
    <v-form>
        <v-card class="card" flat>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="3">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.date" label="Pilih Tanggal" prepend-inner-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on" dense outlined class="mb-input"></v-text-field>
                            </template>
                            <v-date-picker v-model="form.date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(form.date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.category" :items="category" label="Pilih Kategori"
                            class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.user_id_approval" :items="user_id_approval"
                            item-text="user.name" item-value="user_id" label="Ajukan kepada?" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-file-input prepend-inner-icon="mdi-camera" dense outlined v-model="form.file_receipt" class="mb-input"
                            accept="image/*" label="File"></v-file-input>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed :loading="loading" color="primary" block @click="submit">
                    Submit permintaan
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        loading: false,
        menu: false,
        category: ['rawat-jalan', 'rawat-inap', 'cek-up', 'operasional'],
        user_id_approval: [],
    }),
    computed: {
        ...mapState('pengajuan_reimburs', {
            form: state => state.form,
        }),
    },
    created() {
        this.user().then((res) => {
            this.user_id_approval = res.data
            this.form.user_id = res.auth.id
        })
    },
    methods: {
        ...mapActions('pengajuan_reimburs', ['submitReimburs', 'user']),
        submit() {
            this.loading = true
            this.submitReimburs().then((res) => {
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
