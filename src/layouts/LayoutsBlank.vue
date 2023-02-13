<template>
    <v-app :style="{ background: $vuetify.theme.themes[theme].bg }">
        <v-main color="bg">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'App',
    computed: {
        theme() {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        }
    }
};
</script>