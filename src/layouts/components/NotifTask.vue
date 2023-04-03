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
                    <v-list-item v-for="i in items" :key="i.index" @click="movepage(i.initial)">
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
                                <v-icon color="info" @click="act(i.initial, i.id)">mdi-information</v-icon>
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
import { mapActions } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            count: null,
            items: [],
            selectedItem: null
        }
    },
    mounted() {
        this.check()
    },
    methods: {
        ...mapActions('auth', ['getNotifTask']),
        ...mapActions('jadwal_piket', ['submitUpdate']),
        check() {
            this.getNotifTask().then(res => {
                if (res.status === 200) {
                    this.count = res.data.count
                    for (let i = 0; i < res.data.data.length; i++) {
                        this.items.push({
                            created_at: res.data.data[i].created_at,
                            date: res.data.data[i].date,
                            state: res.data.data[i].state,
                            index: i,
                            id: res.data.data[i].id,
                            initial: res.data.data[i].initial,
                            time: res.data.data[i].time,
                            user_id: res.data.data[i].user_id,
                        })
                    }
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
                console.log(id);
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
                console.log(id);
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
        async act(initial, id) {
            if (initial === 'user_pikets') {
                console.log(id);
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
                                this.$swal('Saved!', '', 'success')
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