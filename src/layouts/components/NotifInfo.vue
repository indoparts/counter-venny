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
                            <v-icon :class="item.initial === 'form_cutis' ? 'primary' : 'secondary'">
                                {{ item.initial === 'form_cutis' ? 'mdi-plane-car' : 'mdi-frequently-asked-questions' }}
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.initial === 'form_cutis' ? 'Permohonan Cuti' : 'Permohonan Izin'
                            }}</v-list-item-title>

                            <v-list-item-subtitle class="text--primary">Mulai Tanggal : {{ parseDate(item.date)
                            }}</v-list-item-subtitle>

                            <v-list-item-subtitle class="text--primary">Sampai Tanggal : {{ parseDate(item.todate)
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
            console.log(id);
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
        }
    },
};
</script>