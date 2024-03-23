<template>
    <v-card flat color="card">
        <v-card-title>Master Data Pelanggan</v-card-title>
        <v-card-text>
            <alert-components :type="alert.type" :title="alert.title" :msg="alert.msg"></alert-components>
            <v-text-field
                label="Cari data..."
                prepend-inner-icon="mdi-text-search"
                outlined dense
                v-model="search"
                @keyup="filter()"
              ></v-text-field>
            <v-data-table dense flat :headers="headers" :items="desserts" :options.sync="options"
                :server-items-length="totalDesserts" :loading="loading">
                <template v-slot:[`item.created_at`]="{ item }">
                    {{ parseDate(item) }}
                </template>
                <template v-slot:[`item.updated_at`]="{ item }">
                    {{ parseDate(item) }}
                </template>
                <template v-slot:[`item.act`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('masterpelanggan-update')">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item.id)" v-if="$can('masterpelanggan-delete')">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
        <DialogAlert :show="dialogAlert" :width="350" :title="`Apakah anda ingin menghapus data ini?`" :text="`Data yang sudah dihapus bersifat permanent dan tidak akan bisa dikembalikan kembali.`" @callback="response" />
    </v-card>
</template>
<script>
import DialogAlert from '@/components/DialogAlert.vue';
import AlertComponents from '@/components/AlertComponents.vue'
import moment from 'moment'
import { mapActions } from "vuex";
export default {
    components:{
        DialogAlert,
        AlertComponents
    },
    data() {
        return {
            search:'',
            dialogAlert:false,
            deleteId:0,
            alert: {
                type: '',
                title: '',
                msg: []
            },
            totalDesserts: 0,
            desserts: [],
            loading: true,
            options: {},
            headers: [
                { text: 'Nama', value: 'nama' },
                { text: 'Email', value: 'email' },
                { text: 'Telp', value: 'telp' },
                { text: 'Alamat', value: 'alamat' },
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
        ...mapActions("masterdata_pelanggan", ['index', 'edit', 'delete']),
        getDataFromApi() {
            this.loading = true
            const tableAttr = { options: this.options, search: this.search }
            this.index(tableAttr).then(res => {
                this.desserts = res.data.data
                this.totalDesserts = res.data.meta.total
                this.loading = false
            })
        },
        filter() {
            this.getDataFromApi()
        },
        parseDate(e) {
            return moment(e).format('yyyy-MM-DD, h:mm:ss');
        },
        editItem(id) {
            this.$router.push({ path: `/master-data-pelanggan/show/${id}` })
        },
        deleteItem(id) {
            this.deleteId = id
            this.dialogAlert = true
        },
        response(res){
            if (res.event === 'yes' && this.deleteId !== 0) {
                this.delete(this.deleteId).then((e)=>{
                    var a = (function () {
                        if (e.msg === 'error' && typeof e.data !== 'undefined') {
                            return e.data.errors
                        } else if (e.msg === 'error' && typeof e.data === 'undefined') {
                            return [{ field: '', rule: '', message: 'Terjadi kesalahan hubungi tim developer !!' }]
                        } else {
                            return [{ field: '', rule: '', message: 'Berhasil Terhapus' }]
                        }
                    })();
                    this.alert = {
                        type: e.msg,
                        title: e.msg,
                        msg: a
                    }
                    this.getDataFromApi()
                })
            } else {
                this.deleteId = 0
            }
            this.dialogAlert = res.dialog
        }
    },
}
</script>