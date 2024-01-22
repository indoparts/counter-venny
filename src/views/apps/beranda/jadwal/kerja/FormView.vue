<template>
    <v-form>
        <v-card class="card" flat>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-date-picker v-model="form.date" multiple></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select dense outlined v-model="form.master_group_id" label="Pilih Group" required
                            :rules="[v => !!v || 'Item is required']" :items="userGroupItem" item-text="nama"
                            item-value="id"></v-select>
                        <v-select dense outlined v-model="form.time_config_id" label="Pilih Jam" required
                            :rules="[v => !!v || 'Item is required']" :items="Timeitem" item-text="type"
                            item-value="id"></v-select>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.date"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-combobox v-model="form.date" dense outlined multiple chips small-chips
                                    label="Multiple picker in menu" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs"
                                    v-on="on"></v-combobox>
                            </template>
                            <v-date-picker v-model="form.date" multiple no-title scrollable>
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
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn depressed block :loading="loading" color="primary" @click="submit">
                    Submit
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
        Timeitem: [],
        userGroupItem: [],
    }),
    computed: {
        ...mapState('jadwal_kerja', {
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
            this.Timeitem = res.data.time
        })
    },
    methods: {
        ...mapActions('jadwal_kerja', ['submitCreate', 'user', 'attr']),
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
