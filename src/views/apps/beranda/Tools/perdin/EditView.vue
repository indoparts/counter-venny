<template>
    <v-form>
        <v-card class="card" flat>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="12">
                        <v-textarea dense outlined v-model="form.tempat_tujuan" label="Tempat tujuan"
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                            :return-value.sync="form.tgl_brangkat" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.tgl_brangkat" label="Tanggal Berangkat"
                                    prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined
                                    class="mb-input"></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tgl_brangkat" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu1 = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu1.save(form.tgl_brangkat)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                            :return-value.sync="form.tgl_kembali" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.tgl_kembali" label="Tanggal Kembali"
                                    prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined
                                    class="mb-input"></v-text-field>
                            </template>
                            <v-date-picker v-model="form.tgl_kembali" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu2 = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu2.save(form.tgl_kembali)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select dense outlined v-model="form.user_id_approval" :items="user_id_approval"
                            item-text="user.name" item-value="user_id" label="Ajukan kepada?" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-textarea dense outlined v-model="form.tujuan_perdin" label="Tujuan Dinas"
                            :rules="[v => !!v || 'Item is required']" class="mb-input"></v-textarea>
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
        menu1: false,
        menu2: false,
        user_id_approval: [],
    }),
    computed: {
        ...mapState('pengajuan_perdin', {
            form: state => state.form,
        }),
    },
    created() {
        this.user().then((res) => {
            this.user_id_approval = res.data
        })
        this.editPerdin(this.$route.params.id)
    },
    methods: {
        ...mapActions('pengajuan_perdin', ['editPerdin', 'updatePerdin', 'user']),
        submit() {
            this.loading = true
            this.updatePerdin(this.$route.params.id).then((res) => {
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
