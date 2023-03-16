<template>
    <fullscreen v-model="fullscreen">
        <v-app :style="{ background: $vuetify.theme.themes[theme].bg }">
            <v-navigation-drawer app v-model="drawer" color="drawer" dark>
                <ListLeftDrawer />
            </v-navigation-drawer>
            <v-app-bar clipped-right fixed app color="appbar" elevation="0">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <v-spacer />
                <v-btn icon @click="toggleFullscreen">
                    <v-icon>mdi-fullscreen</v-icon>
                </v-btn>

                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-list subheader two-line>
                        <v-subheader inset>Folders</v-subheader>
                        <v-list-item v-for="folder in folders" :key="folder.title">
                            <v-list-item-avatar>
                                <v-icon class="grey lighten-1" dark>
                                    mdi-folder
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ folder.title }}</v-list-item-title>

                                <v-list-item-subtitle>{{ folder.subtitle }}</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-clipboard-list-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-list subheader two-line>
                        <v-subheader inset>Folders</v-subheader>
                        <v-list-item v-for="folder in folders" :key="folder.title">
                            <v-list-item-avatar>
                                <v-icon class="grey lighten-1" dark>
                                    mdi-folder
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ folder.title }}</v-list-item-title>

                                <v-list-item-subtitle>{{ folder.subtitle }}</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-divider class="mx-3" vertical></v-divider>
                <SwitchMode class="mt-5 mr-2" />
                <v-divider class="mx-3" vertical></v-divider>
                <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>
            <v-main>
                <router-view></router-view>
            </v-main>
            <v-navigation-drawer v-model="rightDrawer" right app fixed clipped color="rightdrawer">
                <list-rightdrawer-view />
            </v-navigation-drawer>
            <v-footer app inset padless absolute>
                <v-card flat tile class="text-center flex" color="footer">
                    <v-card-text>
                        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                            <v-icon size="24px">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-text class="pt-0">
                        Jl. Raya serang, KM. 13,5, Des. Sukadamai, Kec. Cikupa-Tangerang 15710, Hp. 081212439564
                    </v-card-text>
                    <v-card-text>
                        {{ new Date().getFullYear() }} — <strong>Al&Pam Development</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-app>
    </fullscreen>
</template>
<script>
import SwitchMode from '@/components/SwitchMode.vue'
import ListLeftDrawer from '@/layouts/components/ListLeftdrawerView.vue'
import ListRightdrawerView from './components/ListRightdrawerView.vue';
export default {
    name: 'App',
    components: {
        SwitchMode,
        ListLeftDrawer,
        ListRightdrawerView
    },
    data() {
        return {
            files: [
                {
                    color: 'blue',
                    icon: 'mdi-clipboard-text',
                    subtitle: 'Jan 20, 2014',
                    title: 'Vacation itinerary',
                },
                {
                    color: 'amber',
                    icon: 'mdi-gesture-tap-button',
                    subtitle: 'Jan 10, 2014',
                    title: 'Kitchen remodel',
                },
            ],
            folders: [
                {
                    subtitle: 'Jan 9, 2014',
                    title: 'Photos',
                },
                {
                    subtitle: 'Jan 17, 2014',
                    title: 'Recipes',
                },
                {
                    subtitle: 'Jan 28, 2014',
                    title: 'Work',
                },
            ],
            fullscreen: false,
            drawer: true,
            rightDrawer: true,
            icons: [
                'mdi-facebook',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }
    },
    methods: {
        toggleFullscreen() {
            this.fullscreen = !this.fullscreen
        }
    },
    computed: {
        theme() {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        }
    }
};
</script>
<style scoped>
.v-navigation-drawer>>>.v-navigation-drawer__border {
    display: none
}

.theme--dark.v-list {
    background: #002028 !important;
    color: #FFFFFF !important;
}
</style>
