<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card flat class="card">
            <v-card-title>Form master data office</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="4">
                        <v-text-field dense outlined v-model="form.nama" label="nama" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.telepon" label="telepon" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="number" dense outlined v-model="form.radius_forabsen" label="radius absen"
                            class="mb-input" :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field type="number" dense outlined v-model="form.latitude" label="latitude" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field type="number" dense outlined v-model="form.longitude" label="longitude"
                            class="mb-input" :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea dense outlined v-model="form.alamat" label="alamat" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="$can('create-masteroffice')" text color="primary" @click="submit">
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
        valid: false,
        loading: false,
    }),
    computed: {
        ...mapState('masterdata_office', {
            form: state => state.form,
        }),
    },
    methods: {
        ...mapActions('masterdata_office', ['store']),
        submit() {
            this.loading = true
            this.store().then((e) => {
                this.loading = false
                var a = (function () {
                    if (e.msg === 'error') {
                        return 'Terjadi kesalahan saat menympan data!'
                    } else {
                        return 'Berhasil menympan data!'
                    }
                })();
                this.$swal({
                    title: e.msg,
                    icon: e.msg,
                    text: a,
                });
            })
        },
    }
}
</script>