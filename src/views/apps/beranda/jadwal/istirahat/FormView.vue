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
                        <v-select dense outlined v-model="form.dept_id" label="Divisi" required
                            :rules="[v => !!v || 'Item is required']" :items="divisi" item-text="deptname" item-value="id"></v-select>
                        <v-select dense outlined v-model="form.role_id" label="Jabatan" required
                            :rules="[v => !!v || 'Item is required']" :items="jabatan" item-text="rolename" item-value="id" @change="keychange(form.dept_id, form.role_id)"></v-select>
                        <v-select dense outlined v-model="form.user_id" label="Pilih User" required
                            :rules="[v => !!v || 'Item is required']" :items="useritem" item-text="name" item-value="id"></v-select>
                        <v-text-field dense outlined v-model="form.time" label="Waktu istirahat" required
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="date" label="Tentukan tanggal" required
                                    :rules="[v => !!v || 'Item is required']" prepend-inner-icon="mdi-calendar"
                                    hide-details v-bind="attrs" v-on="on"></v-text-field>
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
        divisi: [],
        jabatan: [],
        useritem: [],
    }),
    computed: {
        ...mapState('jadwal_istirahat', {
            form: state => state.form,
        }),
    },
    watch:{
        date(e){
            this.form.date = e[0]
        }
    },
    created(){
        this.attr_get_dept().then((res)=>{
            this.divisi = res.data
        })
        this.attr_get_jabatan().then((res)=>{
            this.jabatan = res.data
        })
    },
    methods: {
        ...mapActions('jadwal_istirahat', ['submitCreate', 'user', 'attr_get_dept', 'attr_get_jabatan', 'attr_get_user']),
        keychange(dept_id, role_id){
            this.attr_get_user([dept_id, role_id]).then((res) => {
                this.useritem = res.data
            })
        },
        submit() {
            this.loading = true
            this.submitCreate().then((res)=>{
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
