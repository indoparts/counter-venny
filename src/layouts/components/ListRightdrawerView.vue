<template>
    <v-list dense nav subheader>
        <v-subheader>Aksi Data</v-subheader>
        <v-list-item-group v-model="selectedRightDrawer" color="primary">
            <v-list-item v-for="([title, icon, link], i) in menu" :key="i" @click="movePage(link)" router exact>
                <v-list-item-action>
                    <v-icon v-text="icon"></v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="title" />
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>
<script>
export default{
    data() {
        return {
            selectedRightDrawer: 0,
            menu:[]
        }
    },
    watch: {
        $route(e) {
            switch (e.name) {
                case 'users-absen':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 0
                    break;
                case 'list-data-absensi-user':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 1
                    break;
                case 'grafik-data-absensi-user':
                    this.menu = this.$store.state.absensi.rightMenuDrawer
                    this.selectedRightDrawer = 2
                    break;
                default:
                    break;
            }
        }
    },
    methods:{
        movePage(nameurl){
            this.$router.push({ name: nameurl }) 
        }
    }
};
</script>