<template>
    <v-list dense nav subheader>
        <v-subheader>Aksi Data</v-subheader>
        <v-list-item-group v-model="selectedRightDrawer" color="primary">
            <v-list-item v-for="([title, icon, link], i) in cruds" :key="i" @click="movePage(nameUrl, link)" router exact>
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
            nameUrl:'',
            crud:false,
            cruds: [
                ['List Data', 'mdi-view-list', 'data'],
                ['Create', 'mdi-plus-outline', 'add'],
                ['Delete', 'mdi-delete', 'delete'],
            ],
        }
    },
    watch: {
        $route(e) {
            if (e.fullPath.search('master-data')) {
                this.crud = true
                this.nameUrl = e.name
            }
            this.crud = false
        }
    },
    methods:{
        movePage(e, i){
            var x = e.split(".")
            x[1] = i
            var url = x[0] + '.' + x[1]
            if (this.$route.name !== url) this.$router.push({ name: url })
        }
    }
};
</script>