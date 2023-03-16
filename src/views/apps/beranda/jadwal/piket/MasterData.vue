<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
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
                                    Privacy Policy
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field v-model="form.tugas" :rules="[
                                        v => !!v || 'Tugas is required',
                                        v => v.length <= 100 || 'Tugas must be less than 100 characters',
                                              ]" :counter="100" label="Nama Tugas"
                                        required></v-text-field>
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
            indexId: null,
            valid: false,
            dialog: false,
            form: {
                tugas: '',
            },
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            search: '',
            headers: [
                { text: 'Nama Tugas', value: 'tugas' },
                { text: 'Tanggal', value: 'date' },
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
        ...mapActions('masterdata_piket', ['index', 'submitCreate', 'edit', 'update', 'destroy']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, authId: this.search }
            this.index(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD');
        },
        simpan(e){
            if (e > 0) {
                const attr = {id:e, form:this.form }
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
                this.submitCreate(this.form).then((res)=>{
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
        editItem(e){
            this.edit(e).then((res)=>{
                this.form.tugas = res.data.tugas
            })
            this.indexId = e
            this.dialog = !this.dialog
        },
        deleteItem(e){
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
                    this.destroy(e).then((res)=>{
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
