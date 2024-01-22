<template>
    <v-form>
        <v-card class="card" flat>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="3">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.date" label="Picker in menu" prepend-inner-icon="mdi-calendar"
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
                        <v-dialog ref="dialog1" v-model="modal1" :return-value.sync="form.waktu_mulai" persistent
                            width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.waktu_mulai" label="Waktu Mulai Lembur"
                                    prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" dense
                                    outlined class="mb-input"></v-text-field>
                            </template>
                            <v-time-picker v-if="modal1" v-model="form.waktu_mulai" full-width>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal1 = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialog1.save(form.waktu_mulai)">
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-dialog>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="form.waktu_berakhir" persistent
                            width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.waktu_berakhir" label="Waktu Selesai Lembur"
                                    prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" dense
                                    outlined class="mb-input"></v-text-field>
                            </template>
                            <v-time-picker v-if="modal2" v-model="form.waktu_berakhir" full-width>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal2 = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialog2.save(form.waktu_berakhir)">
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-dialog>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select dense outlined v-model="form.user_id_approval" :items="user_id_approval"
                            item-text="user.name" item-value="user_id" label="Ajukan kepada?" class="mb-input"></v-select>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-textarea dense outlined v-model="form.uraian_tugas" label="Uraian tugas"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
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
        menu: false,
        modal1: false,
        modal2: false,
        user_id_approval: [],
    }),
    computed: {
        ...mapState('pengajuan_lembur', {
            form: state => state.form,
        }),
    },
    created() {
        this.user().then((res) => {
            this.user_id_approval = res.data
        })
        this.editLembur(this.$route.params.id)
    },
    methods: {
        ...mapActions('pengajuan_lembur', ['editLembur', 'updateLembur', 'user']),
        submit() {
            this.loading = true
            this.updateLembur(this.$route.params.id).then((res) => {
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
