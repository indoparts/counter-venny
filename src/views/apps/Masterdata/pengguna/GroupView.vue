<template>
    <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
        :server-items-length="totalDesserts" :loading="loading" show-expand item-key="id" :expanded.sync="expanded">
        <template v-slot:top>
            <v-toolbar flat color="card">
                <v-toolbar-title>Group Pengguna</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            Buat data baru
                        </v-btn>
                    </template>
                    <v-card color="card">
                        <v-card-title>
                            <span class="text-h5">Form Group Pengguna</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="mt-5">
                            <v-row no-gutters>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="form_master_group.nama" label="Nama Group" dense outlined
                                        class="mb-input"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="form_master_group.user_id_kepgroup" label="Pilih kepala group" dense
                                        outlined class="mb-input" :items="usersAllItems" item-text="name" item-value="id"
                                        :rules="[v => !!v || 'Item is required']"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn depressed color="primary" block @click="submitGroup">
                                        simpan group baru
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text class="mt-5">
                            <v-row no-gutters>
                                <v-col cols="12" md="6">
                                    <v-select v-model="form_user_group.master_group_id" label="Pilih Group" dense outlined
                                        class="mb-input" :items="groupAllItems" item-text="nama" item-value="id"
                                        @change="getUserAnggota"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="form_user_group.user_id" label="Pilih anggota group" dense outlined
                                        class="mb-input" :items="usersItems" item-text="name" item-value="id" attach chips
                                        multiple :rules="[v => !!v || 'Item is required']"></v-select>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-btn depressed color="primary" block tile height="40" @click="saveAnggotaGroup">
                                    simpan anggota group
                                </v-btn>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="dialog = !dialog">
                                Tutup form
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <th :colspan="headers.length">
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>NIK</th>
                                <th>Email</th>
                                <th>HP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in item.membersTeams" :key="i.user.id">
                                <td>{{ i.user.name }}</td>
                                <td>{{ i.user.nik }}</td>
                                <td>{{ i.user.email }}</td>
                                <td>{{ i.user.hp }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </th>
        </template>
    </v-data-table>
</template>
<script>
import { mapActions } from "vuex";
import moment from 'moment'
export default {
    data: () => ({
        dialog: false,
        editedIndex: -1,
        baseUrl: `http://${process.env.BASE_URL_API}/api/images/avatar-users/`,
        totalDesserts: 0,
        expanded: [],
        desserts: [],
        loading: true,
        options: {},
        headers: [
            { text: 'GROUP', value: 'nama' },
            { text: 'CREATED AT', value: 'created_at' },
            { text: 'UPDATED AT', value: 'updated_at' },
        ],
        usersAllItems: [],
        groupAllItems: [],
        usersItems: [],
        form_master_group: {
            user_id_kepgroup: '',
            nama: ''
        },
        form_user_group: {
            master_group_id: '',
            user_id: [],
        },
    }),

    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions("user_group", ['index', 'store', 'edit', 'delete', 'indexGroup', 'storeGroup', 'editGroup', 'deleteGroup']),
        getDataFromApi() {
            this.loading = true
            this.index(this.options).then(res => {
                this.desserts = res.data.datatable.data
                this.totalDesserts = res.data.datatable.meta.total
                this.usersAllItems = res.data.user
                this.groupAllItems = res.data.allgroup
                this.loading = false
            })
        },

        getUserAnggota() {
            let groupId = this.form_user_group.master_group_id
            this.editGroup(groupId).then((res) => {
                this.usersItems = res.data.data.fetchUser
                res.data.data.userGroup.forEach(el => {
                    this.form_user_group.user_id.push(el.user_id)
                });
            })
        },

        submitGroup() {
            this.storeGroup(this.form_master_group).then((res) => {
                this.getDataFromApi()
                this.$swal(
                    res.msg,
                    res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    res.msg
                )
            })
        },
        saveAnggotaGroup() {
            this.store(this.form_user_group).then((res) => {
                this.$swal(
                    res.msg,
                    res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    res.msg
                )
            })
        },

        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        },
    },
}
</script>