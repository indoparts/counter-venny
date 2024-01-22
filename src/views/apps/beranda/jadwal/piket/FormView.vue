<template>
    <v-form>
        <v-card class="card" flat>
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-card-text>
                        <v-time-picker v-model="form.time" color="primary"></v-time-picker>
                    </v-card-text>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card-text>
                        <v-select dense outlined v-model="form.master_piket_id" label="Pilih Tugas Piket" required
                            :rules="[v => !!v || 'Item is required']" :items="piketitem" item-text="tugas"
                            item-value="id"></v-select>
                        <v-select dense outlined v-model="group" label="Pilih Group" required
                            :rules="[v => !!v || 'Item is required']" :items="userGroupItem" item-text="nama"
                            item-value="id" @change="keychange(group)"></v-select>
                        <v-select dense outlined v-model="userPick" label="Pilih User" required
                            :rules="[v => !!v || 'Item is required']" :items="useritem" item-text="user.name"
                            item-value="user" @change="userpick"></v-select>
                        <v-text-field dense outlined v-model="form.time" label="Waktu piket" required
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="date" label="Tentukan tanggal" required
                                    :rules="[v => !!v || 'Item is required']" prepend-inner-icon="mdi-calendar" hide-details
                                    v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" range>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn depressed :loading="loading" color="primary" block @click="submit">
                            Submit
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        loading: false,
        menu: false,
        date: null,
        piketitem: [],
        group: '',
        userGroupItem: [],
        useritem: [],
        userPick: [],
    }),
    computed: {
        ...mapState('jadwal_piket', {
            form: state => state.form,
        }),
    },
    watch: {
        date(e) {
            this.form.date = e[0]
        }
    },
    created() {
        this.attr().then((res) => {
            this.userGroupItem = res.data.group
            this.piketitem = res.data.piket
        })
    },
    methods: {
        ...mapActions('jadwal_piket', ['submitCreate', 'user', 'attr', 'attr_get_user']),
        keychange(group_id) {
            this.attr_get_user(group_id).then((res) => {
                this.useritem = res.data
            })
        },
        userpick() {
            this.form.dept_id = this.userPick.dept_id
            this.form.role_id = this.userPick.role_id
            this.form.user_id = this.userPick.id
        },
        submit() {
            this.loading = true
            this.submitCreate().then((res) => {
                this.$swal({
                    title: res.msg === 'error' ? 'Terjadi kesalahan!' : 'Berhasil tersimpan.',
                    icon: res.msg,
                    text: '',
                });
                this.loading = false
            })
        },
    }
}
</script>
