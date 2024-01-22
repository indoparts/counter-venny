<template>
    <v-container>
        <v-card color="card" flat>
            <v-card-title>
                List Data
                <v-spacer></v-spacer>
                <div class="text-center">
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" fab dark small color="primary" v-bind="attrs" v-on="on">
                                <v-icon>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-form v-model="valid">
                            <v-card class="card">
                                <v-card-title>
                                    Form Pengaturan Kerja
                                </v-card-title>
                                <v-card-text>
                                    <v-row no-gutters>
                                        <v-col cols="12" md="4">
                                            <v-select :items="items" label="Standard" dense outlined class="mb-input"
                                                v-model="form.type"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                                                :nudge-right="40" :return-value.sync="form.jam_mulai" transition="scale-transition"
                                                offset-y max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="form.jam_mulai" label="Jam mulai"
                                                        prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs"
                                                        v-on="on" dense outlined class="mb-input"></v-text-field>
                                                </template>
                                                <v-time-picker v-if="menu1" v-model="form.jam_mulai" full-width
                                                    @click:minute="$refs.menu1.save(form.jam_mulai)"></v-time-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                                                :nudge-right="40" :return-value.sync="form.jam_berakhir" transition="scale-transition"
                                                offset-y max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="form.jam_berakhir" label="Jam selesai"
                                                        prepend-inner-icon="mdi-clock-time-four-outline" readonly v-bind="attrs"
                                                        v-on="on" dense outlined class="mb-input"></v-text-field>
                                                </template>
                                                <v-time-picker v-if="menu2" v-model="form.jam_berakhir" full-width
                                                    @click:minute="$refs.menu2.save(form.jam_berakhir)"></v-time-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions v-if="valid">
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="simpan(indexId)">
                                        simpan
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                </div>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>
            </v-card-title>
            <v-card-text>
                <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                    :server-items-length="totalDesserts" :loading="loading">
                    <template v-slot:[`item.date`]="{ item }">
                        {{ parseDate(item.created_at) }}
                    </template>
                    <template v-slot:[`item.act`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('update-user')">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-user')">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>
 
<script>
import moment from 'moment'
import { mapActions } from "vuex";
export default {
    data() {
        return {
            items:['shift-1', 'shift-2', 'shift-3', 'nonshift'],
            indexId: null,
            menu1: false,
            menu2: false,
            valid: false,
            dialog: false,
            form: {
                type: '',
                jam_mulai: '',
                jam_berakhir: '',
            },
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            search: '',
            headers: [
                { text: 'TYPE', value: 'type' },
                { text: 'JAM MULAI', value: 'jam_mulai' },
                { text: 'JAM SELESAI', value: 'jam_berakhir' },
                { text: 'ACT', value: 'act' },
            ],
        }
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions('time_config', ['index', 'store', 'edit', 'update', 'destroy']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, search: this.search }
            this.index(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD');
        },
        simpan(e) {
            if (e > 0) {
                const attr = { id: e, form: this.form }
                this.update(attr).then((res) => {
                    this.dialog = !this.dialog
                    this.$swal({
                        title: res.msg === 'error' ? 'Terjadi kesalahan!' : 'Berhasil tersimpan.',
                        icon: res.msg,
                        text: '',
                    });
                    this.getDataFromApi()
                })
            } else {
                this.store(this.form).then((res) => {
                    this.dialog = !this.dialog
                    this.$swal({
                        title: res.msg === 'error' ? 'Terjadi kesalahan!' : 'Berhasil tersimpan.',
                        icon: res.msg,
                        text: '',
                    });
                    this.getDataFromApi()
                })
            }
        },
        editItem(e) {
            this.edit(e).then((res) => {
                this.form.type = res.data.type
                this.form.jam_mulai = res.data.jam_mulai
                this.form.jam_berakhir = res.data.jam_berakhir
            })
            this.indexId = e
            this.dialog = !this.dialog
        },
        deleteItem(e) {
            this.$swal({
                title: 'Apakah anda yakin?',
                text: "Data yang telah anda hapus tidak bisa dikembalikan kembali!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.destroy(e).then((res) => {
                        if (res.status === true) {
                            this.$swal(
                                'Terhapus!',
                                'Data anda berhasil dihapus.',
                                'success'
                            )
                            this.getDataFromApi()
                        }
                    })
                }
            })
        },
    },
}
</script>
