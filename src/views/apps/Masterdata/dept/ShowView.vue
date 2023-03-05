<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-card flat class="card">
            <v-card-title>Form masterdata departemen</v-card-title>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="12">
                        <v-text-field dense outlined v-model="form.deptname" label="nama departemen" class="mb-input"
                            :rules="[v => !!v || 'Item is required']"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="$can('update-dept')" text color="primary" @click="submit">
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
        alert: {
            type: '',
            title: '',
            msg: []
        }
    }),
    computed: {
        ...mapState('masterdata_dept', {
            form: state => state.form,
        }),
    },
    created() {
        this.edit(this.$route.params.id)
    },
    methods: {
        ...mapActions('masterdata_dept', ['edit', 'update']),
        submit() {
            this.loading = true
            this.update(this.$route.params.id).then((e) => {
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