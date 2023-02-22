<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card flat class="card">
            <v-card-title>Form masterdata toko</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.nama" label="nama" class="mt-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.telepon" label="telepon" class="mt-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.radius_forabsen" label="radius absen"
                            class="mt-input" :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field type="number" dense outlined v-model="form.latitude" label="latitude" class="mt-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field type="number" dense outlined v-model="form.longitude" label="longitude"
                            class="mt-input" :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea dense outlined v-model="form.alamat" label="alamat" class="mt-input"
                            :rules="[v => !!v || 'Item is required']"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="$can('create-permission')" text color="primary" @click="submit">
                    Submit
                </v-btn>
            </v-card-actions>
            <v-card-actions>
                <div class="d-flex justify-center mt-5">
                    <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
                </div>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
import AlertComponents from '@/components/AlertComponents.vue'
import { mapActions, mapState } from "vuex";
export default {
    components: {
        AlertComponents,
    },
    data: () => ({
        valid: false,
        loading: false,
        alert: {
            type: '',
            title: '',
            msg: []
        }
    }),
    computed: {
        ...mapState('masterdata_toko', {
            form: state => state.form,
        }),
    },
    created() {
        this.edit(this.$route.params.id)
    },
    methods: {
        ...mapActions('masterdata_toko', ['edit', 'update']),
        submit() {
            this.loading = true
            this.update(this.$route.params.id).then((e) => {
                this.loading = false
                var a = (function () {
                    if (e.msg === 'error' && typeof e.data !== 'undefined') {
                        return e.data.errors
                    } else if (e.msg === 'error' && typeof e.data === 'undefined') {
                        return [{ field: '', rule: '', message: 'Terjadi duplikat, anda sudah membuat data ini sebelumnya !!' }]
                    } else {
                        return [{ field: '', rule: '', message: 'Berhasil' }]
                    }
                })();
                this.alert = {
                    type: e.msg,
                    title: e.msg,
                    msg: a
                }
            })
        },
    }
}
</script>