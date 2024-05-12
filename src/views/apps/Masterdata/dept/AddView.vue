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
                <v-btn v-if="$can('dept-create')" text color="primary" @click="submit">
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
        ...mapState('masterdata_dept', {
            form: state => state.form,
        }),
    },
    methods: {
        ...mapActions('masterdata_dept', ['store']),
        submit() {
            this.loading = true
            this.store().then((e) => {
                this.loading = false
                var a = (function () {
                    if (e.msg === 'error') {
                        return 'Terjadi kesalahan saat menympan data!'
                    }  else {
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