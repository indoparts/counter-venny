<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-badge color="primary" :content="`${count !== null && count > 0 ? 'New ' : ''}${count}`" overlap>
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-clipboard-list-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>
        <v-list subheader two-line dense>
            <v-subheader inset>Informasi Piket & Istirahat</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
                <div v-if="items.length > 0">
                    <v-list-item v-for="(i, index) in items" :key="index" @click="movepage(i.initial)">
                        <v-list-item-avatar>
                            <v-icon :class="i.initial === 'user_pikets' ? 'primary' : 'secondary'">
                                {{ i.initial === 'user_pikets' ? 'mdi-broom' : 'mdi-bed-clock' }}
                            </v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ parseDate(i.date) }}</v-list-item-title>

                            <v-list-item-subtitle>{{ parseState(i.state) }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action v-if="i.initial == 'user_pikets'">
                            <v-btn icon>
                                <v-icon color="error" @click="uploadbefore(i.initial, i.id)">mdi-camera-plus</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon color="success" @click="uploadafter(i.initial, i.id)">mdi-camera-party-mode</v-icon>
                            </v-btn>
                        </v-list-item-action>
                        <v-list-item-action v-else>
                            <v-btn icon>
                                <v-icon color="info">mdi-information</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </div>
                <v-list-item v-else>
                    <v-list-item-content>
                        <v-list-item-title>Tidak Ada Data.</v-list-item-title>
                        <v-list-item-subtitle>Untuk saat ini anda tidak memiliki pemberitahuan.</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            count: null,
            items: [],
            selectedItem: null,
        }
    },
    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    mounted() {
        this.check()
        this.sockets.subscribe('jadwal-istirahat:new', data => {
            const user_id = data.payload.user_id
            const dept_id = data.payload.dept_id
            const role_id = data.payload.role_id
            if (this.authenticated.id === user_id && this.authenticated.dept_id === dept_id && this.authenticated.role_id === role_id) {
                this.check()
            }
        })
        this.sockets.subscribe('jadwal-piket:new', data => {
            const user_id = data.payload.user_id
            const dept_id = data.payload.dept_id
            const role_id = data.payload.role_id
            if (this.authenticated.id === user_id && this.authenticated.dept_id === dept_id && this.authenticated.role_id === role_id) {
                this.check()
            }
        })
        this.sockets.subscribe('jadwal-piket:piket-image-upload', data => {
            if (this.authenticated.id === data.u.user_id) {
                this.check()
            }
        })
    },
    methods: {
        ...mapActions('auth', ['getNotifTask']),
        ...mapActions('jadwal_piket', ['submitUpdate']),
        check() {
            this.getNotifTask().then(res => {
                if (res.status === true) {
                    this.count = res.data.count
                    this.items = res.data.data
                }
            })
        },
        parseDate(e) {
            return moment(e).format('LLL')
        },
        parseState(e) {
            switch (e) {
                case 'null':
                    return 'Jadwal Istirahat'
                case 'n':
                    return 'Tugas piket belum diselesaikan'
                case 'y':
                    return 'Tugas piket telah diselesaikan'
            }
        },
        async uploadbefore(initial, id) {
            if (initial === 'user_pikets') {
                const { value: file } = await this.$swal({
                    title: 'Gambar Sebelum Dikerjakan',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload your profile picture'
                    }
                })

                if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.$swal({
                            title: 'Berikut gambar yang anda tambahkan.',
                            imageUrl: e.target.result,
                            imageAlt: 'The uploaded picture',
                            showCancelButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.submitUpdate({
                                    id,
                                    filebefore: file,
                                    fileafter: []
                                }).then((res) => {
                                    this.$swal('Menambahkan foto', '', `${res.msg}`)
                                })
                            }
                        })
                    }
                    reader.readAsDataURL(file)
                }
            }
        },
        async uploadafter(initial, id) {
            if (initial === 'user_pikets') {
                const { value: file } = await this.$swal({
                    title: 'Gambar Sesudah Dikerjakan',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload your profile picture'
                    }
                })

                if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.$swal({
                            title: 'Berikut gambar yang anda tambahkan.',
                            imageUrl: e.target.result,
                            imageAlt: 'The uploaded picture',
                            showCancelButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.submitUpdate({
                                    id,
                                    filebefore: [],
                                    fileafter: file
                                }).then((res) => {
                                    this.$swal('Menambahkan foto', '', `${res.msg}`)
                                })
                            }
                        })
                    }
                    reader.readAsDataURL(file)
                }
            }
        },
        movepage(initial) {
            if (initial === 'user_pikets' && this.$route.name !== 'jadwal-piket.data')
                this.$router.push({ name: 'jadwal-piket.data' })
            if (initial === 'jadwal_istirahats' && this.$route.name !== 'jadwal-istirahat.data')
                this.$router.push({ name: 'jadwal-istirahat.data' })
        }
    },
};
</script>