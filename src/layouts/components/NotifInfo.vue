<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-badge color="primary" :content="`${count !== null && count > 0 ? 'New ' : ''}${count}`" overlap>
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>
        <v-list subheader two-line dense>
            <v-list-item-group v-model="selected" active-class="pink--text" v-if="items.length > 0">
                <div v-for="(item, index) in items" :key="index"
                    @click="approval(item.initial, item.id, item.user_id_approval)">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon :class="colorIcon(item.initial)">
                                {{ typeIcon(item.initial) }}
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ titleType(item.initial) }}</v-list-item-title>

                            <v-list-item-subtitle class="text--primary">{{ item.todate !== 'null'?'Tanggal Mulai' : 'Tanggal Diajukan' }} : {{ parseDate(item.date)
                            }}</v-list-item-subtitle>

                            <v-list-item-subtitle class="text--primary" v-if="item.todate !== 'null'">Sampai Tanggal : {{ parseDate(item.todate)
                            }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-list-item-action-text>{{ parseDate(item.created_at) }}</v-list-item-action-text>

                            <v-icon v-if="item.approval === 'y'" color="grey lighten-1" disabled>
                                mdi-check
                            </v-icon>

                            <v-icon v-else color="yellow darken-3">
                                mdi-signature
                            </v-icon>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                </div>
            </v-list-item-group>
            <v-list-item v-else>
                <v-list-item-content>
                    <v-list-item-title>Tidak ada data</v-list-item-title>
                    <v-list-item-subtitle>Untuk saat ini anda tidak memiliki
                        pemberitahuan.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
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
            selected: null,
        }
    },
    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    mounted() {
        this.check()
        this.sockets.subscribe('notif-info:pengajuan-cuti', data => {
            if (this.authenticated.id === data.payload.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:approval-cuti', data => {
            if (this.authenticated.id === data.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:pengajuan-izin', data => {
            if (this.authenticated.id === data.payload.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:approval-izin', data => {
            if (this.authenticated.id === data.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:pengajuan-lembur', data => {
            if (this.authenticated.id === data.payload.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:approval-lembur', data => {
            if (this.authenticated.id === data.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:pengajuan-perdin', data => {
            if (this.authenticated.id === data.payload.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:approval-perdin', data => {
            if (this.authenticated.id === data.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:pengajuan-reimburs', data => {
            if (this.authenticated.id === data.payload.user_id) {
                this.check()
            }
        })
        this.sockets.subscribe('notif-info:approval-reimburs', data => {
            if (this.authenticated.id === data.user_id) {
                this.check()
            }
        })
    },
    methods: {
        ...mapActions('auth', ['getNotifInfo']),
        ...mapActions('notif_info', ['submitUpdate']),
        ...mapActions('pengajuan_cuti', ['approval_cuti']),
        ...mapActions('pengajuan_izin', ['approval_izin']),
        check() {
            this.getNotifInfo().then(res => {
                this.count = res.data.count
                this.items = res.data.data
            })
        },
        parseDate(e) {
            return moment(e).format('LLL')
        },
        approval(initial, id, userIdApproval) {
            if (userIdApproval === this.authenticated.id) {
                this.$swal({
                    title: `Apakah anda akan menyetujui permohonan ${initial === 'form_cutis' ? 'cuti' : 'izin'} ini?`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Setujui',
                    denyButtonText: `Tidak setuju`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        if (initial === 'form_cutis') {
                            this.approval_cuti({ id: id, status_approval: 'y' }).then((res) => {
                                this.$swal('Disetujui!', '', res.status)
                                this.check()
                            })
                        }
                        if (initial === 'form_izins') {
                            this.approval_izin({ id: id, status_approval: 'y' }).then((res) => {
                                this.$swal('Disetujui!', '', res.status)
                                this.check()
                            })
                        }
                    } else if (result.isDenied) {
                        if (initial === 'form_cutis') {
                            this.approval_cuti({ id: id, status_approval: 'n' }).then((res) => {
                                this.$swal('Tidak disetujui!', '', res.status)
                                this.check()
                            })
                        }
                        if (initial === 'form_izins') {
                            this.approval_izin({ id: id, status_approval: 'n' }).then((res) => {
                                this.$swal('Tidak disetujui!', '', res.status)
                                this.check()
                            })
                        }
                    }
                })
            } else {
                this.movepage(initial)
            }
        },
        movepage(initial) {
            if (initial === 'form_cutis' && this.$route.name !== 'cuti.data')
                this.$router.push({ name: 'cuti.data' })
            if (initial === 'form_izins' && this.$route.name !== 'izin.data')
                this.$router.push({ name: 'izin.data' })
        },
        colorIcon(initial) {
            switch (initial) {
                case 'form_cutis':
                    return 'card'
                case 'form_izins':
                    return 'appbar'
                case 'form_lemburs':
                    return 'primary'
                case 'form_perdins':
                    return 'secondary'
                case 'form_reimburs':
                    return 'accent'
                default:
                    return 'error'
            }
        },
        typeIcon(initial) {
            switch (initial) {
                case 'form_cutis':
                    return 'mdi-plane-car'
                case 'form_izins':
                    return 'mdi-frequently-asked-questions'
                case 'form_lemburs':
                    return 'mdi-debug-step-over'
                case 'form_perdins':
                    return 'mdi-car-side'
                case 'form_reimburs':
                    return 'mdi-hand-coin'
                default:
                    return 'mdi-frequently-asked-questions'
            }
        },
        titleType(initial) {
            switch (initial) {
                case 'form_cutis':
                    return 'Permohonan cuti'
                case 'form_izins':
                    return 'Permohonan izin'
                case 'form_lemburs':
                    return 'Permohonan lembur'
                case 'form_perdins':
                    return 'Permohonan perjalanan dinas'
                case 'form_reimburs':
                    return 'Permohonan reimburs'
                default:
                    return 'Permohonan'
            }
        },
    },
};
</script>